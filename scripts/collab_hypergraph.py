"""Build the co-authorship hypergraph shown on /people/ and /publications/.

Each paper or preprint since SINCE is a hyperedge joining its co-authors (A. Santoro,
who is in every one of them, is left out). Layout comes from XGI; shapes are drawn
XGI-style (convex hulls), coloured by the paper's `topic` (see _data/topics.yml),
and written as inline SVG includes plus a JSON file used by assets/js/notebook.js.

    python3 scripts/collab_hypergraph.py

Requires: xgi, shapely, pyyaml.
"""

import json
import re
from pathlib import Path

import numpy as np
import xgi
import yaml
from shapely.geometry import MultiPoint

ROOT = Path(__file__).resolve().parent.parent
SINCE = 2015
MAX_AUTHORS = 15  # consortium papers would swallow everything else
ME = "A. Santoro"
W, H = 1200, 640
ACCENT, MENTOR = "#FF5A36", "#7FB2FF"


def norm(name):
    name = name.replace("*", "").strip()
    name = re.sub(r"^and\s+", "", name)
    name = re.sub(r"\.(?=[A-Z])", ". ", name)
    return re.sub(r"\s+", " ", name)


def short(full):
    parts = full.replace("-", " - ").split()
    *given, last = full.split()
    return " ".join(g[0] + "." for g in given) + " " + last


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


pubs = yaml.safe_load(open(ROOT / "_data/publications.yml", encoding="utf-8"))
people = yaml.safe_load(open(ROOT / "_data/people.yml", encoding="utf-8"))
topics = yaml.safe_load(open(ROOT / "_data/topics.yml", encoding="utf-8"))
TOPIC_COLOR = {t["key"]: t["color"] for t in topics}
students = {short(p["name"]) for p in people.get("current", []) + people.get("alumni", [])}
mentors = {short(p["name"]) for p in people.get("mentors", [])}

edges = {}
for w in pubs["papers"]:  # posters are not manuscripts, so they are left out
    if int(str(w["year"])) < SINCE:
        continue
    names = list(dict.fromkeys(norm(a) for a in w["authors"].replace(" and ", ", ").split(",") if a.strip()))
    if ME not in names or len(names) > MAX_AUTHORS:
        continue
    key = frozenset(n for n in names if n != ME)
    if not key:
        continue
    e = edges.setdefault(key, {"titles": [], "topics": [], "papers": [], "year": 0})
    if w["title"].lower() not in (t.lower() for t in e["titles"]):
        e["titles"].append(w["title"])
        e["topics"].append(w["topic"])  # every paper needs a topic from _data/topics.yml
        url = w.get("doi") or w.get("pdf") or ""
        if url and not url.startswith("http"):
            url = "https://doi.org/" + url
        e["papers"].append({"title": w["title"], "topic": w["topic"], "year": int(str(w["year"])),
                            "venue": w.get("venue", ""), "url": url, "authors": names})
    e["year"] = max(e["year"], int(str(w["year"])))

edge_list = sorted(edges.items(), key=lambda kv: -len(kv[0]))
HG = xgi.Hypergraph([sorted(k) for k, _ in edge_list])
nodes = sorted(HG.nodes)


def component_layout(members, seed):
    sub = xgi.subhypergraph(HG, nodes=members)
    if len(members) == 1:
        return {members[0]: np.array([0.5, 0.5])}
    pos = xgi.barycenter_spring_layout(sub, seed=seed, k=1.6 / np.sqrt(len(members)))
    A = np.array([pos[n] for n in members], dtype=float)
    A = (A - A.min(0)) / np.maximum(A.max(0) - A.min(0), 1e-9)
    return {n: A[i] for i, n in enumerate(members)}


# Lay out each connected component separately: the largest on the left,
# the others stacked in a column on the right, sized by number of people.
comps = sorted((sorted(c) for c in xgi.connected_components(HG)), key=len, reverse=True)
xy = {}
mx, my, gap = 70, 40, 34
main_w = 0.70 * W
box = (mx, my, main_w - gap, H - my)
for n, v in component_layout(comps[0], 3).items():
    xy[n] = (box[0] + v[0] * (box[2] - box[0]), box[1] + v[1] * (box[3] - box[1]))
rest = comps[1:]
weights = [np.sqrt(len(c)) for c in rest]
y0, avail = my, H - 2 * my - gap * (len(rest) - 1)
for c, wgt in zip(rest, weights):
    h = avail * wgt / sum(weights)
    x0, x1 = main_w + gap, W - mx - 40
    lay = component_layout(c, 3)
    cx = x0 + 0.08 * (x1 - x0)
    for n, v in lay.items():
        xy[n] = (cx + v[0] * 0.84 * (x1 - x0), y0 + 10 + v[1] * max(h - 20, 1))
    y0 += h + gap
xy = {n: (round(float(x), 1), round(float(y), 1)) for n, (x, y) in xy.items()}

works = []
for k, e in edge_list:
    # several papers with the same co-authors share one hyperedge: colour it by their most common topic
    main = max(e["topics"], key=lambda t: (e["topics"].count(t), -e["topics"].index(t)))
    works.append({"members": sorted(k), "titles": e["titles"], "topics": e["topics"], "topic": main, "year": e["year"],
                  "papers": e["papers"]})
deg = {n: sum(len(w["titles"]) for w in works if n in w["members"]) for n in nodes}
role = {n: "student" if n in students else "mentor" if n in mentors else "collaborator" for n in nodes}


def hull_path(members, pad):
    pts = [xy[m] for m in members]
    shape = MultiPoint(pts).convex_hull.buffer(pad, quad_segs=8)
    c = list(shape.exterior.coords)
    return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in c) + " Z"


def color(w):
    return TOPIC_COLOR[w["topic"]]


# A paper with only one co-author (besides me) is a hyperedge of size 1 once I am left out:
# it is drawn as a ring around that person, one concentric ring per paper.
solo = {}
for i, w in enumerate(works):
    if len(w["members"]) == 1:
        solo.setdefault(w["members"][0], []).extend((i, TOPIC_COLOR[t]) for t in w["topics"])
RING_GAP = 5


def ring_ext(n):
    return RING_GAP * len(solo.get(n, []))


def place_labels(keys, char_w=9.2):
    boxes = [(x - 8 - ring_ext(n), y - 8 - ring_ext(n), x + 8 + ring_ext(n), y + 8 + ring_ext(n)) for n, (x, y) in xy.items()]
    sides = {}
    for n in sorted(keys, key=lambda n: -deg[n]):
        x, y = xy[n]
        w, h, e = len(n) * char_w, 16, ring_ext(n)
        cands = [("r", x + 10 + e, y - h / 2), ("l", x - 10 - e - w, y - h / 2),
                 ("t", x - w / 2, y - 12 - e - h), ("b", x - w / 2, y + 12 + e)]
        best = None
        for side, bx, by in cands:
            b = (bx, by, bx + w, by + h)
            ov = sum(max(0, min(b[2], o[2]) - max(b[0], o[0])) * max(0, min(b[3], o[3]) - max(b[1], o[1])) for o in boxes)
            if bx < 2 or bx + w > W - 2:
                ov += 1e6
            if best is None or ov < best[0]:
                best = (ov, side, b)
        sides[n] = best[1]
        boxes.append(best[2])
    return sides


def label_xy(n, side):
    x, y = xy[n]
    e = ring_ext(n)
    return {"r": (x + 11 + e, y + 5, "start"), "l": (x - 11 - e, y + 5, "end"),
            "t": (x, y - 13 - e, "middle"), "b": (x, y + 26 + e, "middle")}[side]


def svg(mini):
    pad = 26 if mini else 16
    r_scale = 2.2 if mini else 1.0
    out = [f'<svg class="hg{" hg--mini" if mini else ""}" viewBox="0 0 {W} {H}" '
           f'{"aria-hidden=\"true\"" if mini else "role=\"group\" aria-label=\"Co-authorship hypergraph\""} focusable="false">']
    for i, w in enumerate(works):
        m = w["members"]
        if len(m) >= 3:
            c = color(w)
            out.append(f'<path class="hg-edge" data-w="{i}" d="{hull_path(m, pad)}" fill="{c}" fill-opacity="0.2" '
                       f'stroke="{c}" stroke-opacity="0.75" stroke-width="{3 if mini else 1.3}" stroke-linejoin="round"/>')
    for i, w in enumerate(works):
        m = w["members"]
        if len(m) == 2:
            (x1, y1), (x2, y2) = xy[m[0]], xy[m[1]]
            out.append(f'<line class="hg-edge hg-dyad" data-w="{i}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" '
                       f'stroke="{color(w)}" stroke-opacity="0.95" stroke-width="{5 if mini else 2.8}" stroke-linecap="round"/>')
    for n, rings in solo.items():
        x, y = xy[n]
        r0 = (3.5 + 1.1 * min(deg[n], 6)) * r_scale
        for k, (i, c) in enumerate(rings):
            out.append(f'<circle class="hg-edge hg-solo" data-w="{i}" cx="{x}" cy="{y}" r="{r0 + RING_GAP * r_scale * (k + 1):.1f}" '
                       f'fill="none" stroke="{c}" stroke-opacity="0.95" stroke-width="{3.5 if mini else 2}"/>')
    keys = {n for n in nodes if deg[n] >= 3 or role[n] != "collaborator"}
    sides = place_labels(keys) if not mini else {}
    for n in sorted(nodes, key=lambda n: deg[n]):
        x, y = xy[n]
        r = (3.5 + 1.1 * min(deg[n], 6)) * r_scale
        fill, stroke = {"student": (ACCENT, ACCENT), "mentor": (MENTOR, MENTOR)}.get(role[n], ("#1F2227", "#ECE9E1"))
        mem = " ".join(str(i) for i, w in enumerate(works) if n in w["members"])
        if mini:
            out.append(f'<circle cx="{x}" cy="{y}" r="{r:.1f}" fill="{fill}" stroke="{stroke}" stroke-width="3"/>')
            continue
        side = sides.get(n, "r")
        lx, ly, anchor = label_xy(n, side)
        cls = "hg-node" + (" is-key" if n in keys else "")
        out.append(f'<g class="{cls}" data-name="{esc(n)}" data-w="{mem}" tabindex="0" role="button" '
                   f'aria-label="{esc(n)}, {deg[n]} joint work{"s" if deg[n] != 1 else ""}">'
                   f'<circle cx="{x}" cy="{y}" r="{r:.1f}" fill="{fill}" stroke="{stroke}" stroke-width="1.6"/>'
                   f'<text class="hg-label" x="{lx:.1f}" y="{ly:.1f}" text-anchor="{anchor}">{esc(n)}</text></g>')
    out.append("</svg>")
    return "\n".join(out)


(ROOT / "_includes/nb").mkdir(parents=True, exist_ok=True)
(ROOT / "_includes/nb/hypergraph-people.svg").write_text(svg(False), encoding="utf-8")
(ROOT / "_includes/nb/hypergraph-mini.svg").write_text(svg(True), encoding="utf-8")
# x, y: XGI layout in a W x H box, used as starting positions by assets/js/collab.js
data = {"since": SINCE, "size": [W, H],
        "people": [{"name": n, "role": role[n], "works": deg[n], "x": xy[n][0], "y": xy[n][1]} for n in nodes],
        "topics": [t for t in topics if any(t["key"] in w["topics"] for w in works)],
        "works": [{"titles": w["titles"], "topics": w["topics"], "topic": w["topic"], "year": w["year"],
                   "size": len(w["members"]), "members": w["members"], "papers": w["papers"]} for w in works]}
(ROOT / "_data/hypergraph.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"{len(nodes)} co-authors, {len(works)} hyperedges since {SINCE}")
