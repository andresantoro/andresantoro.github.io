---
layout: notebook
title: "Code"
permalink: /code/
sheet: "07"
hero: false
lede: "Open-source implementations of the methods in my papers, ready for anyone to reuse. Everything lives on [GitHub](https://github.com/andresantoro)."
---
{% include base_path %}
{% include nb/code-glyphs.svg %}
{% assign repos = site.data.code %}
{% assign total_stars = 0 %}{% for r in repos %}{% assign total_stars = total_stars | plus: r.stars %}{% endfor %}

{% comment %}Inventory (a nod to the Home battle scene): every repository is an item, drawn as a glyph; rarity comes from its GitHub stars. Slots jump to the cards below.{% endcomment %}
{% capture aside %}
<nav class="nb-inv" aria-label="Inventory">
  <div class="nb-inv__head"><span>Inventory</span><span>{{ repos.size }} items · ★ {{ total_stars }}</span></div>
  <ul class="nb-inv__grid">
    {% for r in repos %}{% if r.stars >= 40 %}{% assign rar = "legendary" %}{% elsif r.stars >= 9 %}{% assign rar = "rare" %}{% else %}{% assign rar = "common" %}{% endif %}
    <li><a class="nb-inv__slot is-{{ rar }}" href="#repo-{{ r.name | slugify }}" style="--i: {{ forloop.index0 }}"><svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><use href="#g-{{ r.glyph }}" /></svg><span class="nb-inv__qty">★{{ r.stars }}</span><span class="nb-inv__tip"><b>{{ r.item }}</b> {{ r.name }}</span></a></li>
    {% endfor %}
    <li><a class="nb-inv__slot is-empty" href="https://github.com/andresantoro"><span aria-hidden="true">+</span><span class="nb-inv__tip"><b>Empty slot</b> fork one to fill it</span></a></li>
  </ul>
</nav>
{% endcapture %}
{% include nb/titleband.html title=page.title lede=page.lede sheet=page.sheet aside=aside %}

<section class="nb-section">
  <div class="nb-grid">
    {% for r in repos %}{% if r.stars >= 40 %}{% assign rar = "Legendary" %}{% elsif r.stars >= 9 %}{% assign rar = "Rare" %}{% else %}{% assign rar = "Common" %}{% endif %}
    <article class="nb-repo" id="repo-{{ r.name | slugify }}">
      <div class="nb-cellbar"><span>[{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}] {{ r.lang }}</span><a href="https://github.com/{{ r.repo }}">GitHub ↗</a></div>
      <div class="nb-repo__body">
        <div class="nb-repo__item"><svg class="nb-repo__glyph" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><use href="#g-{{ r.glyph }}" /></svg><p class="nb-repo__rarity is-{{ rar | downcase }}"><span>{{ rar }}</span> {{ r.item }}</p></div>
        <h2 class="nb-repo__name">{{ r.name | replace: "_", "_<wbr>" }}</h2>
        <p class="nb-repo__what">{{ r.what }}</p>
      </div>
      <dl class="nb-kv">
        <div><dt>GitHub</dt><dd>★ {{ r.stars }} stars · {{ r.forks }} forks</dd></div>
        {% if r.paper %}<div><dt>Paper</dt><dd><a href="{{ r.paper_url }}">{{ r.paper }}</a></dd></div>{% endif %}
        {% if r.doi %}<div><dt>Archive</dt><dd><a href="{{ r.doi }}">{{ r.doi | remove: "https://" }}</a></dd></div>{% endif %}
        {% if r.tags %}<div><dt>Tags</dt><dd>{{ r.tags | join: " · " }}</dd></div>{% endif %}
      </dl>
      <div class="nb-shell">
        <code>git clone https://github.com/{{ r.repo }}</code>
        <button type="button" data-copy="git clone https://github.com/{{ r.repo }}">Copy</button>
      </div>
    </article>
    {% endfor %}
  </div>
</section>
