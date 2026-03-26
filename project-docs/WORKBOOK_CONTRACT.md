# Workbook Contract

## Status

This document is the future source of truth for the Excel workbook structure and the parsing contract that will eventually feed the website.

It defines:

- the workbook file name
- the exact sheet names
- the exact column headers
- required vs optional columns
- locked columns
- dropdown-backed columns
- the relationship keys between sheets

Production code is not changed by this document. This is documentation only.

## Workbook File

Exact workbook file name:

- `rcmi_content.xlsx`

## Workbook Sheets

The workbook must contain exactly these sheets:

1. `START_HERE`
2. `faculty`
3. `research`
4. `publications`
5. `LOOKUPS`

These names should be treated as fixed and stable.

## Relationship Keys

The workbook should use these exact relationship keys:

### Faculty ID

- Header: `Faculty ID`
- Purpose: unique stable identifier for one faculty/staff row
- Used in sheet: `faculty`
- Example: `faculty_christine_hohmann`

### Project ID

- Header: `Project ID`
- Purpose: unique stable identifier for one research project row
- Used in sheet: `research`
- Example: `project_melanocortin_signaling`

### Publication ID

- Header: `Publication ID`
- Purpose: unique stable identifier for one publication row
- Used in sheet: `publications`
- Example: `pub_melanocortin_2024_signal_review`

### Project-to-Publication relationship

- `publications.Project ID` must match `research.Project ID`

This creates:

- one research project
- many publication rows

### Faculty-to-Project relationship

To keep the workbook aligned and reduce drift, research rows should support:

- `PI Faculty ID`

This field should match:

- `faculty.Faculty ID`

The workbook may also include a display name column for convenience, but the stable relationship should use Faculty ID.

## General Workbook Rules

### Stable headers

- Column labels should be human-friendly
- Column labels should not be renamed once adopted
- Parsing logic should key off the exact labels defined here

### Locked columns

Locked columns are fields that users should normally not edit unless they are trained to do so.

Typical locked columns include:

- IDs
- helper/system fields
- formula fields

### Dropdown-backed columns

Dropdown-backed columns must use values from the `LOOKUPS` sheet where possible.

### Active/Inactive behavior

The workbook should never require deleting rows to hide content from the website.

Use:

- `Is Active = Yes`
- `Is Active = No`

## Sheet 1: `START_HERE`

### Exact sheet name

- `START_HERE`

### Purpose

This sheet is for instructions only. It is not a parsed content sheet.

### Exact column headers

Recommended simple structure:

- `Section`
- `Instruction`

### Required columns

- `Section`
- `Instruction`

### Optional columns

None.

### Locked columns

None required, but the entire sheet can be protected except for designated admin cells if desired.

### Dropdown-backed columns

None.

## Sheet 2: `faculty`

### Exact sheet name

- `faculty`

### Purpose

One row per faculty or staff profile.

### Exact column headers

- `Faculty ID`
- `Is Active`
- `Sort Order`
- `Full Name`
- `Category`
- `Title`
- `Department`
- `Summary Label`
- `Summary Text`
- `Email`
- `Fallback Icon`
- `Education 1`
- `Education 2`
- `Education 3`
- `Education 4`
- `Tag 1`
- `Tag 2`
- `Tag 3`
- `Tag 4`
- `Tag 5`
- `Tag 6`
- `Highlight Heading`
- `Highlight Text`
- `Office`
- `Phone`
- `Image Path`
- `Image Alt Text`
- `Internal Notes`

### Required columns

- `Faculty ID`
- `Is Active`
- `Sort Order`
- `Full Name`
- `Category`
- `Title`
- `Department`
- `Summary Label`
- `Summary Text`
- `Email`
- `Fallback Icon`

### Optional columns

- `Education 1`
- `Education 2`
- `Education 3`
- `Education 4`
- `Tag 1`
- `Tag 2`
- `Tag 3`
- `Tag 4`
- `Tag 5`
- `Tag 6`
- `Highlight Heading`
- `Highlight Text`
- `Office`
- `Phone`
- `Image Path`
- `Image Alt Text`
- `Internal Notes`

### Locked columns

- `Faculty ID`

Recommended additional locked columns if protection is used:

- `Sort Order`
  - lock only if managed centrally
- `Internal Notes`
  - optional to leave editable

### Dropdown-backed columns

- `Is Active`
  - allowed values: `Yes`, `No`
- `Category`
  - allowed values: `Leadership`, `Principal Investigators`, `Research Staff`
- `Summary Label`
  - allowed values: `Research Interests`, `Role & Expertise`

## Sheet 3: `research`

### Exact sheet name

- `research`

### Purpose

One row per research content item.

This sheet intentionally combines:

- research areas
- research projects
- research infrastructure

This keeps the workbook simpler for non-technical users while still supporting parsing, as long as the row type is explicit.

### Exact column headers

- `Row Type`
- `Project ID`
- `Is Active`
- `Sort Order`
- `Title`
- `Summary`
- `Icon`
- `Bullet 1`
- `Bullet 2`
- `Bullet 3`
- `Bullet 4`
- `Bullet 5`
- `PI Faculty ID`
- `PI Name`
- `Department`
- `Description`
- `Tag 1`
- `Tag 2`
- `Tag 3`
- `Tag 4`
- `Project Status`
- `Project URL`
- `Funding Source`
- `Grant Number`
- `Start Date`
- `End Date`
- `Infrastructure Name`
- `Primary Publication Label`
- `Primary Publication URL`
- `Internal Notes`

### Row type rules

Allowed values for `Row Type`:

- `area`
- `project`
- `infrastructure`

### Required columns for all research rows

- `Row Type`
- `Project ID`
- `Is Active`
- `Sort Order`

### Required columns by row type

#### If `Row Type = area`

Required:

- `Title`
- `Summary`
- `Icon`

Optional:

- `Bullet 1`
- `Bullet 2`
- `Bullet 3`
- `Bullet 4`
- `Bullet 5`

#### If `Row Type = project`

Required:

- `Title`
- `PI Faculty ID`
- `PI Name`
- `Department`
- `Description`

Optional:

- `Tag 1`
- `Tag 2`
- `Tag 3`
- `Tag 4`
- `Project Status`
- `Project URL`
- `Funding Source`
- `Grant Number`
- `Start Date`
- `End Date`
- `Primary Publication Label`
- `Primary Publication URL`

#### If `Row Type = infrastructure`

Required:

- `Infrastructure Name`
- `Description`
- `Icon`

Optional:

- `Department`

### Optional columns overall

- `Title`
- `Summary`
- `Icon`
- `Bullet 1`
- `Bullet 2`
- `Bullet 3`
- `Bullet 4`
- `Bullet 5`
- `PI Faculty ID`
- `PI Name`
- `Department`
- `Description`
- `Tag 1`
- `Tag 2`
- `Tag 3`
- `Tag 4`
- `Project Status`
- `Project URL`
- `Funding Source`
- `Grant Number`
- `Start Date`
- `End Date`
- `Infrastructure Name`
- `Primary Publication Label`
- `Primary Publication URL`
- `Internal Notes`

### Locked columns

- `Project ID`

Recommended additional locked columns if protection is used:

- `PI Name`
  - if it is formula-driven from `PI Faculty ID`

### Dropdown-backed columns

- `Row Type`
  - allowed values: `area`, `project`, `infrastructure`
- `Is Active`
  - allowed values: `Yes`, `No`
- `Project Status`
  - allowed values: `Current`, `Archived`, `Planned`

### Notes on publication links in `research`

To support research-page publication links:

- `Primary Publication Label`
- `Primary Publication URL`

may be populated for lightweight display on the research page.

However, these should be treated as optional convenience fields only.

The source of truth for publications should still be the `publications` sheet.

## Sheet 4: `publications`

### Exact sheet name

- `publications`

### Purpose

One row per publication.

This sheet is the source of truth for:

- publication links shown under research items
- the future publications page listing all publication records

### Exact column headers

- `Publication ID`
- `Project ID`
- `Is Active`
- `Sort Order`
- `Title`
- `Authors`
- `Authors Short`
- `Year`
- `Publication Type`
- `Department`
- `Journal or Source`
- `Citation Text`
- `DOI`
- `Abstract`
- `Featured Label`
- `Full Text URL`
- `Project Display Override`
- `Internal Notes`

### Required columns

- `Publication ID`
- `Project ID`
- `Is Active`
- `Sort Order`
- `Title`
- `Authors`
- `Year`
- `Publication Type`
- `Full Text URL`

### Optional columns

- `Authors Short`
- `Department`
- `Journal or Source`
- `Citation Text`
- `DOI`
- `Abstract`
- `Featured Label`
- `Project Display Override`
- `Internal Notes`

### Locked columns

- `Publication ID`
- `Project ID`
  - recommended to lock if it is selected centrally or validated tightly

### Dropdown-backed columns

- `Is Active`
  - allowed values: `Yes`, `No`
- `Publication Type`
  - allowed values:
    - `Journal Article`
    - `Review Article`
    - `Conference Paper`
    - `Book Chapter`
    - `Report`
    - `Preprint`
    - `Other`

### Notes on page usage

#### Fields needed on the research page

- `Title`
- `Full Text URL`
- `Year`
- `Publication Type`
- optionally `Authors Short`

#### Fields needed on the publications page

- `Title`
- `Authors`
- `Year`
- `Publication Type`
- `Department`
- `Journal or Source`
- `Full Text URL`
- `Project ID`
- optionally `Citation Text`
- optionally `DOI`
- optionally `Abstract`
- optionally `Featured Label`

## Sheet 5: `LOOKUPS`

### Exact sheet name

- `LOOKUPS`

### Purpose

This sheet stores validation lists and helper values used by dropdown-backed columns.

### Exact column headers

Use this simple lookup structure:

- `List Name`
- `Value`
- `Sort Order`

### Required columns

- `List Name`
- `Value`

### Optional columns

- `Sort Order`

### Locked columns

Recommended:

- lock the full sheet except for admin/editor users who manage lookup lists

### Dropdown-backed lists to include

#### `yes_no`

- `Yes`
- `No`

#### `faculty_category`

- `Leadership`
- `Principal Investigators`
- `Research Staff`

#### `summary_label`

- `Research Interests`
- `Role & Expertise`

#### `research_row_type`

- `area`
- `project`
- `infrastructure`

#### `project_status`

- `Current`
- `Archived`
- `Planned`

#### `publication_type`

- `Journal Article`
- `Review Article`
- `Conference Paper`
- `Book Chapter`
- `Report`
- `Preprint`
- `Other`

## Parsing Guidance

This workbook contract should map to parsing logic using these stable header-to-field assumptions:

### `faculty`

- `Faculty ID` -> faculty key
- `Full Name` -> display name
- `Tag 1` through `Tag 6` -> tag array
- `Education 1` through `Education 4` -> education list

### `research`

- `Row Type` splits rows into:
  - areas
  - projects
  - infrastructure
- `Project ID` is the stable key for project rows
- `Primary Publication Label` and `Primary Publication URL` are optional convenience fields only

### `publications`

- `Publication ID` is the stable publication key
- `Project ID` links each publication to a project
- multiple publication rows may share the same `Project ID`

## Current Recommended Relationship Design

### Faculty to project

- `research.PI Faculty ID` -> `faculty.Faculty ID`

### Project to publication

- `publications.Project ID` -> `research.Project ID`

### Cardinality

- one faculty member may be associated with many research projects
- one research project may have many publications
- one publication belongs to one primary research project

## Summary

The authoritative workbook is:

- `rcmi_content.xlsx`

With exact sheets:

1. `START_HERE`
2. `faculty`
3. `research`
4. `publications`
5. `LOOKUPS`

This structure is designed to:

- keep headers human-friendly
- keep parsing stable
- support linked publication links on research items
- support a dedicated publications page
- minimize future maintenance between the workbook and website
