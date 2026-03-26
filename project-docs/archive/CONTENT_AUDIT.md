# Content Audit

## Scope

This audit reviews the current static website structure with a focus on how the faculty and research pages are assembled today, what content is hardcoded, and which repeated content patterns are good candidates for spreadsheet-driven management later.

No production HTML, CSS, or JS files were modified for this audit.

## Current Project Structure

The repository is a simple static site with page-per-file HTML and a small local image directory.

### Top-level files

- `index.html`: homepage
- `about.html`: about page
- `faculty.html`: faculty and researcher listings
- `research.html`: research areas, projects, and infrastructure
- `opportunities.html`: funding and support opportunities
- `contact.html`: contact page
- `README.md`: design and structure notes
- `img/`: image assets used on some pages

### Structural observations

- Each page is self-contained and includes its own inline CSS inside a `<style>` block, for example [index.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/index.html#L8), [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L8), and [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L8).
- Navigation and footer markup are repeated page by page rather than shared through templates, as described in [README.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/README.md#L249).
- There is no build system, templating layer, CMS, database, or API integration in the repository.
- The pages are effectively “static documents,” meaning content changes require editing the page files directly.

## Files That Power The Faculty And Research Pages

### Faculty page

- Primary file: [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html)
- Content section starts at [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L431)
- Faculty cards live in the grid at [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L445)

### Research page

- Primary file: [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html)
- Research areas section starts at [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L548)
- Featured projects start at [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L632)
- Research infrastructure starts at [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L729)

## How Content Is Currently Hardcoded

### Faculty page

The faculty page content is directly written into the HTML as repeated card markup. Each person is a manually authored `<div class="faculty-card">...</div>` block, beginning at [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L448) and continuing through [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L680).

Each card currently hardcodes:

- Name
- Role/title
- Department
- Education entries
- Research or role summary
- Topical tags
- Optional publication or focus block
- Contact email
- Optional office/phone line
- Visual icon shown in place of a photo

Examples:

- Christine Hohmann card: [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L448)
- James Wachira card with publication metrics: [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L550)
- Diane Hughes card with office and phone details: [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L620)

The filter tabs are also hardcoded labels in static HTML at [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L436). They are presentational only in the current implementation; there is no filtering logic attached.

### Research page

The research page uses the same pattern: content is written directly into repeated HTML blocks rather than loaded from data.

Hardcoded sections:

- Research area cards: [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L557)
- Featured project cards: [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L639)
- Infrastructure cards: [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L738)
- CTA copy and button: [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L777)

Each research area card hardcodes:

- Icon
- Area name
- Summary paragraph
- Bullet list of subtopics

Each featured project hardcodes:

- Project title
- PI name
- Department
- Description
- Project tags

Each infrastructure card hardcodes:

- Icon
- Resource name
- Short description

## Repeated Content Patterns That Could Later Come From A Spreadsheet

These patterns are the strongest spreadsheet candidates because they are repeated, list-like, and follow stable field structures.

### 1. Faculty directory rows

Current repeated pattern: seven faculty/staff cards in [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L445)

Likely spreadsheet columns:

- `name`
- `display_order`
- `category`
- `title`
- `department`
- `education_1`
- `education_2`
- `education_3`
- `section_label`
- `bio_or_research_summary`
- `tag_1`
- `tag_2`
- `tag_3`
- `tag_4`
- `highlight_heading`
- `highlight_text`
- `email`
- `office`
- `phone`
- `image_asset`
- `fallback_icon`
- `published`

Notes:

- `category` would map to the current tabs: All Faculty, Leadership, Principal Investigators, Research Staff.
- `section_label` is needed because some cards use “Research Interests” while others use “Role & Expertise.”
- Some fields are optional today, such as publication metrics and office phone.

### 2. Faculty tags

Current repeated pattern: repeated `<span class="tag">...</span>` lists on each faculty card, for example [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L467), [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L531), and [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L606).

This could be handled either by:

- Multiple spreadsheet columns such as `tag_1` through `tag_6`
- A delimiter-based single field such as `tags`

### 3. Research focus areas

Current repeated pattern: six area cards in [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L557)

Likely spreadsheet columns:

- `display_order`
- `title`
- `icon`
- `summary`
- `bullet_1`
- `bullet_2`
- `bullet_3`
- `bullet_4`
- `published`

### 4. Featured research projects

Current repeated pattern: four project cards in [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L639)

Likely spreadsheet columns:

- `display_order`
- `title`
- `pi_name`
- `department`
- `description`
- `tag_1`
- `tag_2`
- `tag_3`
- `status`
- `published`

Future-friendly additions:

- `project_url`
- `funding_source`
- `grant_number`
- `start_date`
- `end_date`

### 5. Research infrastructure/resources

Current repeated pattern: six infrastructure cards in [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L738)

Likely spreadsheet columns:

- `display_order`
- `name`
- `icon`
- `description`
- `published`

### 6. Shared directory/contact data

Some contact and identity data is repeated across pages. Examples include the same people, titles, and emails on the homepage, about page, contact page, faculty page, and footer/contact areas. Representative references:

- Homepage leadership cards with images: [index.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/index.html#L630)
- About leadership cards with images: [about.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/about.html#L491)
- Contact team cards with images and emails: [contact.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/contact.html#L636)
- Footer email link repeated across pages, for example [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L710) and [research.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/research.html#L813)

This duplication creates drift risk if one person’s title, image, phone, or email changes in only one page.

## Content Model Constraints Visible In The Current Markup

These are the main wrinkles that matter if the site later becomes spreadsheet-driven.

### Faculty content is not fully uniform

Differences between cards mean the eventual schema must support optional fields.

- Some cards have three education lines; others have two.
- Some cards use a research section; others use a role/expertise section.
- Some cards include a publication/focus block; others do not.
- One card includes office and phone information inline: [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L644)

### Images are inconsistent by page

- The faculty page currently uses emoji icons in the card image region rather than real image assets, for example [faculty.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/faculty.html#L449).
- Other pages already use real image files from `img/`, such as [index.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/index.html#L630) and [contact.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/contact.html#L636).

If spreadsheet-driven content is added later, the system will need a clear decision about whether each person record references an image path, an emoji fallback, or both.

### Styling is tightly coupled to the markup

Because each page includes its own inline CSS, any future content-generation approach must preserve the existing class names and HTML shape unless you also want to touch styling. That is possible later, but it is a constraint if the goal remains “no visual change.”

## Risks And Constraints If The Site Remains On GitHub Pages

If this stays on GitHub Pages, spreadsheet-driven content is still possible, but there are practical constraints.

### 1. No server-side runtime

GitHub Pages is a static host. It does not run custom backend code on request. That means:

- No private server-side fetch to Google Sheets at request time
- No secure storage of API secrets in production
- No authenticated admin editing workflow built into the host itself

Implication:

- Any spreadsheet integration would need to happen either at build time or through fully public client-side data access.

### 2. Public spreadsheet access can expose content

If a future implementation reads a Google Sheet directly from browser-side JavaScript, the sheet or API endpoint would generally need to be public or otherwise accessible from the client. That may be acceptable for public directory/research content, but it is a content-governance decision.

### 3. Build-time generation is safer than client-side fetch for this setup

For GitHub Pages, the lowest-risk future path is usually:

- Keep the site static
- Pull spreadsheet data during a build step
- Generate HTML or JSON before deployment

That avoids client-side loading flashes, public API credentials, and dependence on live third-party fetches.

### 4. CORS and availability issues become operational dependencies

If the browser fetches spreadsheet data directly:

- CORS rules matter
- Third-party uptime matters
- Page load depends on external data availability
- Broken or malformed rows can surface directly in production

With today’s fully hardcoded HTML, none of those runtime risks exist.

### 5. GitHub Pages does not provide editorial validation

A spreadsheet-driven workflow will eventually need guardrails for:

- Required columns
- Valid email formatting
- Missing images
- Empty tags
- Duplicate faculty records
- Bad ordering values

Without a validation step before publish, spreadsheet mistakes could go live immediately.

### 6. Existing repeated HTML means content drift is already a risk

Even without spreadsheet integration, the current structure duplicates shared content across multiple pages. If the site remains static on GitHub Pages and content updates continue manually, consistency drift remains likely.

Examples:

- Same personnel shown on multiple pages with different structures
- Repeated footer/contact info on multiple pages
- Repeated navigation/footer markup on every page

## Summary Findings

- The site is currently a fully static multi-page HTML prototype with inline CSS and no data layer.
- `faculty.html` alone powers the faculty page and contains all faculty content directly in repeated card markup.
- `research.html` alone powers the research page and contains all research areas, projects, infrastructure, and CTA content directly in repeated card markup.
- The best spreadsheet candidates are faculty records, faculty tags, research focus areas, featured projects, infrastructure/resources, and repeated directory/contact data.
- If the site remains on GitHub Pages, spreadsheet-driven content is still feasible later, but build-time generation is much safer than live client-side spreadsheet fetching.

## Suggested Next Exploration, Without Production Changes

When you are ready, the next safe planning step would be to define a spreadsheet schema only, with no page edits yet. The first schema to design should be:

1. `faculty`
2. `research_areas`
3. `research_projects`
4. `research_infrastructure`

That would let you validate the content model before choosing any runtime or build approach.
