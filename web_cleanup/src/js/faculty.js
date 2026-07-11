/* ====================================
   FACULTY PAGE SCRIPT
   ==================================== */

const FacultyPage = (() => {
  const PAGE_SIZE = CONFIG.faculty.perPage || 6;

  const state = {
    allFaculty: [],
    filteredFaculty: [],
    currentPage: 1,
    selectedFilter: 'RCMI IDC leadership',
    search: '',
    dept: '',
    year: '',
    program: '',
    filters: []
  };

  const dom = {
    grid: document.getElementById('faculty-grid'),
    empty: document.getElementById('faculty-empty'),
    pagination: document.getElementById('pagination-controls'),
    filterTabs: document.getElementById('filter-tabs'),
    summary: document.getElementById('faculty-summary'),
    search: document.getElementById('faculty-search'),
    dept: document.getElementById('dept-filter'),
    year: document.getElementById('year-filter-fac'),
    program: document.getElementById('program-filter-fac'),
    clear: document.getElementById('clear-faculty-filters')
  };

  function isActive(value) {
    const active = (value || '').toLowerCase();
    return active === 'yes' || active === '1' || active === 'true';
  }

  function getInitials(name) {
    return Utils.getInitials(name);
  }

  function createFacultyCard(person) {
    const imageHtml = person['Image Path']
      ? `<img src="${person['Image Path']}" alt="${person['Image Alt Text'] || person['Full Name']}" style="width:100%;height:100%;object-fit:contain;object-position:center;">`
      : `<div style="font-size: 3.5rem; font-weight: 700; letter-spacing: 0.1em;">${getInitials(person['Full Name'])}</div>`;

    let badges = '';
    if (person.Category === 'Pilot Faculty') {
      if (person['Year Funded']) {
        badges += `<span class="badge-year">Funded ${person['Year Funded']}</span>`;
      }
      if (person['Program Type']) {
        badges += `<span class="badge-program">${person['Program Type']}</span>`;
      }
    }

    let education = '';
    if (person.Education && person.Education.trim()) {
      const eduItems = person.Education.split('|').map(e => `<p>${e.trim()}</p>`).join('');
      education = `<div class="faculty-education"><h4>Education</h4>${eduItems}</div>`;
    }

    let research = '';
    if (person['Summary Text']) {
      research = `<div class="research-interests"><h4>${person['Summary Label'] || 'Research Interests'}</h4><p>${person['Summary Text']}</p></div>`;
    }

    let tags = '';
    if (person.Tags && person.Tags.trim()) {
      const tagList = person.Tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('');
      tags = `<div class="research-tags">${tagList}</div>`;
    }

    let highlight = '';
    if (person['Highlight Heading'] && person['Highlight Text']) {
      highlight = `<div class="publications-highlight"><h4>${person['Highlight Heading']}</h4><p>${person['Highlight Text']}</p></div>`;
    }

    let contact = '';
    if (person.Email) {
      const details = [
        person.Office ? `Office: ${person.Office}` : '',
        person.Phone ? `Phone: ${person.Phone}` : ''
      ].filter(Boolean).join(' | ');
      contact = `<div class="faculty-contact"><a href="mailto:${person.Email}" class="contact-link">${person.Email}</a>${details ? `<p style="margin-top: 0.5rem; font-size: 0.9rem;">${details}</p>` : ''}</div>`;
    }

    return `
      <div class="faculty-card">
        <div class="faculty-image">${imageHtml}</div>
        <div class="faculty-info">
          ${badges ? `<div class="faculty-badges">${badges}</div>` : ''}
          <h3>${person['Full Name']}</h3>
          ${person.Title ? `<div class="faculty-title">${person.Title}</div>` : ''}
          ${person.Department ? `<div class="faculty-department">${person.Department}</div>` : ''}
          ${education}
          ${research}
          ${tags}
          ${highlight}
          ${contact}
        </div>
      </div>
    `;
  }

  function getVisibleFaculty() {
    const active = state.allFaculty.filter(f => isActive(f['Is Active']));

    let filtered = state.selectedFilter === 'All Faculty'
      ? active
      : active.filter(p => p.Category === state.selectedFilter);

    if (state.search) {
      const q = state.search.toLowerCase();
      filtered = filtered.filter(p =>
        (p['Full Name'] || '').toLowerCase().includes(q) ||
        (p.Department || '').toLowerCase().includes(q) ||
        (p['Summary Text'] || '').toLowerCase().includes(q)
      );
    }

    if (state.dept) {
      filtered = filtered.filter(p => p.Department === state.dept);
    }

    if (state.program) {
      filtered = filtered.filter(p =>
        (p['Program Type'] || '').split(',').map(s => s.trim()).includes(state.program)
      );
    }

    if (state.year) {
      filtered = filtered.filter(p => p['Year Funded'] == state.year);
    }

    return filtered;
  }

  function updateSummary(count) {
    const badge = `<span class="faculty-total-badge">${count} faculty</span>`;
    const label = count === state.allFaculty.length ? 'total' : 'matching filters';
    dom.summary.innerHTML = badge + `<span>${label}</span>`;
  }

  function refreshDropdowns() {
    const active = state.allFaculty.filter(f => isActive(f['Is Active']));
    const inCategory = active.filter(p => p.Category === state.selectedFilter);
    const isPilotFaculty = state.selectedFilter === 'Pilot Faculty';

    // Show/hide filter toolbar
    document.querySelector('.filter-toolbar').style.display = isPilotFaculty ? '' : 'none';

    if (isPilotFaculty) {
      const depts = [...new Set(inCategory.map(p => p.Department).filter(Boolean))].sort();
      const years = [...new Set(inCategory.map(p => p['Year Funded']).filter(Boolean))].sort((a, b) => b - a);
      const programs = [...new Set(
        inCategory.flatMap(p => (p['Program Type'] || '').split(',').map(s => s.trim()).filter(Boolean))
      )].sort();

      populateSelect(dom.dept, depts, 'All Departments');
      populateSelect(dom.year, years, 'All Years');
      populateSelect(dom.program, programs, 'All Programs');
    }
  }

  function populateSelect(selectEl, options, defaultLabel) {
    const current = selectEl.value;
    selectEl.innerHTML = `<option value="">${defaultLabel}</option>` +
      options.map((o) => `<option value="${o}">${o}</option>`).join('');
    if (options.includes(current)) selectEl.value = current;
  }

  function renderFilters() {
    dom.filterTabs.innerHTML = state.filters.map((label) => {
      const cls = label === state.selectedFilter ? 'filter-tab active' : 'filter-tab';
      return `<button type="button" class="${cls}" data-filter="${label}">${label}</button>`;
    }).join('');

    dom.filterTabs.querySelectorAll('.filter-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.selectedFilter = btn.dataset.filter;
        state.dept = '';
        state.year = '';
        state.program = '';
        dom.dept.value = '';
        dom.year.value = '';
        dom.program.value = '';
        state.currentPage = 1;
        renderFilters();
        refreshDropdowns();
        renderFaculty();
      });
    });
  }

  function renderFaculty() {
    const visible = getVisibleFaculty();
    const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    state.currentPage = Math.min(state.currentPage, totalPages);

    const start = (state.currentPage - 1) * PAGE_SIZE;
    const pageItems = visible.slice(start, start + PAGE_SIZE);

    dom.grid.innerHTML = pageItems.map(createFacultyCard).join('');
    dom.empty.hidden = visible.length !== 0;
    updateSummary(visible.length);
    renderPagination(visible.length, totalPages);
  }

  function renderPagination(total, totalPages) {
    if (totalPages <= 1) {
      dom.pagination.innerHTML = '';
      return;
    }

    let html = `
      <button type="button" class="page-btn" data-page="${state.currentPage - 1}" ${state.currentPage === 1 ? 'disabled' : ''}>← Prev</button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      const cls = i === state.currentPage ? 'page-btn page-active' : 'page-btn';
      html += `<button type="button" class="${cls}" data-page="${i}">${i}</button>`;
    }

    html += `
      <button type="button" class="page-btn" data-page="${state.currentPage + 1}" ${state.currentPage === totalPages ? 'disabled' : ''}>Next →</button>
    `;

    dom.pagination.innerHTML = html;

    dom.pagination.querySelectorAll('[data-page]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const page = Number(btn.dataset.page);
        if (page >= 1) {
          state.currentPage = page;
          renderFaculty();
          document.querySelector('.faculty-container').scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  async function initialize() {
    try {
      const rows = await CSVParser.load('faculty.csv');
      state.allFaculty = rows.filter(f => isActive(f['Is Active']))
        .sort((a, b) => (parseInt(a['Sort Order']) || 0) - (parseInt(b['Sort Order']) || 0));

      // Extract unique categories
      state.filters = [...new Set(state.allFaculty.map(f => f.Category))];
      if (!state.filters.includes('All Faculty')) {
        state.filters.unshift('All Faculty');
      }

      // Update page title/description
      document.getElementById('page-title').textContent = 'Faculty & Researchers';
      document.getElementById('page-description').textContent = 'Meet our distinguished team of scientists dedicated to advancing health disparities research';
      document.getElementById('current-year').textContent = new Date().getFullYear();

      refreshDropdowns();
      renderFilters();
      renderFaculty();

      // Event listeners
      dom.search.addEventListener('input', () => {
        state.search = dom.search.value;
        state.currentPage = 1;
        renderFaculty();
      });

      dom.dept.addEventListener('change', () => {
        state.dept = dom.dept.value;
        state.currentPage = 1;
        renderFaculty();
      });

      dom.year.addEventListener('change', () => {
        state.year = dom.year.value;
        state.currentPage = 1;
        renderFaculty();
      });

      dom.program.addEventListener('change', () => {
        state.program = dom.program.value;
        state.currentPage = 1;
        renderFaculty();
      });

      dom.clear.addEventListener('click', () => {
        state.search = '';
        state.dept = '';
        state.year = '';
        state.program = '';
        dom.search.value = '';
        dom.dept.value = '';
        dom.year.value = '';
        dom.program.value = '';
        state.currentPage = 1;
        renderFaculty();
      });
    } catch (error) {
      console.error('Error initializing faculty page:', error);
      dom.grid.innerHTML = `<p class="empty-message">Failed to load faculty data: ${error.message}</p>`;
    }
  }

  return { initialize };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FacultyPage.initialize());
} else {
  FacultyPage.initialize();
}
