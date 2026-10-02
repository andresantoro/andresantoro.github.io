---
layout: notebook
title: "Funding"
permalink: /funding/
sheet: "05"
hero: false
---
{% include base_path %}
{% assign g = site.data.grants %}
{% assign major = g.items | where: "major", true %}
{% assign other = g.items | where_exp: "i", "i.major != true" %}

{% capture aside %}
<dl class="nb-stats">
  <div><dt>Total</dt><dd>{{ g.total | remove: ",000" | append: "k" }}</dd></div>
  <div><dt>Awards</dt><dd>{{ g.items.size }}</dd></div>
</dl>
{% endcapture %}
{% include nb/titleband.html title=page.title lede="Fellowships, research grants and smaller awards that have funded my work." sheet=page.sheet aside=aside %}

<section class="nb-section">
  {% include nb/section-head.html num="1" title="Research grants" note="currently active" %}
  <div class="nb-grid nb-grid--wide">
    {% for i in major %}
    <article class="nb-grant">
      <div class="nb-cellbar"><span>{{ i.year }} · {{ i.duration }}</span><span style="color: var(--accent)">● Active</span></div>
      <div class="nb-grant__body">
        <div class="nb-grant__amount">{{ i.amount }}</div>
        <span class="nb-tag nb-tag--accent">{{ i.role }}</span>
        <h3 class="nb-grant__name">{{ i.name }}</h3>
        <div class="nb-grant__funder">{{ i.funder }}</div>
        <p class="nb-grant__project">{{ i.project }}</p>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="nb-section">
  {% include nb/section-head.html num="2" title="Awards &amp; funding" %}
  {% for i in other %}
  <div class="nb-row">
    <div class="nb-row__key">{{ i.year }}</div>
    <div class="nb-row__main">
      <h3 class="nb-row__title" style="margin-top: 0">{{ i.name }}</h3>
      <p class="nb-row__text">{{ i.funder }}</p>
    </div>
    <div class="nb-row__side nb-grant__amt">{{ i.amount }}</div>
  </div>
  {% endfor %}
</section>
