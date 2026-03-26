# Integration Checklist

## Purpose

This checklist defines the exact checks to complete before migrating the workbook-driven content flow into production.

It is based on:

- [WORKBOOK_CONTRACT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/WORKBOOK_CONTRACT.md)
- [EXCEL_TEMPLATE_GUIDE.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/EXCEL_TEMPLATE_GUIDE.md)
- [WORKBOOK_VALIDATION_RULES.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/WORKBOOK_VALIDATION_RULES.md)
- sandbox parsing and rendering code in [FIELD_MAP.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/FIELD_MAP.js), [common.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/common.js), [faculty-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/faculty-prototype.html), [research-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/research-prototype.html), and [publications-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/publications-prototype.html)

## Pre-Migration Checks

### 1. Workbook Headers Match Parser

Pass criteria:

- Every parsed sheet uses the exact headers defined in `WORKBOOK_CONTRACT.md`.
- `FIELD_MAP.js` contains the same exact human-readable headers as the workbook.
- No parser logic depends on legacy headers or alternate label spellings.
- Required headers in the parser match the required headers in the contract.

Check method:

- Compare workbook headers against `window.workbookContract.datasets.*.requiredHeaders`.
- Compare workbook headers against each `headerMap` entry in `FIELD_MAP.js`.
- Confirm that the workbook templates use the same labels.

Current sandbox implementation:

- The sandbox parser is aligned to exact header names through `FIELD_MAP.js`.
- `common.js` validates missing required headers and logs clear console warnings.

### 2. Sheet Names Match Parser

Pass criteria:

- The workbook contains exactly these sheet names:
  - `START_HERE`
  - `faculty`
  - `research`
  - `publications`
  - `LOOKUPS`
- Production import logic is configured to use those exact names.
- No sheet name is inferred from file names or user-edited labels.

Check method:

- Open `rcmi_content.xlsx` and verify the sheet tabs exactly match the contract.
- Confirm migration code uses the same sheet names.

Current sandbox status:

- The sandbox uses CSV files instead of workbook sheets, so sheet-name parsing is not yet implemented.
- Production migration must add explicit sheet-name validation when workbook import is introduced.

### 3. Project ID Links Between Research And Publications Are Valid

Pass criteria:

- Every active publication row has a non-empty `Project ID`.
- Every active `publications.Project ID` matches an existing `research.Project ID`.
- No active publication points to a deleted, renamed, or missing project.
- `Project ID` values remain stable after publication rows are created.

Check method:

- Run a relationship check across all active research project rows and publication rows.
- Review console warnings for unmatched or missing `Project ID` values.
- Confirm workbook guidance instructs editors not to change IDs casually.

Current sandbox implementation:

- `common.js` includes `warnMissingProjectLinks`.
- Both the research and publications pages call that check before rendering.

### 4. Research Items Can Display Linked Publication Links

Pass criteria:

- Active research project rows can render zero, one, or many linked publications.
- Publication links are resolved by shared `Project ID`, not by project title or row position.
- The research page displays a publication link block only when linked publications exist.
- If no linked publication exists, the project still renders cleanly.

Check method:

- Verify `research-prototype.html` builds a publication index from `publications`.
- Confirm project cards render `Related Publications` based on `project.id`.
- Test at least:
  - one project with multiple publications
  - one project with one publication
  - one project with no publication

Current sandbox implementation:

- `research-prototype.html` uses `buildPublicationIndex(publications)`.
- Linked publications are displayed under featured research projects.

### 5. Publications Page Can Render All Publication Records

Pass criteria:

- The publications page loads all active publication rows.
- Each publication renders from normalized fields, not raw column positions.
- Publication cards can resolve and display the related project name from `Project ID`.
- The page still renders if optional fields such as `Department`, `Citation Text`, or `Featured Label` are blank.

Check method:

- Verify `publications-prototype.html` loads `research` and `publications`.
- Confirm it builds a project lookup keyed by `project.id`.
- Test records with both complete and partial metadata.

Current sandbox implementation:

- `publications-prototype.html` resolves the related project by `Project ID`.
- Optional publication fields are already handled defensively.

### 6. No Prototype-Only Text Remains

Pass criteria:

- No visible page heading, label, paragraph, or navigation item includes `prototype`, `sandbox`, or demo-only wording.
- User-facing content reads like the actual site, not a demo environment.

Check method:

- Review visible copy in faculty, research, and publications pages.
- Search rendered page text and templates for demo-only wording.

Current sandbox status:

- No visible prototype/demo/sandbox wording remains in the page copy.
- Internal file names still contain `-prototype` and `prototype.css`, which is acceptable for sandbox development but should be reviewed during production migration.

### 7. Code Does Not Rely On Spreadsheet Column Order

Pass criteria:

- Parsing logic reads values by exact header name only.
- Reordering columns in the workbook does not change rendered content.
- The renderer consumes normalized internal keys, not raw header labels or array positions.

Check method:

- Review parsing logic in `common.js`.
- Confirm `parseCsv` captures headers and creates row objects by header name.
- Confirm `normalizeRow` maps from headers to internal keys through `FIELD_MAP.js`.
- Confirm rendering templates use normalized keys such as `summaryLabel`, `piName`, and `publicationType`.

Current sandbox implementation:

- The sandbox parser does not rely on column order.
- Header-to-field mapping is centralized in `FIELD_MAP.js`.

### 8. Workbook Is Understandable For Non-Technical Users

Pass criteria:

- The workbook structure is explained clearly in `EXCEL_TEMPLATE_GUIDE.md`.
- Validation and locking rules are explained clearly in `WORKBOOK_VALIDATION_RULES.md`.
- `START_HERE` content is ready for workbook onboarding.
- Non-technical users can add, edit, hide, and link records without needing parser knowledge.

Check method:

- Review the guide against the actual workbook columns.
- Confirm the guide explains:
  - what each tab is for
  - what each column means
  - which cells users should edit
  - how to hide an item without deleting it
  - how to link a publication using `Project ID`
- Confirm the validation rules document matches the workbook contract exactly.

Current documentation status:

- The guide and validation docs exist and align broadly with the contract.
- Final migration should include a real workbook QA pass with non-technical users, not just a documentation review.

## Additional Recommended Checks

### Relationship Key Stability

Pass criteria:

- `Faculty ID`, `Project ID`, and `Publication ID` are treated as stable keys.
- Locked-column behavior in the workbook matches that expectation.

### Conditional Required Fields

Pass criteria:

- `research` rows satisfy the row-type-specific required fields:
  - `area`: `Title`, `Summary`, `Icon`
  - `project`: `Title`, `PI Faculty ID`, `PI Name`, `Department`, `Description`
  - `infrastructure`: `Infrastructure Name`, `Description`, `Icon`

Current sandbox implementation:

- `common.js` warns when required research fields are missing by row type.

### Visibility Control Behavior

Pass criteria:

- `Is Active = Yes` shows content.
- `Is Active = No` hides content without deleting the row.
- This behavior is consistent across faculty, research, and publications.

## Production Migration Gate

Production migration should not proceed until all of these are true:

- workbook headers are frozen and match `FIELD_MAP.js`
- workbook sheet names are frozen and validated
- `Project ID` relationships are clean
- research items successfully render linked publication links
- the publications page successfully renders all active publication records
- no visible prototype/demo wording remains
- parsing is fully header-based, not column-order-based
- the workbook instructions are clear enough for non-technical editors

## Current Remaining Work

- Replace sandbox CSV loading with real workbook sheet ingestion from `rcmi_content.xlsx`.
- Add explicit sheet-name validation for `START_HERE`, `faculty`, `research`, `publications`, and `LOOKUPS`.
- Run an end-to-end QA pass against a real workbook export, not only sandbox sample data.
- Port the validated parsing and rendering behavior into production pages without reintroducing hardcoded content.

## Summary

The core production readiness question is simple:

- can the workbook contract drive the site without hidden assumptions

Before migration, the answer must be yes for headers, sheet names, relationships, rendering behavior, and editor usability.
