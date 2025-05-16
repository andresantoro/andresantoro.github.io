---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

<p>For a summary of my works, you can also have a look at <a href="https://scholar.google.co.uk/citations?user=gGSh6oEAAAAJ&hl=en" target="_blank">my Google Scholar profile</a>.</p>

<div class="publications-container">
  <div class="publications-filters">
    <div class="search-box">
      <input type="text" id="pub-search" placeholder="Search publications...">
    </div>
    
    <div class="filter-section">
      <h3>Category</h3>
      <div class="filter-buttons" id="category-filters">
        <button class="filter-btn active" data-category="papers">Papers</button>
        <button class="filter-btn" data-category="talks">Talks</button>
        <button class="filter-btn" data-category="posters">Posters</button>
      </div>
    </div>
    
    <div class="filter-section papers-filter">
      <h3>Type</h3>
      <div class="filter-buttons" id="type-filters">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="preprint">Preprint</button>
        <button class="filter-btn" data-filter="journal">Journal article</button>
        <button class="filter-btn" data-filter="conference">Conference paper</button>
      </div>
    </div>
    
    <div class="filter-section papers-filter">
      <h3>Date</h3>
      <div class="filter-buttons" id="year-filters">
        <button class="filter-btn active" data-year="all">All</button>
        {% assign years = "2025|2024|2023|2022|2021|2020|2019|2018|2017|2016|2015" | split: "|" %}
        {% for year in years %}
          <button class="filter-btn" data-year="{{ year }}">{{ year }}</button>
        {% endfor %}
      </div>
    </div>
  </div>

  <div class="publications-list">
    <!-- Papers section -->
    <div id="papers-section" class="category-section">
      <div class="publication-items">
        {% assign papers = site.data.publications.papers %}
        {% for paper in papers %}
          <div class="publication-item" 
               data-type="{{ paper.type | default: 'journal' }}" 
               data-year="{{ paper.year | default: '2024' }}">
            <div class="publication-content">
              <h3 class="publication-title">{{ paper.title }}</h3>
              <p class="publication-authors">{{ paper.authors }}</p>
              <p class="publication-venue">{{ paper.venue }} ({{ paper.year }})</p>
              <div class="publication-links">
                {% if paper.pdf %}
                  <a href="{{ paper.pdf }}" class="pub-link" target="_blank"><i class="fas fa-file-pdf"></i> PDF</a>
                {% endif %}
                {% if paper.doi %}
                  <a href="{{ paper.doi }}" class="pub-link" target="_blank"><i class="fas fa-external-link-alt"></i> DOI</a>
                {% endif %}
                {% if paper.code %}
                  <a href="{{ paper.code }}" class="pub-link" target="_blank"><i class="fab fa-github"></i> Code</a>
                {% endif %}
                {% if paper.data %}
                  <a href="{{ paper.data }}" class="pub-link" target="_blank"><i class="fas fa-database"></i> Dataset</a>
                {% endif %}
              </div>
            </div>
          </div>
        {% endfor %}
      </div>
    </div>
    
    <!-- Talks section -->
    <div id="talks-section" class="category-section" style="display: none;">
      <div class="publication-items">
        {% assign talks = site.data.publications.talks %}
        {% for talk in talks %}
          <div class="publication-item talk-item">
            <div class="publication-content">
              <h3 class="publication-title">{{ talk.title }}</h3>
              <p class="publication-venue">{{ talk.venue }}</p>
              <p class="publication-location">{{ talk.location }}, {{ talk.date }}</p>
              {% if talk.invited %}
                <p class="invited-talk"><i>Invited talk</i></p>
              {% endif %}
            </div>
          </div>
        {% endfor %}
      </div>
    </div>
    
    <!-- Posters section -->
    <div id="posters-section" class="category-section" style="display: none;">
      <div class="publication-items">
        {% assign posters = site.data.publications.posters %}
        {% for poster in posters %}
          <div class="publication-item poster-item">
            <div class="publication-content">
              <h3 class="publication-title">{{ poster.title }}</h3>
              <p class="publication-authors">{{ poster.authors }}</p>
              <p class="publication-venue">{{ poster.venue }} ({{ poster.year }})</p>
            </div>
          </div>
        {% endfor %}
      </div>
    </div>
  </div>
</div>