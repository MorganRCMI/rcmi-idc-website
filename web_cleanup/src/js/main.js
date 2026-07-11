/* ====================================
   MAIN APPLICATION SCRIPT
   ==================================== */

// Configuration
const CONFIG = {
  dataBasePath: './data',
  animationDuration: 2000,
  faculty: {
    perPage: 6,
    file: 'faculty.csv'
  },
  research: {
    perPage: 6,
    file: 'research.csv'
  },
  publications: {
    perPage: 5,
    file: 'publications.csv'
  }
};

// ====================================
// Navigation Module
// ====================================
const Navigation = (() => {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
  });

  // Close menu on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
    }
  });

  return {
    setActive(url) {
      menu.querySelectorAll('a').forEach(link => {
        link.removeAttribute('aria-current');
        if (link.href.includes(url)) {
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  };
})();

// ====================================
// CSV Parser Module
// ====================================
const CSVParser = (() => {
  function parseCSV(csvText) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let insideQuotes = false;

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentCell += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if ((char === '\n' || char === '\r') && !insideQuotes) {
        if (currentCell || currentRow.length > 0) {
          currentRow.push(currentCell.trim());
          if (currentRow.some(cell => cell !== '')) {
            rows.push(currentRow);
          }
          currentRow = [];
          currentCell = '';
        }
        if (char === '\r' && nextChar === '\n') i++;
      } else {
        currentCell += char;
      }
    }

    if (currentCell || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      if (currentRow.some(cell => cell !== '')) {
        rows.push(currentRow);
      }
    }

    return rows;
  }

  function csvToObjects(csvText) {
    const rows = parseCSV(csvText);
    if (rows.length < 1) return [];

    const headers = rows[0];
    return rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
  }

  return {
    async load(filename) {
      try {
        const response = await fetch(`${CONFIG.dataBasePath}/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        const text = await response.text();
        return csvToObjects(text);
      } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return [];
      }
    }
  };
})();

// ====================================
// Stats Counter Module
// ====================================
const StatsCounter = (() => {
  function createCounter(startValue, endValue, duration = CONFIG.animationDuration) {
    return new Promise(resolve => {
      const startTime = Date.now();

      function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * (endValue - startValue) + startValue);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          resolve(endValue);
        }

        return current;
      }

      update();
    });
  }

  return {
    initialize() {
      document.querySelectorAll('[data-stat]').forEach(element => {
        element.addEventListener('click', () => {
          const target = parseInt(element.textContent);
          if (!isNaN(target)) {
            createCounter(0, target);
          }
        });
      });
    }
  };
})();

// ====================================
// Utilities
// ====================================
const Utils = (() => {
  return {
    getCurrentYear() {
      return new Date().getFullYear();
    },

    setCurrentYear() {
      const yearElement = document.getElementById('current-year');
      if (yearElement) {
        yearElement.textContent = this.getCurrentYear();
      }
    },

    slugify(text) {
      return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    },

    getInitials(name) {
      const cleaned = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, '');
      const parts = cleaned.split(/\s+/).filter(Boolean);
      return parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : (parts[0] || '?').substring(0, 2).toUpperCase();
    }
  };
})();

// ====================================
// Initialize Application
// ====================================
document.addEventListener('DOMContentLoaded', () => {
  Utils.setCurrentYear();
  StatsCounter.initialize();

  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (Navigation && Navigation.setActive) {
    Navigation.setActive(currentPage);
  }
});

// Export modules for page-specific scripts
window.CONFIG = CONFIG;
window.CSVParser = CSVParser;
window.Utils = Utils;
