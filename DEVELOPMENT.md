# RCMI @ Morgan — Developer Guide

This doc explains how the site is actually structured today and, especially, how the
Excel → CSV content pipeline works. `README.md` is left over from the original
single-page design mockup and is out of date — treat this file as the source of truth
for how things currently work.

## 1. Big picture

RCMI @ Morgan is one center made up of multiple **Cores**. The site mirrors that:

- `docs/index.html` — the RCMI @ Morgan landing page (org structure, governance,
  links into each Core). Stays at the site root.
- `docs/idc/` — **Investigator Development Core**. Fully built out: home, about,
  faculty directory + profile pages, research, publications, events, opportunities,
  contact. This is the reference implementation — when CEC or RIC need real pages,
  copy the pattern from here.
- `docs/cec/index.html` — **Community Engagement Core**. Placeholder home page only,
  no subpages, no data wired up yet.
- `docs/ric/index.html` — **Research Infrastructure Core**. Same, placeholder only.
- `docs/styles/`, `docs/js/`, `docs/img/`, `docs/data/`, `docs/assets/` — shared by
  every Core. They live at the `docs/` root and each Core reaches them via `../`.

Deployed via GitHub Pages, served directly from `docs/`.

### Git state

- `main` is tagged `v1-single-core-idc` — the last stable snapshot before the
  multi-core restructure (IDC only, flat at `docs/` root).
- The multi-core work (this structure) is on branch `v2-multi-core`. Merge to `main`
  once CEC/RIC have real content and it's been reviewed.

## 2. IMPORTANT: always link to Core homes with a trailing slash

Link to a Core's home page as `idc/`, `cec/`, `ric/` (or `./`, `../` for
same-directory/parent links) — **never** as `idc/index.html`.

Why: local dev (`npm start`, which runs `npx serve docs`) auto-redirects `.html`
links, and for files literally named `index.html` it does this in *two* steps:
`idc/index.html` → `idc/index` → `idc` (dropping the trailing slash entirely). Once
the browser is sitting at bare `/idc` with no slash, it treats `idc` as a *file*, and
the next relative link clicked from that page resolves against the site root instead
of `/idc/` — producing exactly the kind of broken path bug this project hit once
already. Regular (non-index) page links, e.g. `about.html`, don't have this problem —
only links to a directory's `index.html` do. This doesn't affect GitHub Pages itself
(it doesn't do this redirect), but write it the safe way regardless.

## 3. The content pipeline (Excel → CSV → site)

This is the part that matters most for whoever maintains content going forward.

### Master source

`workbook/rcmi_content.xlsx` is the single source of truth for IDC's content today.
Sheets: `faculty`, `research`, `publications` (plus `START_HERE` and `LOOKUPS`, which
are reference/notes, not consumed by the export).

**Never hand-edit `docs/data/*.csv`.** They are generated output and get silently
overwritten the next time someone exports. Always edit the workbook, then regenerate:

```bash
PYTHONPATH=scripts/_vendor python3 scripts/export_workbook_to_csv.py
# or: make export-data / npm run export-data
```

For live local editing, `make watch-data` (`scripts/watch_workbook_and_export.py`)
watches the workbook file and re-exports automatically on save.

### Google Sheets sync — currently paused

`scripts/export_from_sheets.py`, wired up via `.github/workflows/sync.yml` (runs
hourly), can pull from a Google Sheet instead of the local workbook. **This sync is
currently paused** (stopped 2026-07-10) — the local `workbook/rcmi_content.xlsx` is
the sole active master for now. If it's resumed, note that `export_from_sheets.py`
has its own independent `WORKSHEETS` mapping — it is *not* shared code with
`export_workbook_to_csv.py`'s `TARGETS` dict, so any new sheet added to one needs to
be added to the other by hand too.

### The schema layer

- `docs/js/FIELD_MAP.js` defines `window.workbookContract` — one entry per dataset
  under `datasets` (`faculty`, `research`, `publications`), each with: `file` (where
  its CSV lives), `requiredHeaders` (validated at load time), and `headerMap`
  (CSV column name → camelCase JS property). This is what you edit when adding a
  new column to an existing sheet.
- `docs/js/common.js` has the loading/parsing machinery. `loadDataset()`,
  `parseCsv()`, `activeSorted()`, etc. are fully generic. But
  `transformFacultyRecords()` / `transformResearchRecords()` /
  `transformPublicationRecords()` are hand-written per dataset — there's no generic
  pass-through. A brand new dataset type needs its own transform function.

### Adding a new column to an existing sheet (e.g. faculty)

1. Add the column to `workbook/rcmi_content.xlsx`'s `faculty` sheet (and the
   matching template CSV in `workbook/` for documentation).
2. Add it to `headerMap` in `FIELD_MAP.js` (and `requiredHeaders` only if it should
   be mandatory).
3. Read it in the relevant `transform*Records()` function in `common.js`.
4. Regenerate CSVs.

### Adding a brand new dataset (e.g. a CEC "events" sheet, RIC "equipment" sheet)

1. Add the sheet to the workbook.
2. Add an entry to `TARGETS` in `scripts/export_workbook_to_csv.py`
   (`"cec_events": ".../docs/data/cec_events.csv"`) — this part is just config.
3. Add a `datasets.cecEvents` entry to `FIELD_MAP.js` (file path, required headers,
   header map).
4. Write a `transformCecEventsRecords()` in `common.js`, modeled on the existing
   transform functions.
5. If the dataset has row-type-conditional required fields (like `research` does for
   `area`/`project`/`infrastructure`), the `datasetKey === "research"` check inside
   `loadDataset()` in `common.js` will need generalizing to include the new key.

### Faculty categorization

People are tagged two ways today: `Category` (which tab/group they show under on the
faculty page — `RCMI Leadership`, `RCMI IDC leadership`, `IDC Pilot Faculties`,
`RCMI Research Project Faculty`, or `Community Engagement Core` for people hidden
from the IDC tabs but still linkable) and `Designation` (their actual role, free
text, e.g. `"Executive Director; RIC Lead"` — supports someone holding roles across
multiple Cores). There is **no formal "Core" column** yet distinguishing which
Core(s) a person belongs to — it's implicit in `Category`/`Designation` text. This
was a deliberate choice: formalizing that taxonomy properly should wait until CEC and
RIC have real people to model it against, rather than guessing now.

### Image paths

The `Image Path` column (e.g. `../img/faculty/christine_hohmann.jpg`) is relative to
**a page living one level under `docs/`** — i.e. it assumes whatever page renders it
sits in `docs/<core>/`. This works today because all of IDC's data-driven pages live
at that depth. If a future page renders faculty photos from a different nesting
depth, this convention will need revisiting (e.g. switching to root-relative paths,
which would also need confirming GitHub Pages serves this repo at the domain root
vs. a `/reponame/` subpath).

## 4. Local dev

```bash
npm start   # npx serve docs, http://localhost:3000
```

See §2 above for the one gotcha with this — always use trailing-slash directory
links for Core homes.

## 5. What's real vs. scaffolded

- **IDC**: fully real content, fully wired to the data pipeline.
- **CEC / RIC**: placeholder home pages only (static, no CSV data), listing known
  leadership by name. No subpages exist yet. When real content is ready, build out
  their pages following IDC's structure in `docs/idc/` as the template, and extend
  the data pipeline per §3 as needed.
