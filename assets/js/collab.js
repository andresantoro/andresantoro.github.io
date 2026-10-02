// Interactive co-authorship hypergraph on /collaborations/.
// Data: _data/hypergraph.json (scripts/collab_hypergraph.py). People start from the XGI layout,
// then a D3 force layout keeps each paper's co-authors together; papers are drawn as padded hulls.
(function () {
  'use strict';
  var root = document.querySelector('[data-cl]');
  var dataEl = document.getElementById('collab-data');
  var stage = root && root.querySelector('[data-cl-stage]');
  if (!root || !dataEl || !stage || !window.d3) return;

  var data = JSON.parse(dataEl.textContent);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var roleNames = { student: 'Student / mentee', mentor: 'Mentor', collaborator: 'Collaborator' };
  var topicOf = {};
  data.topics.forEach(function (t) { topicOf[t.key] = t; });

  // ---- geometry: fit the XGI layout box into the stage ----
  var box = stage.getBoundingClientRect();
  var W = Math.max(box.width, 320), H = Math.max(box.height, 360);
  var s = 0.9 * Math.min(W / data.size[0], H / data.size[1]);
  var ox = (W - data.size[0] * s) / 2, oy = (H - data.size[1] * s) / 2;

  var people = data.people.map(function (p) {
    return { id: p.name, role: p.role, x: ox + p.x * s, y: oy + p.y * s, works: [], vdeg: 0, shown: true };
  });
  var byId = {};
  people.forEach(function (n) { byId[n.id] = n; });
  var works = data.works.map(function (w, i) {
    var o = {
      i: i, members: w.members, topic: w.topic, papers: w.papers,
      start: d3.min(w.papers, function (p) { return p.year; }),
      color: (topicOf[w.topic] || {}).color || '#ECE9E1', on: true, vis: w.papers
    };
    o.hub = { hub: true, w: o, x: d3.mean(w.members, function (m) { return byId[m].x; }), y: d3.mean(w.members, function (m) { return byId[m].y; }) };
    w.members.forEach(function (m) { byId[m].works.push(o); });
    return o;
  });
  var years = { min: d3.min(works, function (w) { return w.start; }), max: d3.max(works, function (w) { return w.start; }) };
  var state = { year: years.max, topics: {}, sel: null, q: '' };
  data.topics.forEach(function (t) { state.topics[t.key] = true; });

  // ---- svg ----
  var fallback = stage.querySelector('.cl-fallback');
  if (fallback) fallback.remove();
  var svg = d3.select(stage).insert('svg', ':first-child').attr('class', 'cl-svg').attr('viewBox', [0, 0, W, H])
    .attr('role', 'group').attr('aria-label', 'Interactive co-authorship hypergraph');
  var view = svg.append('g');
  var gHull = view.append('g'), gDyad = view.append('g'), gSolo = view.append('g'), gNode = view.append('g');
  var resetBtn = root.querySelector('[data-cl-reset]');
  var userView = false;  // once the visitor pans or zooms, stop re-fitting the view after each change
  var zoom = d3.zoom().scaleExtent([0.35, 5])
    // on touch screens one finger scrolls the page; two fingers pan and zoom
    .filter(function (ev) { return (!ev.ctrlKey || ev.type === 'wheel') && !ev.button && (!ev.touches || ev.touches.length > 1); })
    .on('zoom', function (ev) {
      view.attr('transform', ev.transform);
      svg.classed('is-zoomed', ev.transform.k > 1.7).style('--k', ev.transform.k);  // --k keeps labels a constant size
      if (ev.sourceEvent) { userView = true; if (resetBtn) resetBtn.hidden = false; }
    });
  svg.call(zoom).on('dblclick.zoom', null).style('touch-action', 'pan-y');
  svg.on('click', function (ev) { if (ev.target === svg.node()) select(null); });

  var radius = function (n) { return 4 + 1.3 * Math.min(n.vdeg, 6); };
  var ring = d3.range(14).map(function (k) { var a = k * Math.PI / 7; return [Math.cos(a), Math.sin(a)]; });
  var hullPath = function (w) {
    var pad = 12 + (w.i % 3) * 3, pts = [];
    w.members.forEach(function (m) {
      var n = byId[m];
      ring.forEach(function (r) { pts.push([n.x + pad * r[0], n.y + pad * r[1]]); });
    });
    var h = d3.polygonHull(pts);
    return h ? 'M' + h.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('L') + 'Z' : null;
  };

  var sim = d3.forceSimulation()
    .force('link', d3.forceLink().distance(function (l) { return 18 + 5 * Math.sqrt(l.w.members.length); }).strength(0.6))
    .force('charge', d3.forceManyBody().strength(function (d) { return d.hub ? -12 : -80; }).distanceMax(280))
    .force('collide', d3.forceCollide(function (d) { return d.hub ? 0 : radius(d) + RING_GAP * (d.rings || 0) + 8; }))
    .force('x', d3.forceX(W / 2).strength(0.04))
    .force('y', d3.forceY(H / 2).strength(0.06))
    .alphaDecay(0.035)
    .on('tick', function () {
      draw();
      if (pendingFit && sim.alpha() < 0.15) { pendingFit = false; fit(700); }
    });
  var pendingFit = false;
  sim.stop();

  var drag = d3.drag()
    .on('start', function (ev, d) { if (!ev.active) sim.alphaTarget(0.25).restart(); d.fx = d.x; d.fy = d.y; })
    .on('drag', function (ev, d) { d.fx = ev.x; d.fy = ev.y; })
    .on('end', function (ev, d) { if (!ev.active) sim.alphaTarget(0); d.fx = null; d.fy = null; });

  var hullSel = gHull.selectAll('path'), dyadSel = gDyad.selectAll('line'), soloSel = gSolo.selectAll('circle'), nodeSel = gNode.selectAll('g');
  var RING_GAP = 5;  // a paper with a single co-author is a ring around them, one ring per paper
  var shownPeople = [], shownWorks = [];

  function update(animate) {
    shownWorks = works.filter(function (w) {
      w.on = state.topics[w.topic] && w.start <= state.year;
      w.vis = w.papers.filter(function (p) { return p.year <= state.year; });
      return w.on;
    });
    var on = {};
    people.forEach(function (n) { n.vdeg = 0; n.rings = 0; });
    shownWorks.forEach(function (w) { w.members.forEach(function (m) { on[m] = true; byId[m].vdeg += w.vis.length; }); });
    var rings = [];
    shownWorks.forEach(function (w) {
      if (w.members.length !== 1) return;
      var n = byId[w.members[0]];
      w.vis.forEach(function (p) { rings.push({ w: w, n: n, k: n.rings++, color: (topicOf[p.topic] || {}).color || w.color, key: w.i + ':' + p.title }); });
    });
    people.forEach(function (n) { if (!on[n.id]) n.shown = false; });
    shownPeople = people.filter(function (n) { return on[n.id]; });
    // newcomers appear next to co-authors already on screen
    shownPeople.forEach(function (n) {
      if (n.shown) return;
      var anchors = [];
      n.works.forEach(function (w) {
        if (w.on) w.members.forEach(function (m) { if (byId[m].shown) anchors.push(byId[m]); });
      });
      if (anchors.length) {
        n.x = d3.mean(anchors, function (a) { return a.x; }) + (Math.random() - 0.5) * 40;
        n.y = d3.mean(anchors, function (a) { return a.y; }) + (Math.random() - 0.5) * 40;
      }
      n.shown = true;
    });
    shownWorks.forEach(function (w) {
      w.hub.x = d3.mean(w.members, function (m) { return byId[m].x; });
      w.hub.y = d3.mean(w.members, function (m) { return byId[m].y; });
    });

    var links = [];
    shownWorks.forEach(function (w) { w.members.forEach(function (m) { links.push({ source: byId[m], target: w.hub, w: w }); }); });
    sim.nodes(shownPeople.concat(shownWorks.map(function (w) { return w.hub; })));
    sim.force('link').links(links);

    hullSel = gHull.selectAll('path').data(shownWorks.filter(function (w) { return w.members.length >= 3; }), function (w) { return w.i; })
      .join(function (en) {
        return en.append('path').attr('class', 'cl-hull').attr('fill', function (w) { return w.color; }).attr('stroke', function (w) { return w.color; })
          .attr('tabindex', 0).attr('role', 'button').attr('aria-label', function (w) { return w.papers[0].title; })
          .on('click', function (ev, w) { ev.stopPropagation(); select({ work: w }); })
          .on('keydown', keySelect(function (w) { return { work: w }; }));
      });
    dyadSel = gDyad.selectAll('line').data(shownWorks.filter(function (w) { return w.members.length === 2; }), function (w) { return w.i; })
      .join(function (en) {
        return en.append('line').attr('class', 'cl-dyad').attr('stroke', function (w) { return w.color; })
          .on('click', function (ev, w) { ev.stopPropagation(); select({ work: w }); });
      });
    soloSel = gSolo.selectAll('circle').data(rings, function (r) { return r.key; })
      .join(function (en) {
        return en.append('circle').attr('class', 'cl-solo').attr('stroke', function (r) { return r.color; })
          .on('click', function (ev, r) { ev.stopPropagation(); select({ work: r.w }); });
      });
    nodeSel = gNode.selectAll('g.cl-node').data(shownPeople, function (n) { return n.id; })
      .join(function (en) {
        var g = en.append('g').attr('class', function (n) { return 'cl-node is-' + n.role; })
          .attr('tabindex', 0).attr('role', 'button').attr('aria-label', function (n) { return n.id; })
          .on('click', function (ev, n) { ev.stopPropagation(); select({ person: n }); })
          .on('keydown', keySelect(function (n) { return { person: n }; }))
          .call(drag);
        g.append('circle');
        g.append('text').attr('class', 'cl-label').attr('y', 4).text(function (n) { return n.id; });
        return g;
      });
    nodeSel.classed('is-key', function (n) { return n.vdeg >= 3 || n.role !== 'collaborator'; });
    nodeSel.select('circle').attr('r', radius);
    nodeSel.select('text').attr('x', function (n) { return radius(n) + 4 + RING_GAP * n.rings; });

    var nPapers = d3.sum(shownWorks, function (w) { return w.vis.length; });
    root.querySelectorAll('[data-cl-people], [data-cl-idle-people]').forEach(function (e) { e.textContent = shownPeople.length; });
    document.querySelectorAll('[data-cl-papers]').forEach(function (e) { e.textContent = nPapers; });

    if (state.sel && ((state.sel.work && !state.sel.work.on) || (state.sel.person && !state.sel.person.shown))) state.sel = null;
    applySel();

    if (animate && !reduce) {
      pendingFit = !userView;
      sim.alpha(Math.max(sim.alpha(), 0.6)).restart();
    } else {
      sim.alpha(1);
      for (var i = 0; i < 260; i++) sim.tick();
      draw();
      if (animate && !userView) fit(0);
    }
  }

  function draw() {
    nodeSel.attr('transform', function (n) { return 'translate(' + n.x.toFixed(1) + ',' + n.y.toFixed(1) + ')'; });
    dyadSel.attr('x1', function (w) { return byId[w.members[0]].x; }).attr('y1', function (w) { return byId[w.members[0]].y; })
      .attr('x2', function (w) { return byId[w.members[1]].x; }).attr('y2', function (w) { return byId[w.members[1]].y; });
    hullSel.attr('d', hullPath);
    soloSel.attr('cx', function (r) { return r.n.x; }).attr('cy', function (r) { return r.n.y; })
      .attr('r', function (r) { return radius(r.n) + RING_GAP * (r.k + 1); });
  }

  function keySelect(make) {
    return function (ev, d) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); select(make(d)); }
      if (ev.key === 'Escape') select(null);
    };
  }

  // ---- selection + panel ----
  var idle = root.querySelector('[data-cl-idle]');
  var panel = root.querySelector('[data-cl-sel]');

  function select(sel) {
    var same = sel && state.sel && ((sel.person && sel.person === state.sel.person) || (sel.work && sel.work === state.sel.work));
    state.sel = same ? null : sel;
    applySel();
  }

  function applySel() {
    var sel = state.sel, onW = new Set(), onN = new Set();
    if (sel && sel.person) {
      onN.add(sel.person);
      sel.person.works.forEach(function (w) { if (w.on) { onW.add(w); w.members.forEach(function (m) { onN.add(byId[m]); }); } });
    }
    if (sel && sel.work) { onW.add(sel.work); sel.work.members.forEach(function (m) { onN.add(byId[m]); }); }
    svg.classed('has-sel', !!sel).classed('has-query', !!state.q);
    hullSel.classed('is-on', function (w) { return onW.has(w); });
    dyadSel.classed('is-on', function (w) { return onW.has(w); });
    soloSel.classed('is-on', function (r) { return onW.has(r.w); });
    nodeSel.classed('is-on', function (n) { return onN.has(n); })
      .classed('is-sel', function (n) { return !!(sel && sel.person === n); })
      .classed('is-match', function (n) { return !!state.q && n.id.toLowerCase().indexOf(state.q) !== -1; });
    renderPanel();
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function paperItem(p, withAuthors) {
    var li = el('li', 'cl-paper');
    var t = p.url ? el('a', null, p.title) : el('span', null, p.title);
    if (p.url) { t.href = p.url; t.target = '_blank'; t.rel = 'noopener'; }
    li.appendChild(t);
    li.appendChild(el('span', 'cl-meta', p.year + (p.venue ? ' · ' + p.venue : '')));
    var topic = topicOf[p.topic];
    if (topic) {
      var tag = el('span', 'nb-topic'), dot = el('i');
      dot.style.setProperty('--c', topic.color);
      tag.appendChild(dot);
      tag.appendChild(document.createTextNode(topic.label));
      li.appendChild(tag);
    }
    if (withAuthors) {
      var who = el('div', 'cl-authors');
      p.authors.forEach(function (a) {
        if (byId[a] && byId[a].shown) {
          var b = el('button', 'cl-author', a);
          b.type = 'button';
          b.addEventListener('click', function () { select({ person: byId[a] }); focusOn(byId[a]); });
          who.appendChild(b);
        } else {
          who.appendChild(el('span', 'cl-author' + (a === 'A. Santoro' ? ' is-me' : ''), a));
        }
      });
      li.appendChild(who);
    }
    return li;
  }

  function renderPanel() {
    var sel = state.sel;
    idle.hidden = !!sel;
    panel.hidden = !sel;
    panel.textContent = '';
    if (!sel) return;
    var list = el('ol');
    if (sel.person) {
      var n = sel.person, papers = [];
      n.works.forEach(function (w) { if (w.on) w.vis.forEach(function (p) { papers.push(p); }); });
      papers.sort(function (a, b) { return b.year - a.year; });
      panel.appendChild(el('div', 'nb-label', roleNames[n.role] || ''));
      panel.appendChild(el('div', 'nb-hgpanel__name', n.id));
      panel.appendChild(el('div', 'nb-label cl-count', papers.length + (papers.length === 1 ? ' joint paper' : ' joint papers') + ' up to ' + state.year));
      papers.forEach(function (p) { list.appendChild(paperItem(p, false)); });
    } else {
      var w = sel.work;
      panel.appendChild(el('div', 'nb-label', w.vis.length === 1 ? 'Paper' : w.vis.length + ' papers, same co-authors'));
      w.vis.forEach(function (p) { list.appendChild(paperItem(p, true)); });
    }
    panel.appendChild(list);
    var clear = el('button', 'nb-chip', 'Clear ×');
    clear.type = 'button';
    clear.style.marginTop = '16px';
    clear.addEventListener('click', function () { select(null); });
    panel.appendChild(clear);
  }

  function focusOn(n) {
    if (resetBtn) resetBtn.hidden = false;
    svg.transition().duration(reduce ? 0 : 600).call(zoom.translateTo, n.x, n.y);
  }

  function fit(duration) {
    if (!shownPeople.length) return;
    var x0 = d3.min(shownPeople, function (n) { return n.x; }) - 40, x1 = d3.max(shownPeople, function (n) { return n.x; }) + 120;
    var y0 = d3.min(shownPeople, function (n) { return n.y; }) - 40, y1 = d3.max(shownPeople, function (n) { return n.y; }) + 40;
    var k = Math.min(2, 0.96 * Math.min(W / (x1 - x0), H / (y1 - y0)));
    var t = d3.zoomIdentity.translate(W / 2, H / 2).scale(k).translate(-(x0 + x1) / 2, -(y0 + y1) / 2);
    if (duration) svg.transition().duration(duration).call(zoom.transform, t);
    else svg.call(zoom.transform, t);
  }

  // ---- controls ----
  var range = root.querySelector('[data-cl-range]');
  var yearOut = root.querySelector('[data-cl-year]');
  var play = root.querySelector('[data-cl-play]');
  var timer = null;

  function setYear(y, animate) {
    state.year = y;
    range.value = y;
    yearOut.textContent = y;
    update(animate);
  }
  function stop() {
    clearInterval(timer);
    timer = null;
    play.setAttribute('aria-pressed', 'false');
    play.textContent = '▶ Play';
  }
  range.addEventListener('input', function () { stop(); setYear(+range.value, true); });
  // when Play reaches the last year, a location-style title card rises over the map, petals drifting off it
  var titleCard = function () {
    var card = el('div', 'cl-title');
    card.setAttribute('role', 'status');
    var petals = el('div', 'nb-petals');
    petals.setAttribute('aria-hidden', 'true');
    [[8, -3], [22, -9], [37, -1], [55, -6], [68, -12], [84, -4], [93, -8]].forEach(function (p) {
      var i = document.createElement('i');
      i.style.cssText = '--x: ' + p[0] + '%; --t: 11s; --w: ' + p[1] + 's';
      petals.appendChild(i);
    });
    card.appendChild(petals);
    card.appendChild(el('div', 'cl-title__over', years.min + ' — ' + years.max));
    card.appendChild(el('div', 'cl-title__name', 'Network charted'));
    card.appendChild(el('div', 'cl-title__sub', shownPeople.length + ' co-authors met along the way'));
    stage.appendChild(card);
    setTimeout(function () { card.classList.add('is-out'); }, 5200);
    setTimeout(function () { card.remove(); }, 6500);
  };
  play.addEventListener('click', function () {
    root.classList.add('has-played');  // the "press play!" thought bubble has done its job
    if (timer) { stop(); return; }
    play.setAttribute('aria-pressed', 'true');
    play.textContent = '❚❚ Pause';
    if (state.year >= years.max) setYear(years.min, true);
    timer = setInterval(function () {
      if (state.year >= years.max) { stop(); titleCard(); return; }
      setYear(state.year + 1, true);
    }, reduce ? 700 : 1300);
  });

  root.querySelectorAll('[data-cl-topic]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-cl-topic');
      state.topics[k] = !state.topics[k];
      b.setAttribute('aria-pressed', state.topics[k] ? 'true' : 'false');
      update(true);
    });
  });

  var search = root.querySelector('[data-cl-search]');
  search.addEventListener('input', function () { state.q = search.value.trim().toLowerCase(); applySel(); });
  search.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter') return;
    var hits = shownPeople.filter(function (n) { return state.q && n.id.toLowerCase().indexOf(state.q) !== -1; });
    if (hits.length) { select({ person: hits[0] }); focusOn(hits[0]); }
  });

  if (resetBtn) resetBtn.addEventListener('click', function () { userView = false; select(null); fit(reduce ? 0 : 500); resetBtn.hidden = true; });

  update(false);
  fit(0);
})();
