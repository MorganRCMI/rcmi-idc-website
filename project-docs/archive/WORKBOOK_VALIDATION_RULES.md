# Workbook Validation Rules

## Purpose

This document defines the recommended validation, protection, and safety rules for the future workbook:

- `rcmi_content.xlsx`

It is based on [WORKBOOK_CONTRACT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/WORKBOOK_CONTRACT.md) and is intended to help non-technical users edit content safely without breaking parsing or website relationships.

## General Rules

- Do not rename sheets.
- Do not rename column headers.
- Do not delete ID values once a row has been used by the website.
- Prefer hiding rows from the website with `Is Active = No` instead of deleting rows.
- Use dropdowns wherever a field has a controlled list of allowed values.
- Protect ID columns and lookup lists to reduce accidental breakage.

## Visibility Control Fields

The current workbook contract uses one visibility field:

- `Is Active`

Allowed values:

- `Yes`
- `No`

Current interpretation:

- `Yes` = the item is eligible to appear on the website
- `No` = the item stays in the workbook but should not appear on the website

Important:

- `Show on Website` is not part of the current contract.
- `Publish Status` is not part of the current contract.
- If those fields are added later, they should be introduced intentionally and documented in the contract before parser changes are made.

## Sheet-by-Sheet Rules

### `START_HERE`

Purpose:

- instructions only

Required columns:

- `Section`
- `Instruction`

Dropdowns:

- none

Locked columns:

- none required

Recommended protection:

- optionally lock the full sheet except for workbook admins

Long text fields:

- `Instruction`

URL fields:

- none

### `faculty`

Purpose:

- one row per faculty or staff profile

#### Required fields

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

#### Optional fields

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

#### Dropdown columns

- `Is Active`
  - list: `yes_no`
  - values: `Yes`, `No`
- `Category`
  - list: `faculty_category`
  - values: `Leadership`, `Principal Investigators`, `Research Staff`
- `Summary Label`
  - list: `summary_label`
  - values: `Research Interests`, `Role & Expertise`

#### Locked columns

- `Faculty ID`

Recommended additional locked columns:

- `Sort Order` if only one person manages display order
- `Internal Notes` if notes are for admins only

#### Long text fields

- `Summary Text`
- `Highlight Text`
- `Internal Notes`

#### URL fields

- `Image Path`
  - if used as a URL, it should be a full `https://` URL
  - if used as a local path in a controlled workflow, it must follow the agreed file convention consistently

#### User-editable columns

Most users should only edit:

- `Is Active`
- `Full Name`
- `Category`
- `Title`
- `Department`
- `Summary Label`
- `Summary Text`
- `Email`
- `Fallback Icon`
- `Education 1` to `Education 4`
- `Tag 1` to `Tag 6`
- `Highlight Heading`
- `Highlight Text`
- `Office`
- `Phone`
- `Image Path`
- `Image Alt Text`

### `research`

Purpose:

- one row per research area, research project, or infrastructure item

#### Required fields for all rows

- `Row Type`
- `Project ID`
- `Is Active`
- `Sort Order`

#### Required fields by row type

If `Row Type = area`:

- `Title`
- `Summary`
- `Icon`

If `Row Type = project`:

- `Title`
- `PI Faculty ID`
- `PI Name`
- `Department`
- `Description`

If `Row Type = infrastructure`:

- `Infrastructure Name`
- `Description`
- `Icon`

#### Optional fields

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

#### Dropdown columns

- `Row Type`
  - list: `research_row_type`
  - values: `area`, `project`, `infrastructure`
- `Is Active`
  - list: `yes_no`
  - values: `Yes`, `No`
- `Project Status`
  - list: `project_status`
  - values: `Current`, `Archived`, `Planned`

#### Locked columns

- `Project ID`

Recommended additional locked columns:

- `PI Name` if it is derived from `PI Faculty ID`
- `Sort Order` if managed centrally
- `Internal Notes` if admin-only

#### Long text fields

- `Summary`
- `Description`
- `Internal Notes`

#### URL fields

- `Project URL`
- `Primary Publication URL`

URL rule:

- must start with `https://`
- should open directly to the intended page
- should not contain spaces

#### Visibility fields

- `Is Active`

#### Relationship-sensitive fields

- `Project ID`
  - must stay unique for each real project record
- `PI Faculty ID`
  - should match an existing `Faculty ID` in the `faculty` sheet for project rows

Important:

- Do not change a `Project ID` after publications have been linked to it.
- Do not leave `PI Faculty ID` blank on project rows.

### `publications`

Purpose:

- one row per publication linked to a research project

#### Required fields

- `Publication ID`
- `Project ID`
- `Is Active`
- `Sort Order`
- `Title`
- `Authors`
- `Year`
- `Publication Type`
- `Full Text URL`

#### Optional fields

- `Authors Short`
- `Department`
- `Journal or Source`
- `Citation Text`
- `DOI`
- `Abstract`
- `Featured Label`
- `Project Display Override`
- `Internal Notes`

#### Dropdown columns

- `Is Active`
  - list: `yes_no`
  - values: `Yes`, `No`
- `Publication Type`
  - list: `publication_type`
  - values:
    - `Journal Article`
    - `Review Article`
    - `Conference Paper`
    - `Book Chapter`
    - `Report`
    - `Preprint`
    - `Other`

#### Locked columns

- `Publication ID`

Recommended additional locked columns:

- `Project ID` if publications are linked by an admin or selected from a validated list
- `Sort Order` if managed centrally
- `Internal Notes` if admin-only

#### Long text fields

- `Citation Text`
- `Abstract`
- `Internal Notes`

#### URL fields

- `Full Text URL`

Recommended URL-format fields:

- `DOI`
  - either store the DOI string consistently, such as `10.1000/example`
  - or store a full DOI URL consistently, such as `https://doi.org/10.1000/example`
  - do not mix both formats unless the parser is designed for it

#### Visibility fields

- `Is Active`

#### Relationship-sensitive fields

- `Project ID`
  - must match an existing `Project ID` in the `research` sheet
- `Publication ID`
  - must remain stable once published

Important:

- One project may have multiple publication rows.
- Multiple publications may share the same `Project ID`.
- Never invent a new `Project ID` in `publications` unless that exact ID already exists in `research`.

### `LOOKUPS`

Purpose:

- stores allowed values for dropdowns

Required fields:

- `List Name`
- `Value`

Optional fields:

- `Sort Order`

Dropdowns:

- none on the lookup sheet itself

Locked columns:

- recommended: lock the whole sheet for normal users

Long text fields:

- none

URL fields:

- none

## Dropdown Recommendations

Create data-validation dropdowns for these columns:

- `faculty.Is Active`
- `faculty.Category`
- `faculty.Summary Label`
- `research.Row Type`
- `research.Is Active`
- `research.Project Status`
- `publications.Is Active`
- `publications.Publication Type`

Use the `LOOKUPS` sheet as the source for all dropdowns.

## Locked Column Recommendations

Lock these columns in normal editing mode:

- `faculty.Faculty ID`
- `research.Project ID`
- `publications.Publication ID`
- `LOOKUPS` entire sheet

Recommended additional locked columns where feasible:

- all `Sort Order` columns
- `research.PI Name` if formula-driven
- `publications.Project ID` if only admins should manage publication linking
- all `Internal Notes` columns if those are for admin use only

## Long Text Recommendations

These fields should use wrapped text and taller row heights:

- `faculty.Summary Text`
- `faculty.Highlight Text`
- `faculty.Internal Notes`
- `research.Summary`
- `research.Description`
- `research.Internal Notes`
- `publications.Citation Text`
- `publications.Abstract`
- `publications.Internal Notes`
- `START_HERE.Instruction`

## URL Validation Recommendations

These columns should be validated as URLs:

- `research.Project URL`
- `research.Primary Publication URL`
- `publications.Full Text URL`
- `faculty.Image Path` if the workbook uses hosted images

Recommended URL validation rule:

- must begin with `https://`

Additional safety checks:

- no spaces
- test links before marking rows active
- avoid shortened URLs unless necessary

## Safety Recommendations For Non-Technical Users

- Edit only the white or unlocked cells.
- Do not rename tabs.
- Do not sort a single column by itself; always sort the full sheet range.
- Do not copy and paste over headers.
- When duplicating a row to create a new item, immediately replace the ID with a new unique value if that column is editable by admins.
- Use `Is Active = No` to hide an item instead of deleting it.
- If a link is required, open it once before saving the workbook.
- If a dropdown appears, always choose a value from the list instead of typing a new one.

## Preventing Broken Project ID Links

These rules are the most important for keeping research and publications aligned:

- Never change an existing `research.Project ID` unless all related publication rows are updated at the same time.
- Never delete a research project row that still has related publication rows.
- Before adding a publication, confirm that its `Project ID` already exists in `research`.
- If possible, lock `publications.Project ID` and let only trained editors update it.
- Maintain a filtered admin view or report that shows publications with missing or unmatched `Project ID` values.
- If a project should be hidden temporarily, set `research.Is Active = No` instead of deleting the row.

## Preventing Accidental Deletion

Recommended workbook protections:

- protect headers on every sheet
- protect ID columns
- protect the `LOOKUPS` sheet
- keep a versioned backup of the workbook
- enable autosave/version history in OneDrive, SharePoint, or Google Drive if available

Recommended editing workflow:

1. Duplicate the latest workbook before major edits.
2. Make content changes.
3. Check required cells and dropdown columns.
4. Verify that all new publications point to a real `Project ID`.
5. Save the workbook with the same file name: `rcmi_content.xlsx`.

## Summary

The safest current visibility model is simple:

- use `Is Active`
- do not delete rows
- protect IDs
- validate relationships through `Project ID`

This keeps the workbook stable for non-technical users and reduces the risk of broken parsing or missing linked publication content.
