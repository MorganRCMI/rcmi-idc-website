/* ====================================
   HOME PAGE SCRIPT - Stats Animation
   ==================================== */

const HomePage = (() => {
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();

    function update() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (target - start) * progress);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    update();
  }

  function initializeCounters() {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const target = parseInt(entry.target.dataset.target) || parseInt(entry.target.textContent);
          animateCounter(entry.target, target);
          entry.target.dataset.animated = 'true';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.stat-card__number').forEach(el => {
      observer.observe(el);
    });
  }

  return {
    initialize() {
      // Update year
      const yearEl = document.getElementById('current-year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      // Initialize stat counters
      initializeCounters();
    }
  };
})();

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => HomePage.initialize());
} else {
  HomePage.initialize();
}
