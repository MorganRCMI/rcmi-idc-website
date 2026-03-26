# Cleanup Plan

## Scope

This plan is a non-destructive cleanup pass for the current repository.

Goals:

- reduce clutter
- preserve the working Excel -> CSV -> sandbox website flow
- identify what should stay, what should move to archive, and what can later be removed
- prepare for a second pass where the current faculty, research, and publications structure is promoted more broadly

This plan does not perform destructive deletion.

## Current Active Flow

The working data flow currently depends on these files:

- [WORKBOOK_CONTRACT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/WORKBOOK_CONTRACT.md)
- [EXPORT_WORKFLOW.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/EXPORT_WORKFLOW.md)
- [EXCEL_TEMPLATE_GUIDE.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/EXCEL_TEMPLATE_GUIDE.md)
- [Makefile](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/Makefile)
- [export_workbook_to_csv.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/export_workbook_to_csv.py)
- [watch_workbook_and_export.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/watch_workbook_and_export.py)
- [build_rcmi_workbook.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/build_rcmi_workbook.py)
- [rcmi_content.xlsx](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/rcmi_content.xlsx)
- [faculty_template.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/faculty_template.csv)
- [research_template.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/research_template.csv)
- [publications_template.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/publications_template.csv)
- [lookups_template.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/lookups_template.csv)
- [FIELD_MAP.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/FIELD_MAP.js)
- [common.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/common.js)
- [faculty.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/faculty.csv)
- [research.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/research.csv)
- [publications.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/publications.csv)
- [faculty-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/faculty-prototype.html)
- [research-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/research-prototype.html)
- [publications-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/publications-prototype.html)
- [prototype.css](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/styles/prototype.css)

## What Should Stay

Keep these files at the top level:

- [AGENTS.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/AGENTS.md)
- [WORKBOOK_CONTRACT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/WORKBOOK_CONTRACT.md)
- [EXPORT_WORKFLOW.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/EXPORT_WORKFLOW.md)
- [EXCEL_TEMPLATE_GUIDE.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/EXCEL_TEMPLATE_GUIDE.md)

Keep these additional operational documents because they are still useful:

- [WORKBOOK_VERIFICATION.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/WORKBOOK_VERIFICATION.md)
- [DATA_FLOW_CHECK.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/DATA_FLOW_CHECK.md)
- [CLEANUP_PLAN.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/CLEANUP_PLAN.md)

Keep these runtime and workflow files:

- [Makefile](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/Makefile)
- [export_workbook_to_csv.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/export_workbook_to_csv.py)
- [watch_workbook_and_export.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/watch_workbook_and_export.py)
- [build_rcmi_workbook.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/build_rcmi_workbook.py)
- [rcmi_content.xlsx](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/rcmi_content.xlsx)
- all four workbook template CSV files in [workbook](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook)

Keep the current sandbox runtime set until the second pass is complete:

- [FIELD_MAP.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/FIELD_MAP.js)
- [common.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/common.js)
- [faculty.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/faculty.csv)
- [research.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/research.csv)
- [publications.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/publications.csv)
- [faculty-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/faculty-prototype.html)
- [research-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/research-prototype.html)
- [publications-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/publications-prototype.html)
- [prototype.css](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/styles/prototype.css)

## What Should Be Archived

Move these non-essential planning and audit files into `docs/archive/`:

- [CONTENT_AUDIT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/CONTENT_AUDIT.md)
- [DATA_CONTRACT_AUDIT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/DATA_CONTRACT_AUDIT.md)
- [DATA_MODEL_GAP_AUDIT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/DATA_MODEL_GAP_AUDIT.md)
- [INTEGRATION_CHECKLIST.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/INTEGRATION_CHECKLIST.md)
- [PUBLICATIONS_MODEL.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/PUBLICATIONS_MODEL.md)
- [SPREADSHEET_SCHEMA.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/SPREADSHEET_SCHEMA.md)
- [WORKBOOK_VALIDATION_RULES.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/WORKBOOK_VALIDATION_RULES.md)

Move these sandbox internal history/docs into `docs/archive/sandbox/`:

- [CHANGE_ALIGNMENT_LOG.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/archive/sandbox/CHANGE_ALIGNMENT_LOG.md)
- [INTEGRATION_GAPS.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/archive/sandbox/INTEGRATION_GAPS.md)
- [README.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/archive/sandbox/README.md)
- [SANDBOX_HELPER_API.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/archive/sandbox/SANDBOX_HELPER_API.md)

These files still have historical value, but they are no longer core operational docs.

## What Should Be Removed Later

These files look obsolete or redundant and are safe candidates for later removal after a final confirmation pass:

- `faculty.json` in the old sandbox folder
- `research.json` in the old sandbox folder

Reason:

- the active runtime flow now uses `rcmi_content.xlsx` -> exporter -> CSV
- these JSON files are not part of the active load path
- they still contain old prototype-only descriptions and reference material

Also safe to remove later:

- root [.DS_Store](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/.DS_Store)

## Dead Prototype Or Debug Code

No active runtime `console.log`, `debugger`, or similar debug statements were found in the sandbox runtime files.

Obvious stale prototype artifacts still present:

- the unused JSON files in `sandbox-data-prototype/`
- older markdown audit files that describe earlier prototype stages

User-facing sandbox pages no longer contain visible prototype/demo wording in the rendered page copy.

## Recommended Folder And Naming Cleanup

### Short-Term Recommendation

Keep `sandbox-data-prototype/` as a separate folder for now.

Reason:

- it contains the only working data-driven runtime pages
- it is still clearly separated from production static pages
- the export pipeline writes directly into that folder today
- moving it immediately would add avoidable risk before the production integration pass

### Medium-Term Recommendation

After the second pass proves stable, rename and promote the stable runtime files into a cleaner location.

Recommended target structure:

- `data-site/` or `prototype-site/` if it should remain separate from production
- or direct promotion into production page names only after the live pages are updated intentionally

Recommended eventual renames:

- `faculty-prototype.html` -> `faculty-data.html` or production `faculty.html` replacement
- `research-prototype.html` -> `research-data.html` or production `research.html` replacement
- `publications-prototype.html` -> `publications.html`
- `prototype.css` -> `site-data.css` or another neutral runtime name

Do not rename these yet:

- `faculty.csv`
- `research.csv`
- `publications.csv`
- `FIELD_MAP.js`
- `common.js`

Reason:

- they are part of the active export and runtime flow

## Recommended Second Pass

The second pass should focus on controlled promotion, not broad cleanup.

Recommended actions:

1. Decide whether the sandbox pages should replace or inform the production `faculty.html`, `research.html`, and a new `publications.html`.
2. Add publications navigation to the broader site where appropriate.
3. Keep the workbook -> CSV export pipeline unchanged.
4. Only after the stable pages are promoted, archive or remove the remaining prototype-only filenames and docs.

## Summary

### Stay

- workbook contract and export docs
- workbook and template files
- export/watch scripts
- current sandbox runtime pages, CSS, field map, loader, and generated CSVs

### Archive

- old audits, schema drafts, integration planning docs
- sandbox history docs

### Remove Later

- old sandbox JSON files
- `.DS_Store`

### Rename Later

- `sandbox-data-prototype/` and `*-prototype.html` only after the stable pages are intentionally promoted

This preserves the working Excel -> CSV -> website flow while reducing clutter safely and setting up the next integration pass.
