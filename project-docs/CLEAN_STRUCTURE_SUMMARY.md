# Clean Structure Summary

## Result

The project was reorganized into a cleaner production-oriented layout and then adapted for GitHub Pages publishing from `/docs`, while preserving the workbook -> CSV -> website flow.

## Old vs New Structure

### Old

- root: main HTML pages and markdown files
- `sandbox-data-prototype/`: data files, shared JS, shared CSS, and prototype pages
- `workbook-templates/`: workbook, workbook template CSVs, and workbook build script
- `scripts/__pycache__/`: Python cache files

### New

- `docs/`: deployable website root for GitHub Pages
- `docs/data/`: generated runtime CSV files
- `docs/js/`: shared JavaScript loader and field map
- `docs/styles/`: shared prototype stylesheet
- `docs/img/`: website images
- `prototypes/`: prototype HTML pages
- `project-docs/`: active markdown documentation
- `project-docs/archive/`: archived planning and audit documents
- `workbook/`: workbook and workbook template CSV files
- `scripts/`: Python scripts

## Files Moved

### Main Pages

- `pages/index.html` -> `docs/index.html`
- `pages/about.html` -> `docs/about.html`
- `pages/contact.html` -> `docs/contact.html`
- `pages/faculty.html` -> `docs/faculty.html`
- `pages/research.html` -> `docs/research.html`
- `pages/publications.html` -> `docs/publications.html`
- `pages/opportunities.html` -> `docs/opportunities.html`

### Data Files

- `sandbox-data-prototype/faculty.csv` -> `data/faculty.csv` -> `docs/data/faculty.csv`
- `sandbox-data-prototype/research.csv` -> `data/research.csv` -> `docs/data/research.csv`
- `sandbox-data-prototype/publications.csv` -> `data/publications.csv` -> `docs/data/publications.csv`

### Shared Frontend Assets

- `sandbox-data-prototype/FIELD_MAP.js` -> `js/FIELD_MAP.js` -> `docs/js/FIELD_MAP.js`
- `sandbox-data-prototype/common.js` -> `js/common.js` -> `docs/js/common.js`
- `sandbox-data-prototype/prototype.css` -> `styles/prototype.css` -> `docs/styles/prototype.css`

### Prototype Pages

- `sandbox-data-prototype/faculty-prototype.html` -> `prototypes/faculty-prototype.html`
- `sandbox-data-prototype/research-prototype.html` -> `prototypes/research-prototype.html`
- `sandbox-data-prototype/publications-prototype.html` -> `prototypes/publications-prototype.html`

### Workbook Assets

- `workbook-templates/rcmi_content.xlsx` -> `workbook/rcmi_content.xlsx`
- `workbook-templates/faculty_template.csv` -> `workbook/faculty_template.csv`
- `workbook-templates/research_template.csv` -> `workbook/research_template.csv`
- `workbook-templates/publications_template.csv` -> `workbook/publications_template.csv`
- `workbook-templates/lookups_template.csv` -> `workbook/lookups_template.csv`
- `workbook-templates/build_rcmi_workbook.py` -> `scripts/build_rcmi_workbook.py`

### Documentation

- root markdown files were moved into `docs/` and then renamed into `project-docs/`
- non-essential planning/audit markdown remained in `project-docs/archive/`
- `CLEANUP_PLAN.md` -> `project-docs/archive/CLEANUP_PLAN.md`

## Removed

- all `__pycache__/` folders under `scripts/`

## Path Updates Completed

The following references were updated across the project:

- page script tags now point to `./js/FIELD_MAP.js` and `./js/common.js`
- prototype script tags now point to `../docs/js/FIELD_MAP.js` and `../docs/js/common.js`
- prototype stylesheet links now point to `../docs/styles/prototype.css`
- live pages now load from `./data`
- prototype pages now load from `../docs/data`
- workbook export scripts now read from `workbook/rcmi_content.xlsx`
- workbook export scripts now write to:
  - `docs/data/faculty.csv`
  - `docs/data/research.csv`
  - `docs/data/publications.csv`
- workbook build script now reads workbook template CSVs from `workbook/`
- prototype navigation now links back to live pages in `docs/`
- moved image references in live pages now use `./img/...`
- active docs were updated to reference `project-docs/`, `workbook/`, `docs/data/`, `docs/js/`, and `prototypes/`

## Functionality Checks

Confirmed after restructuring:

- `docs/faculty.html` loads faculty data from `docs/data/faculty.csv`
- `docs/research.html` loads research data from `docs/data/research.csv`
- `docs/publications.html` loads publications data from `docs/data/publications.csv`
- prototype pages load from the same `data/` folder
- export scripts now target the new structure

## Notes

- `docs/index.html` is now the GitHub Pages entry point.
- Historical archived docs may still mention older folder names as historical context, but active runtime paths now use the new structure.
