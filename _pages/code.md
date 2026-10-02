---
layout: notebook
title: "Code"
permalink: /code/
sheet: "07"
lede: "Open-source implementations of the methods in my papers, ready for anyone to reuse. Everything lives on [GitHub](https://github.com/andresantoro)."
---
{% include base_path %}

<section class="nb-section">
  <div class="nb-grid">
    {% for r in site.data.code %}
    <article class="nb-repo">
      <div class="nb-cellbar"><span>[{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}] {{ r.lang }}</span><a href="https://github.com/{{ r.repo }}">GitHub ↗</a></div>
      <div class="nb-repo__body">
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
