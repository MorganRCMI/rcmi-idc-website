/* ====================================
   RESEARCH PAGE SCRIPT
   ==================================== */

const ResearchPage = (() => {
  let allProjects = [];
  let allPublications = [];
  let currentPage = 1;
  const PAGE_SIZE = CONFIG.research.perPage;

  const elements = {
    statsContainer: document.getElementById('research-stats'),
    featuredGrid: document.getElementById('featured-grid'),
    projectsGrid: document.getElementById('projects-grid'),
    pagination: document.getElementById('pagination'),
    deptGrid: document.getElementById('dept-grid'),
    loading: document.getElementById('projects-loading'),
    empty: document.getElementById('projects-empty')
  };

  function isActive(value) {
    const active = value.toLowerCase();
    return active === 'yes' || active === '1' || active === 'true';
  }

  function createProjectCard(project) {
    const featured = project['Featured Research'] === '1' 
      ? '<div class="research-card__featured">Featured</div>' 
      : '';

    return `
      <article class="research-card">
        <div class="research-card__header">
          <h3 class="research-card__title">${project.Title || 'Untitled'}</h3>
          ${featured}
        </div>
        <div class="research-card__content">
          <p class="research-card__summary">${project.Summary || ''}</p>
        </div>
        <div class="research-card__footer">
          <div class="research-card__pi">
            <span class="research-card__pi-label">PI:</span>
            <span class="research-card__pi-name">${project['PI Name'] || 'N/A'}</span>
          </div>
          ${project.Department ? `<span class="research-card__dept">${project.Department}</span>` : ''}
        </div>
      </article>
    `;
  }

  function renderStats() {
    if (!elements.statsContainer) return;

    const uniqueDepts = new Set(allProjects.map(p => p.Department).filter(Boolean));
    const uniquePIs = new Set(allProjects.map(p => p['PI Faculty ID']).filter(Boolean));

    const stats = [
      { value: allProjects.length, label: 'Research Projects' },
      { value: allPublications.length, label: 'Peer-Reviewed Publications' },
      { value: uniqueDepts.size, label: 'Departments' },
      { value: uniquePIs.size, label: 'Principal Investigators' }
    ];

    elements.statsContainer.innerHTML = stats.map(stat => `
      <div class="stat-card">
        <div class="stat-number" data-stat="${stat.value}">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');

    StatsCounter.initialize();
  }

  function renderFeatured() {
    if (!elements.featuredGrid) return;

    const featured = allProjects.filter(p => p['Featured Research'] === '1');

    if (featured.length === 0) {
      elements.featuredGrid.parentElement.style.display = 'none';
      return;
    }

    elements.featuredGrid.innerHTML = featured.map(createProjectCard).join('');
  }

  function renderProjects() {
    if (!elements.projectsGrid) return;

    if (allProjects.length === 0) {
      elements.loading.style.display = 'none';
      elements.empty.style.display = 'block';
      elements.projectsGrid.innerHTML = '';
      elements.pagination.innerHTML = '';
      return;
    }

    elements.loading.style.display = 'none';
    elements.empty.style.display = 'none';

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageItems = allProjects.slice(start, end);

    elements.projectsGrid.innerHTML = pageItems.map(createProjectCard).join('');

    // Pagination
    const totalPages = Math.ceil(allProjects.length / PAGE_SIZE);
    if (totalPages <= 1) {
      elements.pagination.innerHTML = '';
      return;
    }

    let html = '';
    if (currentPage > 1) {
      html += `<button class="pagination-btn" data-page="1">« First</button>`;
      html += `<button class="pagination-btn" data-page="${currentPage - 1}">‹ Previous</button>`;
    }

    for (let i = 1; i <= totalPages; i++) {
      const active = i === currentPage ? 'active' : '';
      html += `<button class="pagination-btn ${active}" data-page="${i}">${i}</button>`;
    }

    if (currentPage < totalPages) {
      html += `<button class="pagination-btn" data-page="${currentPage + 1}">Next ›</button>`;
      html += `<button class="pagination-btn" data-page="${totalPages}">Last »</button>`;
    }

    elements.pagination.innerHTML = html;
    elements.pagination.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page);
        renderProjects();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function renderDepts() {
    if (!elements.deptGrid) return;

    const depts = new Map();
    allProjects.forEach(p => {
      const dept = p.Department || 'Other';
      depts.set(dept, (depts.get(dept) || 0) + 1);
    });

    const html = Array.from(depts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([dept, count]) => `
        <div class="dept-card">
          <h4>${dept}</h4>
          <p><strong>${count}</strong> ${count === 1 ? 'Project' : 'Projects'}</p>
        </div>
      `).join('');

    elements.deptGrid.innerHTML = html;
  }

  async function initialize() {
    try {
      const research = await CSVParser.load('research.csv');
      const publications = await CSVParser.load('publications.csv');

      allProjects = research
        .filter(p => isActive(p['Is Active']))
        .sort((a, b) => (parseInt(a['Sort Order']) || 0) - (parseInt(b['Sort Order']) || 0));

      allPublications = publications.filter(p => isActive(p['Is Active']));

      renderStats();
      renderFeatured();
      renderProjects();
      renderDepts();
    } catch (error) {
      console.error('Error initializing research page:', error);
      if (elements.loading) elements.loading.innerHTML = '<p>Error loading data</p>';
    }
  }

  return { initialize };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ResearchPage.initialize());
} else {
  ResearchPage.initialize();
}
