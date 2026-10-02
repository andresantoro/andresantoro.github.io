---
layout: notebook
title: "People"
permalink: /people/
sheet: "06"
hero: false
---
{% include base_path %}
{% assign ppl = site.data.people %}

{% capture aside %}
<dl class="nb-stats">
  <div><dt>Group</dt><dd>{{ ppl.current.size }}</dd></div>
  <div><dt>Alumni</dt><dd>{{ ppl.alumni.size }}</dd></div>
  <div><dt>Co-authors</dt><dd>{{ site.data.hypergraph.people.size }}</dd></div>
</dl>
{% endcapture %}
{% include nb/titleband.html title=page.title lede="The students I supervise and co-supervise, alumni, mentors — and the wider group of people I write papers with." sheet=page.sheet aside=aside %}

<section class="nb-section">
  {% include nb/section-head.html num="1" title="Group" note="currently supervised" %}
  <div class="nb-grid">
    {% for p in ppl.current %}
    {% assign words = p.name | split: " " %}
    <article class="nb-person">
      <div class="nb-cellbar"><span>{{ p.role }}{% if p.years %} · {{ p.years }}{% endif %}</span><span style="color: var(--accent)">● Active</span></div>
      <div class="nb-person__head">
        <div class="nb-monogram{% if p.role contains 'visiting' %} nb-monogram--blue{% endif %}" aria-hidden="true">{{ words.first | slice: 0 }}{{ words.last | slice: 0 }}</div>
        <div>
          <h3>{{ p.name }}</h3>
          <div class="nb-person__where">{{ p.where }}</div>
        </div>
      </div>
      {% if p.topic %}<p class="nb-person__topic">{{ p.topic }}</p>{% endif %}
      {% if p.tags %}<div class="nb-person__tags">{% for t in p.tags %}<span class="nb-tag">{{ t }}</span>{% endfor %}</div>{% endif %}
    </article>
    {% endfor %}
  </div>
</section>

<section class="nb-section">
  <div class="nb-section__head">
    <div class="nb-section__num">§2</div>
    <h2 class="nb-section__title">Alumni</h2>
    <button class="nb-section__aside nb-section__toggle" type="button" data-toggle-col="alumni-table" aria-pressed="false" aria-controls="alumni-table">Projects &amp; outcomes +</button>
  </div>
  <div class="nb-table-wrap">
    <table class="nb-table" id="alumni-table">
      <thead><tr><th scope="col">Name</th><th scope="col">Role</th><th scope="col">Where</th><th scope="col">Years</th><th scope="col" class="nb-col-opt">Project → outcome</th></tr></thead>
      <tbody>
        {% for p in ppl.alumni %}
        <tr>
          <th scope="row">{{ p.name }}</th>
          <td class="is-muted">{{ p.role }}</td>
          <td class="is-muted">{{ p.where }}</td>
          <td class="is-mono">{{ p.years }}</td>
          <td class="nb-col-opt">{% if p.project %}{{ p.project }}{% else %}<span class="is-muted">—</span>{% endif %}{% if p.outcome %} <span class="nb-outcome">→ {% if p.outcome_url %}<a href="{{ p.outcome_url }}">{{ p.outcome }}</a>{% else %}{{ p.outcome }}{% endif %}</span>{% endif %}</td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </div>
</section>

<section class="nb-section">
  {% include nb/section-head.html num="3" title="Mentors" %}
  <div class="nb-grid">
    {% for m in ppl.mentors %}
    <a class="nb-mentor" href="{{ m.url }}">
      <div class="nb-mentor__role">{{ m.role }}</div>
      <div class="nb-mentor__name">{{ m.name }} ↗</div>
      <div class="nb-mentor__where">{{ m.where }}</div>
    </a>
    {% endfor %}
  </div>
</section>

<section class="nb-section" id="network">
  {% include nb/section-head.html num="4" title="Collaboration hypergraph" note="click a person" %}
  <div class="nb-hgwrap">
    <figure class="nb-hgfig">
      {% include nb/hypergraph-people.svg %}
      <figcaption class="nb-hgkey nb-label">
        <span><i style="background: var(--accent)"></i>Student / mentee</span>
        <span><i style="background: var(--blue)"></i>Mentor</span>
        <span><i style="border: 1.5px solid var(--chalk)"></i>Collaborator</span>
        <span>Each shape is a paper or preprint since {{ site.data.hypergraph.since }}, joining its co-authors (I am in all of them, so I am left out). Consortium papers with more than 15 authors are omitted.</span>
      </figcaption>
    </figure>
    <aside class="nb-hgpanel" aria-live="polite">
      <div class="nb-cellbar"><span>Details</span></div>
      <div class="nb-hgpanel__body" data-hg-idle>
        <div class="nb-hgpanel__name">{{ site.data.hypergraph.people.size }} co-authors</div>
        <p class="nb-row__text">Everyone I have written a paper or preprint with since {{ site.data.hypergraph.since }}. Shapes are coloured by size: small teams in green, larger ones towards violet.</p>
        <p class="nb-hand" style="margin-top: 14px; color: var(--chalk)">← pick anyone to see what we did together</p>
      </div>
      <div class="nb-hgpanel__body" data-hg-sel hidden>
        <div class="nb-label" data-hg-role></div>
        <div class="nb-hgpanel__name" data-hg-name></div>
        <div class="nb-label" style="margin-top: 8px" data-hg-stats></div>
        <ol data-hg-works></ol>
        <button class="nb-chip" type="button" data-hg-clear style="margin-top: 16px">Clear ×</button>
      </div>
    </aside>
  </div>
</section>

<script type="application/json" id="hg-data">{{ site.data.hypergraph | jsonify }}</script>
