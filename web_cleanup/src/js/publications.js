/* ====================================
   PUBLICATIONS PAGE SCRIPT
   ==================================== */

const PublicationsPage = (() => {
  let allPublications = [];
  let currentPage = 1;
  const PAGE_SIZE = 10;

  const elements = {
    grid: document.getElementById('publications-grid'),
    loading: document.getElementById('pubs-loading'),
    empty: document.getElementById('pubs-empty'),
    pagination: document.getElementById('pubs-pagination')
  };

  function isActive(value) {
    const active = value.toLowerCase();
    return active === 'yes' || active === '1' || active === 'true';
  }

  function createPublicationCard(pub) {
    return `
      <article class="pub-card">
        <h3>${pub.Title || 'Untitled'}</h3>
        ${pub.Authors ? `<p class="authors">${pub.Authors}</p>` : ''}
        ${pub.Year ? `<p class="year">${pub.Year}</p>` : ''}
        ${pub['Publication Type'] ? `<p class="pub-type">${pub['Publication Type']}</p>` : ''}
      </article>
    `;
  }

  function render() {
    if (allPublications.length === 0) {
      elements.loading.style.display = 'none';
      elements.empty.style.display = 'block';
      elements.grid.innerHTML = '';
      elements.pagination.innerHTML = '';
      return;
    }

    elements.loading.style.display = 'none';
    elements.empty.style.display = 'none';

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageItems = allPublications.slice(start, end);

    elements.grid.innerHTML = pageItems.map(createPublicationCard).join('');

    // Pagination
    const totalPages = Math.ceil(allPublications.length / PAGE_SIZE);
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
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  async function initialize() {
    try {
      const publications = await CSVParser.load('publications.csv');
      allPublications = publications
        .filter(p => isActive(p['Is Active']))
        .sort((a, b) => parseInt(b.Year || 0) - parseInt(a.Year || 0));

      render();
    } catch (error) {
      console.error('Error initializing publications page:', error);
      if (elements.loading) elements.loading.innerHTML = '<p>Error loading publications</p>';
    }
  }

  return { initialize };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PublicationsPage.initialize());
} else {
  PublicationsPage.initialize();
}
