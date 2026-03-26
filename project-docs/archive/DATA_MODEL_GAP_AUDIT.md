# Data Model Gap Audit

## Scope

This document audits the current sandbox/prototype data model as it exists today.

It focuses on:

- the current faculty dataset
- the current research dataset
- the fact that publications are currently missing/incomplete
- the field names currently used in code
- mismatches between display labels and code field names
- the current gaps that prevent the workbook and site from being fully aligned

This is a documentation-only audit. No production website files were modified.

## Current Existing Datasets

The current sandbox prototype uses these active data sources:

- `data/faculty.csv`
- `data/research.csv`

The active parsing and transformation logic is in:

- `js/common.js`

The active rendering pages are:

- `prototypes/faculty-prototype.html`
- `prototypes/research-prototype.html`

## Existing Sheets / Dataset Equivalents

The current prototype does not yet use a true workbook, but the current CSV files map loosely to these sheet concepts:

| Dataset / Intended Sheet | Current Source | Status |
|---|---|---|
| `faculty` | `data/faculty.csv` | Implemented |
| `research_areas` | `data/research.csv` with `row_type = area` | Implemented, but merged into a shared file |
| `research_projects` | `data/research.csv` with `row_type = project` | Implemented, but merged into a shared file |
| `research_infrastructure` | `data/research.csv` with `row_type = infrastructure` | Implemented, but merged into a shared file |
| `publications` | No current source | Missing |

## Faculty Data Model

## Current expected headers / fields

Current raw headers in `data/faculty.csv`:

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

## Current faculty fields used in code

The code in `transformFacultyRows()` reads these raw fields:

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

The code then transforms them into display-ready fields:

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

## Required faculty fields

These are effectively required by the current renderer:

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

## Optional faculty fields

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

## Research Data Model

## Current expected headers / fields

Current raw headers in `data/research.csv`:

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
- extra unnamed trailing header/column

## Current research fields used in code

The code uses `row_type` to split the shared file into:

- research areas
- research projects
- research infrastructure

### Research area fields used in code

Raw fields:

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
- `notes_internal`

Display-ready fields:

- `record_id`
- `is_active`
- `sort_order`
- `title`
- `summary`
- `icon`
- `bullets`
- `notes_internal`

### Research project fields used in code

Raw fields:

- `record_id`
- `is_active`
- `sort_order`
- `title`
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
- `notes_internal`

Display-ready fields:

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

### Research infrastructure fields used in code

Raw fields:

- `record_id`
- `is_active`
- `sort_order`
- `name`
- `description`
- `icon`
- `notes_internal`

Display-ready fields:

- `record_id`
- `is_active`
- `sort_order`
- `name`
- `description`
- `icon`
- `notes_internal`

## Required research fields

### Required research area fields

- `row_type`
- `record_id`
- `is_active`
- `sort_order`
- `title`
- `summary`
- `icon`

### Required research project fields

- `row_type`
- `record_id`
- `is_active`
- `sort_order`
- `title`
- `pi_name`
- `department`
- `description`

### Required research infrastructure fields

- `row_type`
- `record_id`
- `is_active`
- `sort_order`
- `name`
- `description`
- `icon`

## Optional research fields

### Optional research area fields

- `bullet_1`
- `bullet_2`
- `bullet_3`
- `bullet_4`
- `bullet_5`
- `notes_internal`

### Optional research project fields

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

### Optional research infrastructure fields

- `notes_internal`

## Current Relationships

## Implemented relationships

### Faculty

- Each faculty row is standalone.
- There is no explicit relationship from faculty rows to research projects.

### Research

- `research.csv` is one combined dataset.
- `row_type` determines whether a row is:
  - `area`
  - `project`
  - `infrastructure`

### Project-to-faculty relationship

The current project-to-faculty link is:

- `pi_name`

This is a free-text relationship, not a key-based relationship.

That means:

- a project PI name must match faculty names manually
- there is no stable relational link like `pi_faculty_record_id`

## Missing For Publications

Publications are currently missing from the content model.

Specifically, the current prototype does not have:

- a `publications` dataset
- a `publications.csv` file
- publication rows in `research.csv`
- a `publications` sheet equivalent
- a parser branch for publications
- a transform function for publications
- a publications page
- a stable relationship from research projects to publications

## Publication fields that are currently missing

The expanded scope needs publication fields such as:

- `record_id`
- `project_record_id`
- `title`
- `department`
- `authors`
- `year`
- `publication_type`
- `full_text_url`
- `is_active`
- `sort_order`

None of those fields currently exist as a dedicated publication dataset.

## Current publication-like content that is not a true publications model

The only publication-adjacent content currently present is on faculty records:

- `highlight_heading`
- `highlight_text`

Those fields are generic display blocks and are currently used for:

- `Recent Focus`
- `Publications`

This is not sufficient for a real publications model because it does not support:

- multiple publications per project
- publication-level metadata
- project-to-publication relationships
- a dedicated publications page

## Mismatches Between Display Labels And Code Field Names

## Faculty mismatches

- Display label: `Research Interests`
  - Code field: `summary_label`
- Display label: `Role & Expertise`
  - Code field: `summary_label`
- Display label: `Education`
  - Code fields: `education_1` through `education_4`, then transformed into `education`
- Displayed research/interest tags
  - Code fields: `tag_1` through `tag_6`, then transformed into `tags`
- Display label: `Recent Focus`
  - Code fields: `highlight_heading` and `highlight_text`
- Display label: `Publications`
  - Code fields: `highlight_heading` and `highlight_text`

## Research mismatches

- Displayed area bullet list
  - Code fields: `bullet_1` through `bullet_5`, then transformed into `bullets`
- Displayed project tags
  - Code fields: `tag_1` through `tag_4`, then transformed into `tags`
- Display label: `PI`
  - Code field: `pi_name`
- Display label: `Research Infrastructure`
  - Infrastructure rows use `name`, not `title`
- Display labels such as:
  - `Our Research Portfolio`
  - `Featured Research Projects`
  - `Research Infrastructure`
  - `Focus Areas`
  - `Current Work`
  - `Resources`
  - are currently hardcoded in HTML, not modeled in CSV

## Current Inconsistencies

### 1. Publications are not modeled yet

This is the largest current gap. The content model is incomplete until publications are added as their own dataset.

### 2. Research content is merged into one file

`research.csv` currently combines:

- research areas
- research projects
- research infrastructure

This works for the sandbox, but it is not the cleanest long-term workbook structure.

### 3. Research projects reference faculty by free text

Current field:

- `pi_name`

Missing field:

- a stable faculty reference like `pi_faculty_record_id`

### 4. Faculty publication-like content is overloaded

Current fields:

- `highlight_heading`
- `highlight_text`

These fields are doing double duty for:

- general emphasis blocks
- publication summary display

That makes them unsuitable as a true publications model.

### 5. Page-level content is still outside the dataset contract

Still hardcoded:

- navigation labels and URLs
- filter labels
- footer content
- section headers
- section descriptions
- CTA content
- page titles and page descriptions

### 6. `research.csv` currently has a malformed header shape

The header row ends with a trailing comma, which creates:

- an extra unnamed trailing column

### 7. `research.csv` contains a typo in active content

Current active title value:

- `Molecular & Cellular Biologyssss`

### 8. Example rows are mixed into the same active source files

The current CSVs include:

- active content
- inactive example content
- missing-field example content

That is useful for testing, but it is not ideal as a production-intent workbook contract.

## Summary

### Existing implemented content types

- faculty
- research areas
- research projects
- research infrastructure

### Missing / incomplete content type

- publications

### Main model gap before workbook alignment

The workbook and site should not be treated as fully alignable yet because publications are not yet represented as a structured dataset with:

- its own sheet
- its own fields
- its own relationships
- its own rendering path
