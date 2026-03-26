# Data Contract Audit

## Scope

This audit documents the data contract that exists in the current codebase and sandbox prototype today.

It covers:

- current prototype data sources
- field names currently used in code
- sheet/file equivalents
- required and optional fields implied by the current rendering logic
- relationships between datasets
- mismatches between display labels and code field names
- current inconsistencies that would make workbook-to-site sync harder

No production website files were modified for this audit.

## Current Data Sources Used By The Prototype

### Active runtime data sources

- `data/faculty.csv`
  - Active source for faculty content in the sandbox prototype.
- `data/research.csv`
  - Active source for research areas, research projects, and research infrastructure in the sandbox prototype.

### Active transformation and contract logic

- `js/common.js`
  - Parses CSV with `parseCsv()`
  - Builds runtime payloads with `buildFacultyCsvPayload()` and `buildResearchCsvPayload()`
  - Converts raw rows into display-ready objects with `transformFacultyRows()` and `transformResearchRows()`

### Active page-level hardcoded content

These are not spreadsheet-driven right now, but they are part of the effective contract:

- `prototypes/faculty-prototype.html`
  - page structure
  - navigation labels/links
  - filter UI placement
- `prototypes/research-prototype.html`
  - section order
  - section labels
  - CTA copy and link
- `js/common.js`
  - page titles/descriptions injected by payload builders
  - footer headings, text, and links

### Non-runtime reference data sources

These exist but are not the active rendering source:

- `sandbox-data-prototype/faculty.json`
- `sandbox-data-prototype/research.json`

These JSON files document earlier row-shaped/reference data models, but the current sandbox rendering path uses CSV, not JSON.

## Current Sheet/File Equivalents

The current implementation does not yet use an actual Excel workbook. The closest current equivalents are:

| Workbook Concept | Current File/Structure | Notes |
|---|---|---|
| `faculty` sheet | `data/faculty.csv` | One row per faculty/staff profile |
| `research_areas` sheet | `data/research.csv` where `row_type = area` | Mixed into one flat file |
| `research_projects` sheet | `data/research.csv` where `row_type = project` | Mixed into one flat file |
| `research_infrastructure` sheet | `data/research.csv` where `row_type = infrastructure` | Mixed into one flat file |
| `publications` sheet | Not implemented | No current sheet/file exists |

## Current Field Names Used In Code

## Faculty

### Raw faculty CSV headers

From `data/faculty.csv`:

- `record_id`
- `is_active`
- `sort_order`
- `name`
- `category`
- `title`
- `department`
- `summary_label`
- `summary_text`
- `email`
- `fallback_icon`
- `education_1`
- `education_2`
- `education_3`
- `education_4`
- `tag_1`
- `tag_2`
- `tag_3`
- `tag_4`
- `tag_5`
- `tag_6`
- `highlight_heading`
- `highlight_text`
- `office`
- `phone`
- `image_path`
- `image_alt`
- `notes_internal`

### Faculty display-ready fields produced in code

From `transformFacultyRows()` in `js/common.js`:

- `record_id`
- `is_active`
- `sort_order`
- `name`
- `category`
- `title`
- `department`
- `summary_label`
- `summary_text`
- `email`
- `fallback_icon`
- `education`
- `tags`
- `highlight_heading`
- `highlight_text`
- `office`
- `phone`
- `image_path`
- `image_alt`
- `notes_internal`

### Required faculty fields implied by current code

These are not all formally validated, but rendering assumes they exist or have meaningful values:

- `record_id`
- `is_active`
- `sort_order`
- `name`
- `category`
- `title`
- `department`
- `summary_label`
- `summary_text`
- `email`
- `fallback_icon`

### Optional faculty fields implied by current code

- `education_1`
- `education_2`
- `education_3`
- `education_4`
- `tag_1`
- `tag_2`
- `tag_3`
- `tag_4`
- `tag_5`
- `tag_6`
- `highlight_heading`
- `highlight_text`
- `office`
- `phone`
- `image_path`
- `image_alt`
- `notes_internal`

## Research

The current prototype uses one flat `research.csv` file with a discriminator column:

- `row_type = area`
- `row_type = project`
- `row_type = infrastructure`

### Raw research CSV headers

From `data/research.csv`:

- `row_type`
- `record_id`
- `is_active`
- `sort_order`
- `title`
- `summary`
- `icon`
- `bullet_1`
- `bullet_2`
- `bullet_3`
- `bullet_4`
- `bullet_5`
- `pi_name`
- `department`
- `description`
- `tag_1`
- `tag_2`
- `tag_3`
- `tag_4`
- `project_status`
- `project_url`
- `funding_source`
- `grant_number`
- `start_date`
- `end_date`
- `name`
- `notes_internal`
- unnamed trailing column

The unnamed trailing column exists because the header row currently ends with an extra comma.

### Research area display-ready fields produced in code

From `transformResearchRows()`:

- `record_id`
- `is_active`
- `sort_order`
- `title`
- `summary`
- `icon`
- `bullets`
- `notes_internal`

### Required research area fields implied by current code

- `row_type`
- `record_id`
- `is_active`
- `sort_order`
- `title`
- `summary`
- `icon`

### Optional research area fields implied by current code

- `bullet_1`
- `bullet_2`
- `bullet_3`
- `bullet_4`
- `bullet_5`
- `notes_internal`

### Research project display-ready fields produced in code

From `transformResearchRows()`:

- `record_id`
- `is_active`
- `sort_order`
- `title`
- `pi_name`
- `department`
- `description`
- `tags`
- `project_status`
- `project_url`
- `funding_source`
- `grant_number`
- `start_date`
- `end_date`
- `notes_internal`

### Required research project fields implied by current code

- `row_type`
- `record_id`
- `is_active`
- `sort_order`
- `title`
- `pi_name`
- `department`
- `description`

### Optional research project fields implied by current code

- `tag_1`
- `tag_2`
- `tag_3`
- `tag_4`
- `project_status`
- `project_url`
- `funding_source`
- `grant_number`
- `start_date`
- `end_date`
- `notes_internal`

### Research infrastructure display-ready fields produced in code

From `transformResearchRows()`:

- `record_id`
- `is_active`
- `sort_order`
- `name`
- `description`
- `icon`
- `notes_internal`

### Required research infrastructure fields implied by current code

- `row_type`
- `record_id`
- `is_active`
- `sort_order`
- `name`
- `description`
- `icon`

### Optional research infrastructure fields implied by current code

- `notes_internal`

## Publications

There is currently no dedicated publications data source, sheet, CSV, parser branch, transform output, or page.

### Current publication-like fields in code

The closest current equivalents are:

- faculty `highlight_heading`
- faculty `highlight_text`

These are used for:

- `Recent Focus`
- `Publications`

This means publication-style information currently exists only as display text on faculty cards, not as structured publication records.

### Current publication fields in code

None.

### Current publications sheet/file

None.

## Relationships Between Sheets / Datasets

## Current implemented relationships

### Faculty

- Faculty records are standalone rows in `faculty.csv`.
- No normalized relationship to research projects exists.

### Research areas, projects, and infrastructure

- All three content types are stored in one flat file: `research.csv`.
- `row_type` determines which logical dataset each row belongs to.

### Project-to-faculty relationship

- Research projects use `pi_name` as free text.
- There is no foreign key such as `faculty_record_id`.

This means:

- a PI name can drift from the faculty dataset
- renaming a faculty member in one place does not automatically update project rows

### Publications relationship

- No project-to-publication relationship exists.
- No faculty-to-publication relationship exists.

## Recommended workbook relationships for future sync

If minimal maintenance is the goal, the eventual workbook should normalize relationships as follows:

- `faculty.record_id` should be the faculty key
- `research_projects.record_id` should be the project key
- `research_projects.pi_faculty_record_id` should reference `faculty.record_id`
- `publications.project_record_id` should reference `research_projects.record_id`

That is not implemented today, but it is the cleanest future direction.

## Mismatch Between Display Labels And Code Field Names

## Faculty mismatches

- Display label: `Research Interests`
  - Code field: `summary_label`
- Display label: `Role & Expertise`
  - Code field: `summary_label`
- Display label: `Recent Focus`
  - Code fields: `highlight_heading` + `highlight_text`
- Display label: `Publications`
  - Code fields: `highlight_heading` + `highlight_text`
- Displayed tag pills
  - Code fields: `tag_1` through `tag_6`, later collapsed into `tags`

## Research mismatches

- Display label: `Our Research Portfolio`
  - Not stored in CSV; hardcoded in HTML
- Display label: `Featured Research Projects`
  - Not stored in CSV; hardcoded in HTML
- Display label: `Research Infrastructure`
  - Not stored in CSV; hardcoded in HTML
- Display label: `PI`
  - Code field: `pi_name`
- Displayed project tags
  - Code fields: `tag_1` through `tag_4`, later collapsed into `tags`
- Displayed bullet list for research areas
  - Code fields: `bullet_1` through `bullet_5`, later collapsed into `bullets`

## Publications mismatches

- There is no dedicated publications label-to-field contract yet.
- Faculty “Publications” is currently not a publication dataset; it is a generic highlight block.

## Current Inconsistencies

These are the main current issues that weaken the data contract.

### 1. Research uses one flat file instead of separate logical sheets

`research.csv` mixes:

- areas
- projects
- infrastructure

This is simple for a prototype, but it is not the cleanest long-term workbook contract.

### 2. No structured publications dataset exists

The expanded scope now needs publications, but the current model has:

- no publication rows
- no publication page dataset
- no project-to-publication key

### 3. Research project PI is stored as free text

Current field:

- `pi_name`

Missing field:

- `pi_faculty_record_id`

This prevents reliable synchronization between faculty and research data.

### 4. Page chrome is still outside the spreadsheet contract

These are still hardcoded in HTML or helper functions:

- page titles
- page descriptions
- section labels
- section descriptions
- filter labels
- navigation labels and URLs
- footer content
- CTA text and link

### 5. `research.csv` currently has a malformed header

The header row ends with a trailing comma, which creates:

- an unnamed extra column

That should be cleaned before treating the file as a durable workbook contract.

### 6. `research.csv` contains a visible typo in active content

Current value:

- `Molecular & Cellular Biologyssss`

This appears in the active area title and should be corrected before syncing with a workbook.

### 7. Some internal example/demo rows are mixed into the same CSVs

Examples include:

- inactive rows
- missing-field examples

That is acceptable for testing, but it should be clearly separated from production-intent workbook content.

### 8. Publications-like faculty content is not normalized

Faculty publication/focus content is currently represented with:

- `highlight_heading`
- `highlight_text`

This makes it impossible to:

- filter publications
- attach multiple publications to one person or project
- reuse publication records across pages

## Summary

### Current active sheet/file contract

- `faculty.csv` acts like a `faculty` sheet
- `research.csv` acts like a combined `research_areas + research_projects + research_infrastructure` sheet
- no `publications` sheet currently exists

### Highest-priority contract gaps

1. Add a normalized publications dataset
2. Add foreign-key style relationships instead of free-text PI matching
3. Split research content into logical sheet-level structures, even if the prototype keeps one file for now
4. Move page chrome and section copy into an explicit content contract if workbook sync is the goal
