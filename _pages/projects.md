---
layout: notebook
title: "Projects"
permalink: /projects/
sheet: "02"
lede: "Research lines I am working on, from methods for multivariate signals to sperm whales and food."
---
{% include base_path %}

<section class="nb-section">

<article class="nb-project" id="time-series">
  <div class="nb-project__fig"><figure class="nb-plate"><img src="{{ base_path }}/images/projects/Time_series.png" alt="Time Series Analysis"></figure></div>
  <div class="nb-project__body">
    <div class="nb-label">§2.1</div>
    <h2>Time Series Analysis</h2>
    <p>Methods to analyze multivariate signals</p>
    <div class="nb-prose">
      <ul>
        <li>Forecasting methods for complex time series</li>
        <li>Higher-order inference in temporal data</li>
        <li>Arrow of time in time-varying signals</li>
      </ul>
    </div>
  </div>
</article>

<article class="nb-project" id="computational-neuroscience">
  <div class="nb-project__fig"><figure class="nb-plate"><img src="{{ base_path }}/images/projects/computational_neuro.png" alt="Brain connectivity network representation"></figure></div>
  <div class="nb-project__body">
    <div class="nb-label">§2.2</div>
    <h2>Computational Neuroscience</h2>
    <p>Development of computational approaches to understand neural systems, at micro- and macro-scale level.</p>
    <div class="nb-prose">
      <ul>
        <li>Higher-order topological approaches of brain connectivity</li>
        <li>Structure-function approaches to analyze fMRI data</li>
        <li>Machine learning approaches to neuroimaging data in healthy and clinical population</li>
      </ul>
    </div>
  </div>
</article>

<article class="nb-project" id="affective-neuroscience">
  <div class="nb-project__fig"><figure class="nb-plate"><img src="{{ base_path }}/images/projects/movies.png" alt="Film stills and brain activity used to study emotion"></figure></div>
  <div class="nb-project__body">
    <div class="nb-label">§2.3</div>
    <h2>Affective Neuroscience</h2>
    <p>Emotions are thought to emerge from co-activation among distributed brain systems, yet traditional fMRI analyses mostly look at localized responses and pairwise connections. Using time-resolved higher-order topology and naturalistic paradigms such as film viewing, I study how groups of brain regions interact as emotions unfold.</p>
    <div class="nb-prose">
      <ul>
        <li>Higher-order topology of fMRI during naturalistic viewing of 14 films, continuously annotated across 50 affective features (<a href="https://www.biorxiv.org/content/10.64898/2026.09.26.754452v1" target="_blank">bioRxiv 2026</a>)</li>
        <li>Complementary neural representations of emotion: higher-order topology captures fine-grained affective structure, while pairwise connectivity provides a portable readout of broad arousal</li>
        <li>Open student project: <a href="{{ base_path }}/open-projects/topology-emotion-film-fmri/">temporal dynamics of emotion using film fMRI</a></li>
      </ul>
    </div>
  </div>
</article>

<article class="nb-project" id="multilayer-networks">
  <div class="nb-project__fig"><figure class="nb-plate"><img src="{{ base_path }}/images/projects/multilayer_net_2.png" alt="Multilayer Network Visualization"></figure></div>
  <div class="nb-project__body">
    <div class="nb-label">§2.4</div>
    <h2>Multilayer Networks</h2>
    <p>Investigation of multilayer network structures and their applications in understanding complex interconnected systems.</p>
    <div class="nb-prose">
      <ul>
        <li>Complexity and reducibility of multiplex networks</li>
        <li>Models and measures for multiplex networks</li>
        <li>Strategies of optimal percolation for multiplex networks</li>
      </ul>
    </div>
  </div>
</article>

<article class="nb-project" id="project-ceti">
  <div class="nb-project__fig"><figure class="nb-plate"><img src="{{ base_path }}/images/projects/sperm_whales.png" alt="Sperm whale communication and behaviour"></figure></div>
  <div class="nb-project__body">
    <div class="nb-label">§2.5</div>
    <h2>Project CETI</h2>
    <p><a href="https://www.projectceti.org/" target="_blank">Project CETI</a> (Cetacean Translation Initiative) is an ambitious interdisciplinary endeavor aiming to decode the communication of sperm whales. By leveraging advanced machine learning, data analysis, and linguistic theory, we seek to interpret the complex vocalizations of these intelligent marine mammals. Understanding their communication patterns offers insights into their social structures and into language and cognition across species.</p>
    <div class="nb-prose">
      <ul>
        <li>Foraging strategies from acoustic recordings and 3D dive trajectories (<a href="https://www.biorxiv.org/content/10.64898/2026.07.29.741536v1" target="_blank">bioRxiv 2026</a>)</li>
        <li>Collaborative sperm whale birth and shifts in coda vocal styles (<a href="https://www.nature.com/articles/s41598-025-27438-3" target="_blank">Scientific Reports 2026</a>)</li>
        <li>More on the <a href="https://nplresearch.github.io/#/projects/ceti" target="_blank">NPLab CETI project page</a></li>
      </ul>
    </div>
  </div>
</article>

<article class="nb-project" id="computational-gastronomy">
  <div class="nb-project__fig"><figure class="nb-plate"><img src="{{ base_path }}/images/projects/computational_gastonomy.png" alt="Computational Gastronomy using network science and topology"></figure></div>
  <div class="nb-project__body">
    <div class="nb-label">§2.6</div>
    <h2>Computational Gastronomy</h2>
    <p>Network approaches to uncover the principles behind how ingredients are combined in cuisines around the world.</p>
    <div class="nb-prose">
      <ul>
        <li>Networks of ingredient combinations as culinary fingerprints of world cuisines (<a href="https://www.nature.com/articles/s41538-025-00588-4" target="_blank">npj Science of Food</a>)</li>
        <li>Maximum spanning trees as simplified backbones of cuisines</li>
        <li>Machine learning to identify cuisines from recipes, and clustering of cuisines into geo-cultural groups</li>
        <li><a href="{{ base_path }}/projects/chef-network/">Chef Network Platform</a></li>
      </ul>
    </div>
  </div>
</article>

<!-- Optimality project commented out
<article class="nb-project" id="optimality">
  <div class="nb-project__body">
    <div class="nb-label">§2.7</div>
    <h2>Optimality</h2>
    <p>Research focused on optimal processes and algorithms in complex systems.</p>
    <div class="nb-prose">
      <ul>
        <li>Development of optimization pipelines for multi-objective optimization problems</li>
        <li>Efficiency analysis in complex systems</li>
      </ul>
    </div>
  </div>
</article>
-->

</section>
