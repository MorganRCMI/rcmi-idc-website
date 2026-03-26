# Sandbox Data Prototype

This folder is an isolated prototype for exploring spreadsheet-driven content without changing the production website.

## Files

- `faculty.csv`: raw spreadsheet-row style faculty data
- `research.csv`: raw spreadsheet-row style research data for areas, projects, and infrastructure
- `publications.csv`: workbook-style publication data linked to research by `Project ID`
- `faculty.json`: reference JSON version of the faculty data model
- `research.json`: reference JSON version of the research data model
- `faculty-prototype.html`: plain HTML and JavaScript prototype for rendering faculty cards
- `research-prototype.html`: plain HTML and JavaScript prototype for rendering research cards
- `publications-prototype.html`: plain HTML and JavaScript prototype for rendering publication records
- `prototype.css`: shared sandbox-only styles for both prototype pages
- `FIELD_MAP.js`: centralized workbook-contract field mapping and expected headers
- `common.js`: shared helper functions for CSV loading, validation, normalization, sorting, linking, and footer rendering

## Data Source

The user requested `LOCAL_SPREADSHEET_SCHEMA.md`, but that file is not present in the repository. This prototype is based on the structure defined in `SPREADSHEET_SCHEMA.md`.

## How It Works

Each HTML file:

- uses `fetch()` to load local CSV files
- parses CSV into row objects with plain JavaScript
- validates workbook-contract headers and warns in the console when required columns are missing
- transforms workbook-contract rows into display-ready objects using centralized field maps
- filters active records
- sorts by `sort_order`
- renders cards into the page with plain JavaScript
- uses shared sandbox-only styles and helper utilities to keep the code modular

The prototype is intentionally simple:

- no framework
- no build step
- no changes to the existing website
- no dependencies on production CSS
- no dependencies on production JavaScript
- no external CSV parsing libraries

## Running It

Because browsers often block `fetch()` from local `file://` pages, run a small local server from this folder.

Examples:

```bash
cd prototypes
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/faculty-prototype.html`
- `http://localhost:8000/research-prototype.html`

## Prototype Goals

- keep the pages visually recognizable compared to the current site
- demonstrate that spreadsheet-shaped data can drive repeated card sections
- mirror the current page structure more closely, including section ordering and content grouping
- stay fully isolated from production files

## Notes

- The prototype uses initials and short text badges instead of production images so it remains self-contained.
- The active rendering path now uses CSV rather than JSON.
- `faculty.csv` uses one row per faculty profile with direct spreadsheet-style columns.
- `research.csv` uses the workbook-contract `research` sheet structure with `Row Type` values of `area`, `project`, and `infrastructure`.
- `publications.csv` links multiple publication rows to research projects using exact `Project ID` values.
- `FIELD_MAP.js` is the single place where workbook headers are mapped to internal normalized keys.
- `common.js` warns clearly in the console if a required file or required header is missing.
- The current version is organized to resemble the production faculty and research pages more closely without copying production CSS directly.
