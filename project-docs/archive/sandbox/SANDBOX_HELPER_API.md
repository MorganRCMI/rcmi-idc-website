# Sandbox Helper API

## Purpose

This document defines the standard shared helper interface used by the sandbox prototype pages.

It applies to:

- [faculty-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/faculty-prototype.html)
- [research-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/research-prototype.html)
- [publications-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/publications-prototype.html)
- [common.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/common.js)

The workbook contract and header mapping remain defined separately in:

- [FIELD_MAP.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/FIELD_MAP.js)

## Standard Helper Entry Point

Primary shared helper namespace:

- `window.rcmiSandboxHelpers`

Standard page bootstrap pattern:

```js
const helpers = window.rcmiSandboxHelpers;

if (!helpers || typeof helpers.loadDataset !== "function") {
    throw new Error("Sandbox helper API is unavailable. Expected window.rcmiSandboxHelpers.loadDataset().");
}
```

All sandbox pages now use this same helper-resolution pattern.

## Standard Dataset Loading Pattern

Each page should follow the same sequence:

1. Resolve `helpers` from the shared helper API.
2. Load one or more raw datasets with `helpers.loadDataset(datasetKey)`.
3. Transform raw rows into display-ready data using the dataset-specific transform helper.
4. Apply page-specific sorting or grouping as needed.
5. Render the page.
6. Render the shared footer with `helpers.renderFooter(currentPage)`.

Example pattern:

```js
const rawRows = await helpers.loadDataset("faculty");
const faculty = helpers.transformFacultyRecords(rawRows);
const visible = helpers.activeSorted(faculty);
```

## Standard Helper Functions

### `loadDataset(datasetKey)`

What it does:

- loads the CSV file defined for the dataset in `FIELD_MAP.js`
- parses CSV rows by header name, not column position
- validates required headers
- normalizes raw workbook headers into internal field keys
- warns for missing conditional research fields

Accepted dataset keys:

- `faculty`
- `research`
- `publications`

Used by:

- `faculty-prototype.html`
- `research-prototype.html`
- `publications-prototype.html`

### `transformFacultyRecords(rows)`

What it does:

- converts normalized faculty rows into display-ready faculty objects
- combines `Education 1` to `Education 4` into `education`
- combines `Tag 1` to `Tag 6` into `tags`
- applies fallback defaults for display fields

Used by:

- `faculty-prototype.html`

### `transformResearchRecords(rows)`

What it does:

- splits research rows by `Row Type`
- returns:
  - `areas`
  - `projects`
  - `infrastructure`
- prepares project-level publication convenience fields and project metadata

Used by:

- `research-prototype.html`
- `publications-prototype.html`

### `transformPublicationRecords(rows)`

What it does:

- converts normalized publication rows into display-ready publication objects
- preserves publication metadata such as title, authors, year, department, type, DOI, and full-text link

Used by:

- `research-prototype.html`
- `publications-prototype.html`

### `activeSorted(items)`

What it does:

- filters items where `isActive` is truthy
- sorts by numeric `sortOrder`

Used by:

- `faculty-prototype.html`
- `research-prototype.html`
- `publications-prototype.html`

### `buildPublicationIndex(publications)`

What it does:

- groups active publication records by `projectId`
- sorts linked publication groups by `sortOrder`
- returns a `Map` keyed by `Project ID`

Used by:

- `research-prototype.html`

### `warnMissingProjectLinks(projects, publications)`

What it does:

- checks that each publication has a `projectId`
- warns when a publication points to a missing research project

Used by:

- `research-prototype.html`
- `publications-prototype.html`

### `renderTagRow(tags, className = "tag-row")`

What it does:

- renders the shared tag chip markup used by cards

Used by:

- `faculty-prototype.html`
- `research-prototype.html`
- `publications-prototype.html`

### `renderFooter(currentPage)`

What it does:

- renders the shared sandbox footer
- applies the current year dynamically
- marks the current page when appropriate

Used by:

- `faculty-prototype.html`
- `research-prototype.html`
- `publications-prototype.html`

## Per-Page Usage

### `faculty-prototype.html`

Loads:

- `faculty`

Transforms:

- `transformFacultyRecords`

Additional helpers used:

- `activeSorted`
- `renderTagRow`
- `renderFooter`

### `research-prototype.html`

Loads:

- `research`
- `publications`

Transforms:

- `transformResearchRecords`
- `transformPublicationRecords`

Additional helpers used:

- `warnMissingProjectLinks`
- `buildPublicationIndex`
- `activeSorted`
- `renderTagRow`
- `renderFooter`

### `publications-prototype.html`

Loads:

- `research`
- `publications`

Transforms:

- `transformResearchRecords`
- `transformPublicationRecords`

Additional helpers used:

- `warnMissingProjectLinks`
- `activeSorted`
- `renderTagRow`
- `renderFooter`

## Consistency Rules

- All pages must resolve helpers from the same shared helper entry point.
- All dataset loading must go through `loadDataset(datasetKey)`.
- All pages must transform raw rows before rendering.
- All pages must read workbook data by exact header mapping through `FIELD_MAP.js`.
- Pages should not parse CSV directly.
- Pages should not read raw spreadsheet headers directly.
- Pages should not depend on column order.

## Current Standard

The standard sandbox helper API is:

- `loadDataset`
- `transformFacultyRecords`
- `transformResearchRecords`
- `transformPublicationRecords`
- `activeSorted`
- `buildPublicationIndex`
- `warnMissingProjectLinks`
- `renderTagRow`
- `renderFooter`

This is the interface all sandbox pages should continue to use unless the shared helper layer is intentionally revised.
