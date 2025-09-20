document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('pub-search');
  const categoryFilters = document.querySelectorAll('#category-filters .filter-btn');
  const typeFilters = document.querySelectorAll('#type-filters .filter-btn');
  const yearFilters = document.querySelectorAll('#year-filters .filter-btn');
  const publicationItems = document.querySelectorAll('.publication-item');
  const paperFilters = document.querySelectorAll('.papers-filter');
  
  let activeCategory = 'papers';
  let activeTypeFilter = 'all';
  let activeYearFilter = 'all';
  
  // Section display functions
  function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.category-section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Show the selected section
    document.getElementById(sectionId + '-section').style.display = 'block';
  }
  
  // Category filter functionality
  categoryFilters.forEach(button => {
    button.addEventListener('click', function() {
      categoryFilters.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      activeCategory = this.getAttribute('data-category');
      
      // Show/hide papers filters
      if (activeCategory === 'papers') {
        paperFilters.forEach(filter => filter.style.display = 'block');
      } else {
        paperFilters.forEach(filter => filter.style.display = 'none');
      }
      
      showSection(activeCategory);
      filterPublications();
    });
  });
  
  // Search functionality
  searchInput.addEventListener('input', function() {
    filterPublications();
  });
  
  // Type filter functionality
  typeFilters.forEach(button => {
    button.addEventListener('click', function() {
      typeFilters.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      activeTypeFilter = this.getAttribute('data-filter');
      filterPublications();
    });
  });
  
  // Year filter functionality
  yearFilters.forEach(button => {
    button.addEventListener('click', function() {
      yearFilters.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      activeYearFilter = this.getAttribute('data-year');
      filterPublications();
    });
  });
  
  function filterPublications() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (activeCategory === 'papers') {
      const paperItems = document.querySelectorAll('#papers-section .publication-item');
      
      paperItems.forEach(item => {
        const type = item.getAttribute('data-type');
        const year = item.getAttribute('data-year');
        const content = item.textContent.toLowerCase();
        
        const matchesType = activeTypeFilter === 'all' || type === activeTypeFilter;
        const matchesYear = activeYearFilter === 'all' || year === activeYearFilter;
        const matchesSearch = searchTerm === '' || content.includes(searchTerm);
        
        if (matchesType && matchesYear && matchesSearch) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    } else if (activeCategory === 'talks') {
      const talkItems = document.querySelectorAll('#talks-section .publication-item');
      
      talkItems.forEach(item => {
        const content = item.textContent.toLowerCase();
        const matchesSearch = searchTerm === '' || content.includes(searchTerm);
        
        if (matchesSearch) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    } else if (activeCategory === 'posters') {
      const posterItems = document.querySelectorAll('#posters-section .publication-item');
      
      posterItems.forEach(item => {
        const content = item.textContent.toLowerCase();
        const matchesSearch = searchTerm === '' || content.includes(searchTerm);
        
        if (matchesSearch) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  }
  
  // Initialize
  showSection('papers');
}); 