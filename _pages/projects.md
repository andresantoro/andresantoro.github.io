---
layout: notebook
title: "Research themes"
permalink: /projects/
sheet: "02"
title_fit: "13.3"  # keep the title on one line (it is 13.07em wide)
lede: "The themes I work on, from methods for multivariate signals to sperm whales and food."
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
    <p>Computational approaches to understand neural systems, from micro- to macro-scale. The work runs along three threads, from methods to emotion to patients:</p>
    <div class="nb-subs">

      <details class="nb-sub" id="fmri-methods" style="--c: #9d8cff">
        <summary>
          <span class="nb-sub__num">2.2.1</span>
          <span class="nb-sub__title">Temporal &amp; higher-order methods for fMRI</span>
          <span class="nb-sub__hint">topology · fingerprints</span>
          <span class="nb-sub__icon" aria-hidden="true"></span>
        </summary>
        <div class="nb-sub__body">
          <figure class="nb-plate nb-sub__fig"><img src="{{ base_path }}/images/projects/TDA_spectral.png" alt="Higher-order co-fluctuations in temporal data" loading="lazy"></figure>
          <div class="nb-sub__text nb-prose">
            <p>Methods that go beyond static, pairwise connectivity: instantaneous higher-order co-fluctuations reconstructed from fMRI time series, topological and information-theoretic measures of group interactions, edge-based signal processing, and the individual fingerprints these reveal.</p>
            <ul>
              <li>Higher-order connectomics: local topological signatures for task decoding, individual identification and behaviour (<a href="https://www.nature.com/articles/s41467-024-54472-y" target="_blank">Nature Communications 2024</a>)</li>
              <li>Charting higher-order models of brain function: information-theoretic and topological metrics compared on the same data (<a href="https://doi.org/10.1038/s41467-026-75959-w" target="_blank">Nature Communications 2026</a>)</li>
              <li>The topological architecture of brain identity (<a href="https://doi.org/10.1101/2025.06.20.660792" target="_blank">bioRxiv 2025</a>) and edge-based Laplacians for brain signals (<a href="https://eusipco2025.org/wp-content/uploads/pdfs/0001084.pdf" target="_blank">EUSIPCO 2025</a>)</li>
              <li>Fingerprints beyond cortical fMRI: the spinal cord (<a href="https://doi.org/10.1162/IMAG.a.1128" target="_blank">Imaging Neuroscience 2026</a>) and EEG (<a href="https://doi.org/10.1016/j.compbiomed.2026.109691" target="_blank">Computers in Biology and Medicine 2026</a>)</li>
              <li>Open code: <a href="{{ base_path }}/code/">RHOSTS, Brain_HORS, HOI lenses</a></li>
            </ul>
          </div>
        </div>
      </details>

      <details class="nb-sub" id="affective-neuroscience" style="--c: #ff8a5c">
        <summary>
          <span class="nb-sub__num">2.2.2</span>
          <span class="nb-sub__title">Affective neuroscience</span>
          <span class="nb-sub__hint">emotion · naturalistic film fMRI</span>
          <span class="nb-sub__icon" aria-hidden="true"></span>
        </summary>
        <div class="nb-sub__body">
          <figure class="nb-plate nb-sub__fig"><img src="{{ base_path }}/images/projects/movies.png" alt="Film stills and brain activity used to study emotion" loading="lazy"></figure>
          <div class="nb-sub__text nb-prose">
            <p>Emotions are thought to emerge from co-activation among distributed brain systems, yet traditional fMRI analyses mostly look at localized responses and pairwise connections. Using time-resolved higher-order topology and naturalistic paradigms such as film viewing, I study how groups of brain regions interact as emotions unfold.</p>
            <ul>
              <li>Higher-order topology of fMRI during naturalistic viewing of 14 films, continuously annotated across 50 affective features (<a href="https://www.biorxiv.org/content/10.64898/2026.09.26.754452v1" target="_blank">bioRxiv 2026</a>)</li>
              <li>Complementary neural representations of emotion: higher-order topology captures fine-grained affective structure, while pairwise connectivity provides a portable readout of broad arousal</li>
              <li>Open student project: <a href="{{ base_path }}/open-projects/topology-emotion-film-fmri/">temporal dynamics of emotion using film fMRI</a></li>
            </ul>
          </div>
        </div>
      </details>

      <details class="nb-sub" id="clinical-neuroscience" style="--c: #f08dc8">
        <summary>
          <span class="nb-sub__num">2.2.3</span>
          <span class="nb-sub__title">Clinical neuroscience</span>
          <span class="nb-sub__hint">stroke · tinnitus</span>
          <span class="nb-sub__icon" aria-hidden="true"></span>
        </summary>
        <div class="nb-sub__body">
          <figure class="nb-plate nb-sub__fig"><img src="{{ base_path }}/images/projects/tinnitus.png" alt="Tinnitus and fMRI" loading="lazy"></figure>
          <div class="nb-sub__text nb-prose">
            <p>The same tools, used to follow how the brain reorganises after injury or in chronic conditions, one patient at a time.</p>
            <ul>
              <li>Stroke: over the first year, each patient's functional connectome fingerprint stabilises within three weeks, while system-specific circuits keep remodelling; early functional signatures forecast long-term impairment in language, executive function and attention (<a href="https://www.biorxiv.org/content/10.64898/2026.03.27.714711v1" target="_blank">bioRxiv 2026</a>)</li>
              <li>Tinnitus: the impact of higher-order brain interactions in tinnitus patients, with an American Tinnitus Association research grant (co-PI) and the PhD of Flavia Petruso</li>
              <li>Open student project: <a href="{{ base_path }}/open-projects/tinnitus-fmri-neurofeedback/">tinnitus and fMRI neurofeedback</a></li>
            </ul>
          </div>
        </div>
      </details>

    </div>
  </div>
</article>

<article class="nb-project" id="multilayer-networks">
  <div class="nb-project__fig"><figure class="nb-plate"><img src="{{ base_path }}/images/projects/multilayer_net_2.png" alt="Multilayer Network Visualization"></figure></div>
  <div class="nb-project__body">
    <div class="nb-label">§2.3</div>
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
    <div class="nb-label">§2.4</div>
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
    <div class="nb-label">§2.5</div>
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
    <div class="nb-label">§2.6</div>
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
