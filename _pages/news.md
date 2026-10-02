---
layout: notebook
title: "News"
permalink: /news/
sheet: "01"
lede: "A log of papers, preprints, talks and fieldwork."
---
{% include base_path %}

<section class="nb-section nb-news">
  {% for item in site.data.news %}
  <article class="nb-row">
    <div class="nb-row__key{% if forloop.first %} nb-row__key--accent{% endif %}">{{ item.date }}</div>
    <div class="nb-row__main">
      <span class="nb-tag{% if forloop.first %} nb-tag--accent{% endif %}">{{ item.tag }}</span>
      <h2 class="nb-row__title">{{ item.title }}</h2>
      <div class="nb-row__text">{{ item.body }}</div>
    </div>
    {% if item.link %}<a class="nb-row__side" href="{{ item.link }}">Read ↗</a>{% endif %}
  </article>
  {% endfor %}
</section>
