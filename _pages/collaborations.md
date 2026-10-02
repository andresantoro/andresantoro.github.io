---
layout: notebook
title: "Collaborations"
permalink: /collaborations/
sheet: "06"
hero: false
---
{% include base_path %}
{% assign hg = site.data.hypergraph %}
{% assign last_year = hg.works | map: "year" | sort | last %}
{% assign n_papers = 0 %}{% for w in hg.works %}{% assign n_papers = n_papers | plus: w.titles.size %}{% endfor %}

{% capture aside %}
<dl class="nb-stats">
  <div><dt>Co-authors</dt><dd data-cl-people>{{ hg.people.size }}</dd></div>
  <div><dt>Papers</dt><dd data-cl-papers>{{ n_papers }}</dd></div>
</dl>
{% endcapture %}
{% capture lede %}Every paper and preprint since {{ hg.since }} is a shape joining its co-authors. Scrub through the years, switch topics on and off, drag people around. I am in all of them, so I am left out.{% endcapture %}
{% include nb/titleband.html title=page.title fit="12.3" lede=lede sheet=page.sheet aside=aside %}

<section class="cl" data-cl>
  <div class="cl-bar">
    <div class="cl-time">
      <button class="cl-play" type="button" data-cl-play aria-pressed="false">▶ Play</button>
      <div class="cl-scrub">
        <input class="cl-range" type="range" min="{{ hg.since }}" max="{{ last_year }}" step="1" value="{{ last_year }}" data-cl-range aria-label="Show papers up to year">
        <div class="cl-ticks" aria-hidden="true">{% for y in (hg.since..last_year) %}<span>’{{ y | modulo: 100 | prepend: "0" | slice: -2, 2 }}</span>{% endfor %}</div>
      </div>
      <output class="cl-year" data-cl-year>{{ last_year }}</output>
    </div>
    <label class="cl-search"><span class="nb-label">Find</span><input type="search" placeholder="a name…" autocomplete="off" data-cl-search></label>
  </div>
  <div class="cl-topics" role="group" aria-label="Topics">
    {% for t in hg.topics %}<button class="nb-filter cl-topic" type="button" aria-pressed="true" data-cl-topic="{{ t.key }}" style="--c: {{ t.color }}"><i></i>{{ t.label }}</button>{% endfor %}
  </div>
  <div class="cl-main">
    <div class="cl-stage" data-cl-stage>
      <div class="cl-fallback">{% include nb/hypergraph-people.svg %}</div>
      <div class="cl-hint nb-label">Drag · scroll to zoom · click a person or a shape</div>
      <button class="nb-chip cl-reset" type="button" data-cl-reset hidden>Reset view</button>
    </div>
    <aside class="nb-hgpanel cl-panel" aria-live="polite">
      <div class="nb-cellbar"><span>Details</span></div>
      <div class="nb-hgpanel__body" data-cl-idle>
        <div class="nb-hgpanel__name"><span data-cl-idle-people>{{ hg.people.size }}</span> co-authors</div>
        <p class="nb-row__text">Shapes are papers, coloured by topic; a line is a paper with two co-authors. Bigger dots have more joint papers.</p>
        <p class="nb-hand" style="margin-top: 14px; color: var(--chalk)">← press play to watch it grow</p>
      </div>
      <div class="nb-hgpanel__body" data-cl-sel hidden></div>
    </aside>
  </div>
  <div class="nb-hgkey nb-label cl-key">
    <span><i style="background: var(--accent)"></i>Student / mentee</span>
    <span><i style="background: var(--blue)"></i>Mentor</span>
    <span><i style="border: 1.5px solid var(--chalk)"></i>Collaborator</span>
    <span><i class="is-line"></i>Paper with 2 co-authors</span>
    <span><i class="is-shape"></i>Paper with 3+ co-authors</span>
    <span>Consortium papers with more than 15 authors are omitted. Static version on <a href="{{ base_path }}/people/#network">People</a>.</span>
  </div>
</section>

<script type="application/json" id="collab-data">{{ hg | jsonify }}</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js" defer></script>
<script src="{{ base_path }}/assets/js/collab.js?v={{ site.time | date: '%s' }}" defer></script>
