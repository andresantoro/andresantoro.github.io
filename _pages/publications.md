---
layout: notebook
title: "Publications"
permalink: /publications/
sheet: "04"
hero: false
---
{% include base_path %}
{% assign papers = site.data.publications.papers %}
{% assign talks = site.data.publications.talks %}
{% assign posters = site.data.publications.posters %}

{% capture aside %}
<figure class="nb-minihg">
  <a href="{{ base_path }}/collaborations/" aria-label="Explore the interactive co-authorship hypergraph">{% include nb/hypergraph-mini.svg %}</a>
  <figcaption class="nb-label"><a href="{{ base_path }}/collaborations/">Co-authors since {{ site.data.hypergraph.since }}, as a hypergraph · explore →</a></figcaption>
</figure>
{% endcapture %}
{% capture below %}
<dl class="nb-stats">
  <div><dt>Papers</dt><dd>{{ papers.size }}</dd></div>
  <div><dt>Talks</dt><dd>{{ talks.size }}</dd></div>
  <div><dt>Posters</dt><dd>{{ posters.size }}</dd></div>
</dl>
{% endcapture %}
{% capture lede %}For a summary of my work, you can also have a look at my [Google Scholar profile]({{ site.author.googlescholar }}).{% endcapture %}
{% include nb/titleband.html title=page.title fit="9.8" lede=lede sheet=page.sheet aside=aside below=below %}

<div class="nb-toolbar">
  <div class="nb-toolbar__row">
    <label class="nb-toolbar__label" for="pub-search">Search</label>
    <input id="pub-search" type="search" placeholder="title, author, venue…" data-pub-search>
    <div class="nb-group" role="group" aria-label="Category">
      <button class="nb-filter nb-filter--big" type="button" data-cat-btn="papers" aria-pressed="true">Papers <small>{{ papers.size }}</small></button>
      <button class="nb-filter nb-filter--big" type="button" data-cat-btn="talks" aria-pressed="false">Talks <small>{{ talks.size }}</small></button>
      <button class="nb-filter nb-filter--big" type="button" data-cat-btn="posters" aria-pressed="false">Posters <small>{{ posters.size }}</small></button>
    </div>
  </div>
  <div class="nb-toolbar__row">
    <div class="nb-group" role="group" aria-label="Type" data-type-group>
      <span class="nb-toolbar__label">Type</span>
      <button class="nb-filter" type="button" data-type-btn="all" aria-pressed="true"><i></i>All</button>
      <button class="nb-filter" type="button" data-type-btn="preprint" aria-pressed="false"><i style="background: var(--accent)"></i>Preprint</button>
      <button class="nb-filter" type="button" data-type-btn="journal" aria-pressed="false"><i style="background: var(--chalk)"></i>Journal</button>
      <button class="nb-filter" type="button" data-type-btn="conference" aria-pressed="false"><i style="background: var(--blue)"></i>Conference</button>
    </div>
    <div class="nb-group nb-group--grow" role="group" aria-label="Year">
      <span class="nb-toolbar__label">Year</span>
      <button class="nb-filter" type="button" data-year-btn="all" aria-pressed="true">All</button>
      {% assign years = "2026|2025|2024|2023|2022|2021|2020|2019|2018|2017|2016|2015|2014" | split: "|" %}
      {% for y in years %}
        {% assign cats = "" %}
        {% assign hp = papers | where: "year", y %}{% if hp.size > 0 %}{% assign cats = cats | append: "papers " %}{% endif %}
        {% assign hq = posters | where: "year", y %}{% if hq.size > 0 %}{% assign cats = cats | append: "posters " %}{% endif %}
        {% for t in talks %}{% assign ty = t.date | slice: -4, 4 %}{% if ty == y %}{% assign cats = cats | append: "talks " %}{% break %}{% endif %}{% endfor %}
        {% if cats != "" %}<button class="nb-filter" type="button" data-year-btn="{{ y }}" data-cats="{{ cats | strip }}" aria-pressed="false">{{ y }}</button>{% endif %}
      {% endfor %}
    </div>
    <button class="nb-filter nb-filter--clear" type="button" data-pub-clear>Clear ×</button>
  </div>
</div>

<section data-pub-list>
  <div class="nb-count nb-label"><span>Showing <span data-pub-shown>{{ papers.size }}</span> of <span data-pub-total>{{ papers.size }}</span> <span data-pub-noun>papers</span></span><span>* Co-last authorship</span></div>
  <div class="nb-empty" data-pub-empty hidden>∅ — nothing matches</div>

  {% assign n = papers.size %}
  {% assign groups = papers | group_by: "year" %}
  {% for g in groups %}
  <div class="nb-yearhead" data-cat="papers" data-year="{{ g.name }}"><h2>{{ g.name }}</h2><span class="nb-label">{{ g.items.size }} paper{% if g.items.size != 1 %}s{% endif %}</span></div>
  {% for p in g.items %}
  {% assign parts = p.authors | split: ", " %}
  <article class="nb-row nb-pub" data-cat="papers" data-type="{{ p.type | default: 'journal' }}" data-year="{{ p.year }}" data-search="{{ p.title | append: ' ' | append: p.authors | append: ' ' | append: p.venue | downcase | escape }}">
    <div class="nb-row__key nb-row__key--num">[{{ n }}]</div>
    <div class="nb-row__main">
      <div class="nb-row__meta">
        <span class="nb-tag {% if p.type == 'preprint' %}nb-tag--accent{% elsif p.type == 'conference' %}nb-tag--blue{% else %}nb-tag--chalk{% endif %}">{{ p.type | default: "journal" }}</span>
        {{ p.venue }}
        {% if forloop.first and forloop.parentloop.first %}<span class="nb-tag nb-tag--solid">New</span>{% endif %}
      </div>
      <h3 class="nb-row__title">{{ p.title }}</h3>
      <p class="nb-row__text">
        {% if parts.size > 14 %}
          {% assign me = 0 %}{% for a in parts %}{% if a contains "A. Santoro" %}{% assign me = forloop.index0 %}{% endif %}{% endfor %}
          {{ parts[0] }}, {{ parts[1] }}, {{ parts[2] }}, … <span class="nb-me">{{ parts[me] }}</span>, … {{ parts.last }} ({{ parts.size }} authors)
        {% else %}
          {{ p.authors | replace: "A. Santoro", '<span class="nb-me">A. Santoro</span>' }}
        {% endif %}
      </p>
    </div>
    <div class="nb-row__side">
      {% if p.pdf %}<a class="nb-chip" href="{{ p.pdf | strip }}">PDF</a>{% endif %}
      {% if p.doi %}<a class="nb-chip" href="{% unless p.doi contains 'http' %}https://doi.org/{% endunless %}{{ p.doi }}">DOI</a>{% endif %}
      {% if p.code %}<a class="nb-chip" href="{{ p.code }}">Code</a>{% endif %}
      {% if p.data %}<a class="nb-chip" href="{{ p.data }}">Data</a>{% endif %}
      {% if p.abstract %}<button class="nb-chip" type="button" data-abs-toggle aria-expanded="false" aria-controls="abs-{{ n }}">Abstract +</button>{% endif %}
    </div>
    {% if p.abstract %}<div class="nb-pub__abs" id="abs-{{ n }}"><span class="nb-label">Abs.</span><p>{{ p.abstract }}</p></div>{% endif %}
  </article>
  {% assign n = n | minus: 1 %}
  {% endfor %}
  {% endfor %}

  {% assign n = talks.size %}
  {% assign tgroups = talks | group_by_exp: "t", "t.date | slice: -4, 4" %}
  {% for g in tgroups %}
  <div class="nb-yearhead" data-cat="talks" data-year="{{ g.name }}" hidden><h2>{{ g.name }}</h2><span class="nb-label">{{ g.items.size }} talk{% if g.items.size != 1 %}s{% endif %}</span></div>
  {% for t in g.items %}
  <article class="nb-row nb-pub" data-cat="talks" data-year="{{ g.name }}" data-search="{{ t.title | append: ' ' | append: t.venue | append: ' ' | append: t.location | downcase | escape }}" hidden>
    <div class="nb-row__key nb-row__key--num">[{{ n }}]</div>
    <div class="nb-row__main">
      <div class="nb-row__meta">{{ t.date }}{% if t.invited %} <span class="nb-tag nb-tag--accent">Invited</span>{% endif %}</div>
      <h3 class="nb-row__title">{{ t.title }}</h3>
      <p class="nb-row__text">{{ t.venue }} · {{ t.location }}</p>
    </div>
  </article>
  {% assign n = n | minus: 1 %}
  {% endfor %}
  {% endfor %}

  {% assign n = posters.size %}
  {% assign qgroups = posters | group_by: "year" %}
  {% for g in qgroups %}
  <div class="nb-yearhead" data-cat="posters" data-year="{{ g.name }}" hidden><h2>{{ g.name }}</h2><span class="nb-label">{{ g.items.size }} poster{% if g.items.size != 1 %}s{% endif %}</span></div>
  {% for q in g.items %}
  <article class="nb-row nb-pub" data-cat="posters" data-year="{{ q.year }}" data-search="{{ q.title | append: ' ' | append: q.authors | append: ' ' | append: q.venue | downcase | escape }}" hidden>
    <div class="nb-row__key nb-row__key--num">[{{ n }}]</div>
    <div class="nb-row__main">
      <div class="nb-row__meta"><span class="nb-tag">Poster</span> {{ q.venue }}</div>
      <h3 class="nb-row__title">{{ q.title }}</h3>
      <p class="nb-row__text">{{ q.authors | replace: "A. Santoro", '<span class="nb-me">A. Santoro</span>' }}</p>
    </div>
  </article>
  {% assign n = n | minus: 1 %}
  {% endfor %}
  {% endfor %}
</section>
