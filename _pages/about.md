---
layout: notebook
permalink: /
title: "Andrea Santoro"
excerpt: "About me"
hero: false
sheet: "00"
redirect_from:
  - /about/
  - /about.html
---
{% include base_path %}
{% assign papers = site.data.publications.papers %}

<section class="nb-hero">
  <div class="nb-sheetline"><span>Sheet 00 — Home</span><span>Rev. {{ site.time | date: "%Y.%m" }}</span></div>
  <div class="nb-hero__row">
    <div class="nb-hero__main">
      <h1 class="nb-display">Andrea<br>Santoro<span class="nb-square" aria-hidden="true"></span></h1>
      <p class="nb-hero__lede">I’m an applied mathematician interested in using mathematics and data to understand how complex real-world systems work. I develop methods to uncover <mark>higher-order, time-varying interactions</mark> in multivariate signals — from the brain to financial markets — and use network science to explore systems as diverse as sperm whales and world <span class="nb-nowrap">cuisines.<span class="nb-cursor" aria-hidden="true"></span></span></p>
    </div>
    <figure class="nb-portrait">
      <div class="nb-portrait__frame">
        {% include nb/bubble.html text="Hi there!" class="nb-bubble--hero" %}
        <span class="nb-halftone" aria-hidden="true"></span>
        <span class="nb-crop nb-crop--tl" aria-hidden="true"></span><span class="nb-crop nb-crop--tr" aria-hidden="true"></span>
        <span class="nb-crop nb-crop--bl" aria-hidden="true"></span><span class="nb-crop nb-crop--br" aria-hidden="true"></span>
        <img src="{{ base_path }}/images/bio-photo-900.jpg" alt="Portrait of Andrea Santoro">
      </div>
      <figcaption class="nb-label">Fig. 0 — the author, Turin</figcaption>
    </figure>
  </div>
</section>

<section class="nb-board">
  <figure class="nb-board__fig">
    <div class="nb-cellbar"><span>Fig. 1 — whiteboard</span><span>chalk on slate</span></div>
    {% include nb/whiteboard.svg %}
  </figure>
  <div class="nb-board__side">
    <div class="nb-cellbar"><span>Abstract</span></div>
    <p>I develop computational methods to infer structured, time-varying interactions from high-dimensional multivariate data, combining statistical inference, network theory and computational topology. Neuroscience is my main application area, and the same methods extend to financial and other complex systems; with network science I also study sperm whale behaviour and world cuisines.</p>
    <dl class="nb-kv">
      <div><dt>Role</dt><dd>MSCA Postdoctoral Fellow</dd></div>
      <div><dt>Host</dt><dd><a href="https://www.isi.it/">ISI Foundation</a>, Turin · <a href="https://nplresearch.github.io/">NPLab</a></dd></div>
      <div><dt>Project</dt><dd>temporalHOI · <a href="https://www.projectceti.org/">Project CETI</a></dd></div>
    </dl>
    <div class="nb-actions">
      <a class="nb-btn nb-btn--primary" href="{{ base_path }}/publications/">Publications →</a>
      <a class="nb-btn" href="{{ base_path }}/files/cv.pdf">CV ↓</a>
    </div>
  </div>
</section>

<section class="nb-section nb-news">
  {% include nb/section-head.html num="1" title="Log" link="/news/" link_text="All entries" %}
  {% for item in site.data.news limit: 4 %}
  <div class="nb-row">
    <div class="nb-row__key{% if forloop.first %} nb-row__key--accent{% endif %}">{{ item.date }}</div>
    {% if forloop.first %}<span class="nb-burst" aria-hidden="true">New!</span>{% endif %}
    <div class="nb-row__main">
      <span class="nb-tag{% if forloop.first %} nb-tag--accent{% endif %}">{% if forloop.first %}<span class="nb-sr">New </span>{% endif %}{{ item.tag }}</span>
      <h3 class="nb-row__title">{{ item.title | remove_first: "New preprint: " }}</h3>
    </div>
    {% if item.link %}<a class="nb-row__side" href="{{ item.link }}">Read ↗</a>{% endif %}
  </div>
  {% endfor %}
</section>

<section class="nb-section">
  {% include nb/section-head.html num="2" title="Research" link="/projects/" link_text="All research themes" %}
  <div class="nb-grid">
    <a class="nb-cell" href="{{ base_path }}/projects/#time-series">
      <div class="nb-cellbar"><span>2.1</span><span>Fig. 2.1</span></div>
      <figure class="nb-plate"><img src="{{ base_path }}/images/projects/Time_series.png" alt="" loading="lazy"></figure>
      <div class="nb-cell__body"><h3 class="nb-cell__title">Time series analysis</h3><p class="nb-cell__text">Complex-network and AI methods for multivariate signals.</p></div>
    </a>
    <a class="nb-cell" href="{{ base_path }}/projects/#computational-neuroscience">
      <div class="nb-cellbar"><span>2.2</span><span>Fig. 2.2</span></div>
      <figure class="nb-plate"><img src="{{ base_path }}/images/projects/computational_neuro.png" alt="" loading="lazy"></figure>
      <div class="nb-cell__body"><h3 class="nb-cell__title">Computational neuroscience</h3><p class="nb-cell__text">Higher-order and topological approaches to neural systems, from micro- to macro-scale.</p></div>
    </a>
    <a class="nb-cell" href="{{ base_path }}/projects/#affective-neuroscience">
      <div class="nb-cellbar"><span>2.2.2</span><span>Fig. 2.2.2</span></div>
      <figure class="nb-plate"><img src="{{ base_path }}/images/projects/movies.png" alt="" loading="lazy"></figure>
      <div class="nb-cell__body"><h3 class="nb-cell__title">Affective neuroscience</h3><p class="nb-cell__text">How emotions emerge from groups of interacting brain regions, using higher-order topology and naturalistic film fMRI.</p></div>
    </a>
    <a class="nb-cell" href="{{ base_path }}/projects/#multilayer-networks">
      <div class="nb-cellbar"><span>2.3</span><span>Fig. 2.3</span></div>
      <figure class="nb-plate"><img src="{{ base_path }}/images/projects/multilayer_net_2.png" alt="" loading="lazy"></figure>
      <div class="nb-cell__body"><h3 class="nb-cell__title">Multilayer networks</h3><p class="nb-cell__text">Structure and dynamics of interconnected systems, through information theory and optimality.</p></div>
    </a>
    <a class="nb-cell" href="{{ base_path }}/projects/#project-ceti">
      <div class="nb-cellbar"><span>2.4</span><span>Fig. 2.4</span></div>
      <figure class="nb-plate nb-plate--whale"><img src="{{ base_path }}/images/projects/sperm_whales.png" alt="" loading="lazy"></figure>
      <div class="nb-cell__body"><h3 class="nb-cell__title">Project CETI</h3><p class="nb-cell__text">Network science for the communication and behaviour of sperm whales.</p></div>
    </a>
    <a class="nb-cell" href="{{ base_path }}/projects/#computational-gastronomy">
      <div class="nb-cellbar"><span>2.5</span><span>Fig. 2.5</span></div>
      <figure class="nb-plate"><img src="{{ base_path }}/images/projects/computational_gastonomy.png" alt="" loading="lazy"></figure>
      <div class="nb-cell__body"><h3 class="nb-cell__title">Computational gastronomy</h3><p class="nb-cell__text">How cuisines combine ingredients, through networks and topology.</p></div>
    </a>
  </div>
</section>

<section class="nb-section">
  {% include nb/section-head.html num="3" title="Selected publications" link="/publications/" link_text="All publications" %}
  {% for p in papers %}{% if p.selected %}
  <div class="nb-row">
    <div class="nb-row__key nb-row__key--num">[{{ papers.size | minus: forloop.index0 }}]</div>
    <div class="nb-row__main">
      <div class="nb-row__meta">{{ p.type }} · {{ p.venue }} · {{ p.year }}</div>
      <h3 class="nb-row__title">{{ p.title }}</h3>
      <p class="nb-row__text">{{ p.authors | replace: "A. Santoro", '<span class="nb-me">A. Santoro</span>' }}</p>
    </div>
    <div class="nb-row__side">
      {% if p.pdf %}<a class="nb-chip" href="{{ p.pdf }}">PDF</a>{% endif %}
      {% if p.doi %}<a class="nb-chip" href="{% unless p.doi contains 'http' %}https://doi.org/{% endunless %}{{ p.doi }}">DOI</a>{% endif %}
      {% if p.code %}<a class="nb-chip" href="{{ p.code }}">Code</a>{% endif %}
      {% if p.data %}<a class="nb-chip" href="{{ p.data }}">Data</a>{% endif %}
    </div>
  </div>
  {% endif %}{% endfor %}
  <a class="nb-caption nb-caption--end" href="{{ base_path }}/publications/">To be continued…</a>
</section>

<section class="nb-section">
  {% include nb/section-head.html num="4" title="About" link="/cv/" link_text="Full CV" %}
  <div class="nb-about">
  <div class="nb-about__text nb-prose">
    <p>I am a mathematician with a strong interest in applied sciences. My research focuses on complex networks, time series analysis, neuroscience, and information theory, with a particular emphasis on higher-order models and their application to large-scale systems. Currently, my work involves developing topological approaches to infer higher-order dependencies in multivariate time series, with applications in brain data and economics. I am also part of <a href="https://www.projectceti.org/">Project CETI</a> (Cetacean Translation Initiative), which is an ambitious interdisciplinary endeavor aiming to decode the communication of sperm whales.</p>
    <p>I am an MSCA Postdoctoral Researcher at the <a href="https://www.isi.it/">ISI Foundation</a> in Turin, supported by the Marie Curie project "temporalHOI". I work within the <a href="https://nplresearch.github.io/">NPLab</a> under the mentorship of Prof. <a href="https://lordgrilo.github.io/">Giovanni Petri</a>, and in collaboration with Dr. <a href="https://sites.google.com/site/devicofallanifabrizio/">Fabrizio De Vico Fallani</a> at INRIA, Paris. I received my PhD in Applied Mathematics from the <a href="https://www.qmul.ac.uk/maths/research/complex-systems-and-networks-group/">Complex Systems and Networks Group</a> at Queen Mary University of London, where I worked under the supervision of <a href="https://webspace.maths.qmul.ac.uk/v.nicosia/">Vincenzo Nicosia</a> and <a href="https://sites.google.com/view/lucaslacasa/">Lucas Lacasa</a>.</p>
    <p>Previously, I held position as a Researcher at CENTAI and worked as a Postdoctoral Researcher at the <a href="https://neuro-x.epfl.ch/en/">Neuro-X Institute</a> at EPFL (Geneva), under the guidance of <a href="https://amicolab.org/">Dr. Enrico Amico</a> within the MIPlab group of <a href="https://miplab.epfl.ch/index.php">Prof. Dimitri Van De Ville</a>. I have also held research positions at <a href="https://www.turing.ac.uk/">The Alan Turing Institute</a> (London) and served as a Research Assistant at Queen Mary University of London.</p>
    <p>My interest in complex networks began in 2014 during my visits to the Complex Systems and Networks group at Queen Mary University, under the supervision of <a href="http://www.maths.qmul.ac.uk/~latora/">Vito Latora</a> and <a href="https://webspace.maths.qmul.ac.uk/v.nicosia/">Vincenzo Nicosia</a>. I obtained a degree in Mathematics and Master in Applied Mathematics both from the University of Catania. I was also enrolled at the <a href="https://ssc.unict.it/">Scuola Superiore di Catania</a>, an institution that gives talented students from the University of Catania complementary and advanced classes and encourages them to start research projects before graduation. My master's thesis and early research were supervised by <a href="https://scholar.google.co.uk/citations?user=5FilzyUAAAAJ&hl=en">Giuseppe Nicosia</a>. You can find more about me <a href="{{ base_path }}/cv/">here</a>.</p>
  </div>
  <figure class="nb-about__fig">
    <div class="nb-about__sticky">
      <div class="nb-cellbar"><span>Fig. 4</span><span>Turin</span></div>
      <div class="nb-caption nb-caption--over" aria-hidden="true">Meanwhile, in Turin…</div>
      <img src="{{ base_path }}/images/turin4-1100.jpg" alt="Low-poly view of Turin with the Mole Antonelliana and the Alps" loading="lazy">
      <figcaption class="nb-label">Turin — the Mole Antonelliana and the Alps, triangulated</figcaption>
    </div>
  </figure>
  </div>
  <div class="nb-cellbar nb-barcode-head"><span>Trajectory</span><span class="nb-hand">drawn as a persistence barcode</span></div>
  <div class="nb-barcode">
    <div class="nb-barcode__grid">
{%- assign tj = site.data.trajectory -%}
{%- assign now_y = site.time | date: "%Y" | plus: 0 -%}
{%- assign now_m = site.time | date: "%m" | plus: 0 -%}
{%- assign axis_end = now_y | plus: 1 -%}
{%- assign a0 = tj.axis_start | times: 12 -%}
{%- assign span = axis_end | minus: tj.axis_start | times: 12 -%}
{%- for r in tj.rows -%}
{%- assign sy = r.start | slice: 0, 4 | plus: 0 -%}{%- assign sm = r.start | slice: 5, 2 | plus: 0 -%}
{%- assign s = sy | times: 12 | plus: sm | minus: 1 -%}
{%- if r.end == "present" -%}{%- assign e = now_y | times: 12 | plus: now_m -%}{%- else -%}{%- assign ey = r.end | slice: 0, 4 | plus: 0 -%}{%- assign em = r.end | slice: 5, 2 | plus: 0 -%}{%- assign e = ey | times: 12 | plus: em -%}{%- endif -%}
{%- assign left = s | minus: a0 | times: 100.0 | divided_by: span | round: 2 -%}
{%- assign width = e | minus: s | times: 100.0 | divided_by: span | round: 2 %}
      <div class="nb-barcode__label"><b>{{ r.label }}</b><span> · {{ r.where }}</span></div>
      <div class="nb-barcode__track"><span class="nb-barcode__bar{% if r.kind == 'train' %} nb-barcode__bar--train{% elsif r.kind == 'now' %} nb-barcode__bar--now{% endif %}" style="left: {{ left }}%; width: {{ width }}%" title="{{ r.start }} – {{ r.end }}"></span></div>
{%- endfor %}
      <div></div>
      <div class="nb-barcode__axis" style="--years: {{ span | divided_by: 12 }}">{% assign last = axis_end | minus: 1 %}{% for y in (tj.axis_start..last) %}<span>’{{ y | modulo: 100 | prepend: "0" | slice: -2, 2 }}{% if forloop.last %} →{% endif %}</span>{% endfor %}</div>
    </div>
    <div class="nb-legend"><span><i class="is-train"></i>Training</span><span><i></i>Positions</span><span><i class="is-now"></i>Now</span><a href="{{ base_path }}/cv/">Full CV →</a></div>
  </div>
</section>
