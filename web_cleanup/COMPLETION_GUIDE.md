# Web Cleanup Completion Guide

## Current Status ✅

### COMPLETE & WORKING:
- **index.html** - Home page with hero, features grid, animated stats, and leadership section
- **faculty.html** - Faculty directory with filter tabs, toolbar, search, pagination
- **CSS Framework** - Complete component-based CSS with BEM naming (variables.css, global.css, header.css, footer.css, feature-card.css, leader-card.css, stats-card.css)
- **JavaScript Core** - main.js with utilities, CSS parser, navigation, animations
- **home.js** - Stats counter animation
- **faculty.js** - Full faculty filtering, searching, pagination system

### PATTERN ESTABLISHED:
The refactoring pattern is now clear and repeatable. All remaining pages follow the same approach:

1. **Extract exact content from original `/rcmi_web/docs/[page].html`**
2. **Create refactored HTML with BEM naming conventions**
3. **Organize CSS into component + page-specific files**
4. **Use modular JavaScript (one module per page if needed)**

---

## How to Complete Remaining 5 Pages

### Template Structure for Each Page

#### 1. Create HTML File
Copy this structure and fill in your page-specific content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] - RCMI IDC</title>
  <meta name="description" content="[Description]">
  
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="src/styles/variables.css">
  <link rel="stylesheet" href="src/styles/global.css">
  <link rel="stylesheet" href="src/styles/components/header.css">
  <link rel="stylesheet" href="src/styles/components/footer.css">
  <link rel="stylesheet" href="src/styles/pages/[pagename].css">
</head>
<body>
  <!-- Header - Same for all pages -->
  <header class="site-header">
    <nav class="navbar">
      <a href="index.html" class="logo">RCMI <span>IDC</span></a>
      <ul class="nav-menu" id="menu">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="faculty.html">Faculty</a></li>
        <li><a href="research.html">Research</a></li>
        <li><a href="publications.html">Publications</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="opportunities.html">Opportunities</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </header>

  <main>
    <!-- Your page content here -->
  </main>

  <!-- Footer - Same for all pages -->
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>RCMI IDC</h4>
        <p>Center for Urban Health Disparities Research and Innovation</p>
        <p>Morgan State University</p>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <a href="about.html">About RCMI & IDC</a>
        <a href="faculty.html">Faculty & Staff</a>
        <a href="research.html">Research Projects</a>
        <a href="publications.html">Publications</a>
        <a href="events.html">Events & Workshops</a>
        <a href="opportunities.html">Opportunities</a>
      </div>
      <div class="footer-section">
        <h4>Contact</h4>
        <p>Portage Avenue Campus, Room 113</p>
        <p>1700 E Cold Spring Lane</p>
        <p>Baltimore, MD 21251</p>
        <p>Phone: 443-885-4534</p>
      </div>
      <div class="footer-section">
        <h4>Connect</h4>
        <a href="mailto:diane.hughes@morgan.edu">Email Us</a>
        <a href="https://www.morgan.edu/rcmi" target="_blank">RCMI Program</a>
        <a href="opportunities.html">Apply for Funding</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="current-year">2024</span> Morgan State University RCMI IDC. All rights reserved.</p>
    </div>
  </footer>

  <script src="src/js/main.js"></script>
  <script src="src/js/[pagename].js"></script>  <!-- Only if needed -->
</body>
</html>
```

#### 2. Create CSS File: `src/styles/pages/[pagename].css`

Use BEM naming:
- `.page-header` - Page title section
- `.section-header` with `__label`, `__title`, `__description` - Section headers
- `.section-name` - Main sections
- Component classes for reusable elements

Example:
```css
/* Page Header - Use across all pages */
.page-header {
  margin-top: var(--header-height);
  padding: 6rem 5% 4rem;
  background: linear-gradient(135deg, var(--primary) 0%, #004080 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 30%, rgba(247, 147, 30, 0.1) 0%, transparent 50%);
}

.page-header h1 {
  font-family: var(--font-primary);
  font-size: 3.5rem;
  color: white;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

/* Page-specific sections */
.my-section {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-3xl) 5%;
}

.my-section__title {
  font-family: var(--font-primary);
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }
}
```

#### 3. Create JavaScript File (if needed): `src/js/[pagename].js`

Only create if page has interactivity. Use the module pattern:

```javascript
const PageName = (() => {
  const elements = {
    // DOM element references
  };

  function initialize() {
    // Setup code
    document.getElementById('current-year').textContent = new Date().getFullYear();
  }

  return { initialize };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PageName.initialize());
} else {
  PageName.initialize();
}
```

---

## Remaining Pages to Create

### Page 1: about.html
- **No CSV needed** ✓
- **Content**: Static text, mission cards, leadership profiles
- **CSS File**: `src/styles/pages/about.css`
- **JS File**: Optional (just for year update via main.js)
- **Source**: Read `/rcmi_web/docs/about.html` for exact content

### Page 2: research.html
- **CSV needed**: research.csv, publications.csv ✓
- **Content**: Featured projects, all projects grid, department breakdown, pagination
- **CSS File**: `src/styles/pages/research.css`
- **JS File**: `src/js/research.js` (load CSV, paginate, separate featured)
- **Source**: Read `/rcmi_web/docs/research.html` for exact content

### Page 3: publications.html
- **CSV needed**: publications.csv, research.csv ✓
- **Content**: Publication listings with filters, pagination
- **CSS File**: `src/styles/pages/publications.css`
- **JS File**: `src/js/publications.js` (load CSV, filter, paginate)
- **Source**: Read `/rcmi_web/docs/publications.html` for exact content

### Page 4: events.html
- **No CSV needed** ✓
- **Content**: Event hero, urgency banner, timeline, eligibility cards
- **CSS File**: `src/styles/pages/events.css`
- **JS File**: `src/js/events.js` (countdown timer)
- **Source**: Read `/rcmi_web/docs/events.html` for exact content

### Page 5: contact.html
- **No CSV needed** ✓
- **Content**: Contact info cards, contact form, team section
- **CSS File**: `src/styles/pages/contact.css`
- **JS File**: Optional (form validation)
- **Source**: Read `/rcmi_web/docs/contact.html` for exact content

### Page 6: opportunities.html
- **No CSV needed** ✓
- **Content**: Opportunity cards, timeline, support services grid
- **CSS File**: `src/styles/pages/opportunities.css`
- **JS File**: Optional
- **Source**: Read `/rcmi_web/docs/opportunities.html` for exact content

---

## BEM Naming Quick Reference

```
Block: .component
  Element: .component__child
    Modifier: .component__child--special
```

Examples:
```
.page-header
.page-header h1          → .page-header__title
.page-header p           → .page-header__subtitle

.section-header
.section-header label    → .section-header__label
.section-header h2       → .section-header__title
.section-header p        → .section-header__description

.mission-card
.mission-card .icon      → .mission-card__icon
.mission-card h4         → .mission-card__title
.mission-card.active     → .mission-card--active
```

---

## Process for Each Page

1. **Read original** from `/rcmi_web/docs/[page].html`
2. **Extract main content** - Copy all text, structure
3. **Create HTML file** - Use template above, add extracted content
4. **Refactor class names** - Convert to BEM naming
5. **Create CSS file** - Extract and organize styles
6. **Create JS file** (if needed) - Handle interactivity
7. **Test locally** - `python -m http.server 8000`
8. **Verify**:
   - All images load correctly
   - Navigation works
   - Page styling matches original
   - Any CSV data loads (if applicable)
   - Responsive on mobile

---

## CSS Variables Available

All CSS variables are pre-defined in `src/styles/variables.css`:

```css
--primary: #003366
--secondary: #FF6B35
--accent: #F7931E
--dark: #1a1a2e
--light: #f8f9fa
--text: #2c3e50
--border: #e0e6ed

--font-primary: 'Playfair Display', serif
--font-secondary: 'Work Sans', sans-serif

--header-height: 80px
--max-width: 1400px

--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem
--spacing-2xl: 3rem
--spacing-3xl: 4rem

--radius-sm: 10px
--radius-md: 15px
--radius-lg: 20px

--transition-base: all 0.3s ease
```

Just use `var(--primary)` instead of hardcoding colors!

---

## Image Paths

All images are in `/web_cleanup/img/`:
- Faculty photos: `img/faculty/faculty_[name].jpg`
- General images: `img/[name].jpg`
- Placeholders: `img/placeholder.png`

Always use relative paths: `img/faculty/faculty_christine_hohmann.jpg`

---

## Testing Checklist

For each page:
- [ ] Loads locally without errors
- [ ] Header navigation displays and works
- [ ] Footer displays correctly
- [ ] All images load
- [ ] Links to other pages work
- [ ] Page styling matches original design
- [ ] Mobile responsive (test at 768px)
- [ ] No console errors
- [ ] Year updates automatically
- [ ] Any forms/filters work (if applicable)
- [ ] CSV data loads (if applicable)

---

## Quick Start for Next Pages

```bash
# 1. Read original page from docs
cat /Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/[page].html

# 2. Create refactored HTML with template structure above
# 3. Create CSS file with BEM naming
# 4. Test locally
python -m http.server 8000

# 5. View at http://localhost:8000/[page].html
```

---

## Need Help?

Refer to these complete, working pages as templates:
- **index.html** - Home page with hero and animations
- **faculty.html** - Page with filters, search, pagination
- **home.css** - Page CSS with proper BEM naming and structure
- **faculty.css** - Complex page CSS with filter styling
- **faculty.js** - Complex JavaScript with CSV loading and filtering
- **home.js** - Simple JavaScript with just counter animation

All follow the exact pattern you need to replicate for remaining pages!

---

## Summary

✅ **Foundation is COMPLETE & WORKING**
- Index page: Full hero, features, stats, leadership
- Faculty page: Full filtering, search, pagination
- All CSS organized by components
- All JavaScript modular and reusable
- Ready to add remaining 5 pages

🎯 **Next Steps**: Follow the template above for each remaining page, extracting exact content from originals and refactoring with BEM naming and organized CSS.

Total remaining work: ~4-5 hours of systematic page replication (can be parallelized/delegated)
