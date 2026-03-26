# Excel Template Guide

## Purpose

This guide explains how non-technical users should fill out the workbook for the website.

Workbook file name:

- `rcmi_content.xlsx`

Workbook tabs:

1. `START_HERE`
2. `faculty`
3. `research`
4. `publications`
5. `LOOKUPS`

This guide is written to match [WORKBOOK_CONTRACT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/WORKBOOK_CONTRACT.md).

## What Each Tab Is For

### `START_HERE`

Use this tab for instructions only.

It should explain:

- what each sheet is for
- which columns should be edited
- how IDs and links work
- who to contact if the workbook needs structural changes

### `faculty`

Use this tab to manage:

- faculty profiles
- staff profiles
- research interests
- tags
- contact information

Each row is one person.

### `research`

Use this tab to manage:

- research areas
- research projects
- research infrastructure/resources

Each row is one item.

The `Row Type` column tells the website what kind of item the row is.

### `publications`

Use this tab to manage:

- publication records
- publication links
- publication metadata
- which research project each publication belongs to

Each row is one publication.

### `LOOKUPS`

Use this tab to store dropdown values such as:

- Yes / No
- faculty categories
- row types
- publication types

Most users should not edit this tab unless they are managing workbook rules.

## Which Cells Users Should Edit

Users should edit:

- normal data entry columns in `faculty`
- normal data entry columns in `research`
- normal data entry columns in `publications`

Users should usually not edit:

- ID columns
- lookup lists
- any locked cells

If a row already exists, update the row instead of creating duplicates.

## Which Columns Should Stay Locked

## `faculty`

Keep locked:

- `Faculty ID`

Recommended optional lock:

- `Sort Order`

## `research`

Keep locked:

- `Project ID`

Recommended optional lock:

- `PI Name`
  - if it is being managed centrally or filled from `PI Faculty ID`

## `publications`

Keep locked:

- `Publication ID`

Recommended optional lock:

- `Project ID`
  - especially if the workbook manager wants to control project linking carefully

## `LOOKUPS`

Keep the full sheet locked for normal users.

## What Each Column Means In Plain Language

## `faculty` tab

### Core columns

- `Faculty ID`
  - The unique ID for this person. Do not change it.
- `Is Active`
  - `Yes` means show on the website. `No` means hide from the website.
- `Sort Order`
  - Controls where the person appears in the list.
- `Full Name`
  - The name shown on the website.
- `Category`
  - Which group this person belongs to.
- `Title`
  - Job title or academic title.
- `Department`
  - Department or unit name.
- `Summary Label`
  - The heading above the person’s main paragraph, such as `Research Interests`.
- `Summary Text`
  - The main descriptive paragraph.
- `Email`
  - Main contact email.
- `Fallback Icon`
  - Short fallback visual if an image is not used.

### Education columns

- `Education 1`
- `Education 2`
- `Education 3`
- `Education 4`

Use these for degree or education lines.

### Tag columns

- `Tag 1`
- `Tag 2`
- `Tag 3`
- `Tag 4`
- `Tag 5`
- `Tag 6`

Use these for short topical labels.

### Extra display columns

- `Highlight Heading`
  - Optional extra box title such as `Publications`.
- `Highlight Text`
  - Optional extra box text.
- `Office`
  - Office location.
- `Phone`
  - Contact phone number.
- `Image Path`
  - Relative path to an image if used later.
- `Image Alt Text`
  - Text description of the image.
- `Internal Notes`
  - Internal note only. Not for public display.

## `research` tab

### Core columns

- `Row Type`
  - Tells the system whether this row is an `area`, `project`, or `infrastructure`.
- `Project ID`
  - The unique ID for the row. Do not change it once created.
- `Is Active`
  - `Yes` means show it. `No` means hide it.
- `Sort Order`
  - Controls display order.

### Shared content columns

- `Title`
  - Main title for areas or projects.
- `Summary`
  - Main summary for research areas.
- `Icon`
  - Symbol or emoji for the item.
- `Description`
  - Main paragraph for project or infrastructure rows.
- `Department`
  - Department or unit connected to the row.
- `Internal Notes`
  - Internal note only.

### Area-specific columns

- `Bullet 1`
- `Bullet 2`
- `Bullet 3`
- `Bullet 4`
- `Bullet 5`

Use these to list area subtopics.

### Project-specific columns

- `PI Faculty ID`
  - Links the project to a faculty row.
- `PI Name`
  - Display name of the principal investigator.
- `Tag 1`
- `Tag 2`
- `Tag 3`
- `Tag 4`
  - Short labels for the project.
- `Project Status`
  - Such as `Current` or `Archived`.
- `Project URL`
  - Optional link for the project.
- `Funding Source`
  - Optional funding organization or source.
- `Grant Number`
  - Optional grant number.
- `Start Date`
  - Optional project start date.
- `End Date`
  - Optional project end date.
- `Primary Publication Label`
  - Optional short text for one featured publication link.
- `Primary Publication URL`
  - Optional URL for one featured publication link.

### Infrastructure-specific columns

- `Infrastructure Name`
  - Name of the infrastructure/resource item.

## `publications` tab

### Core columns

- `Publication ID`
  - Unique ID for the publication. Do not change it.
- `Project ID`
  - Links the publication to a research project.
- `Is Active`
  - `Yes` means show it. `No` means hide it.
- `Sort Order`
  - Controls display order.
- `Title`
  - Publication title.
- `Authors`
  - Full display-ready author list.
- `Authors Short`
  - Optional shorter author list for tighter layouts.
- `Year`
  - Publication year.
- `Publication Type`
  - Type such as `Journal Article`.
- `Department`
  - Optional department associated with the publication.
- `Journal or Source`
  - Journal, conference, or source name.
- `Citation Text`
  - Optional preformatted citation.
- `DOI`
  - DOI if available.
- `Abstract`
  - Optional abstract text.
- `Featured Label`
  - Optional small label such as `Open Access`.
- `Full Text URL`
  - Link to the publication or full text.
- `Project Display Override`
  - Optional manual project title text if needed.
- `Internal Notes`
  - Internal note only.

## How To Add A New Research Project

1. Go to the `research` tab.
2. Add a new row at the bottom of the project rows.
3. Set `Row Type` to `project`.
4. Create a new unique `Project ID`.
5. Set `Is Active` to `Yes` if it should appear on the website.
6. Add `Sort Order` using a number such as `80` or `90`.
7. Fill in:
   - `Title`
   - `PI Faculty ID`
   - `PI Name`
   - `Department`
   - `Description`
8. Add tags and optional project details if available.
9. Leave optional fields blank if you do not have the information yet.

## How To Add A New Publication

1. Go to the `publications` tab.
2. Add a new row at the bottom.
3. Create a new unique `Publication ID`.
4. Enter the `Project ID` for the project this publication belongs to.
5. Set `Is Active` to `Yes`.
6. Add `Sort Order`.
7. Fill in:
   - `Title`
   - `Authors`
   - `Year`
   - `Publication Type`
   - `Full Text URL`
8. Add optional details such as department, DOI, or abstract if available.

## How To Link A Publication To A Research Project Using Project ID

The link is made through:

- `research.Project ID`
- `publications.Project ID`

To link a publication correctly:

1. Find the project row on the `research` tab.
2. Copy the exact `Project ID`.
3. Paste that exact value into the publication row’s `Project ID` column on the `publications` tab.
4. Do not type a project title instead of the ID.

If the `Project ID` does not match exactly, the publication will not be linked correctly.

## How To Hide An Item From The Website Without Deleting It

Do not delete the row.

Instead:

1. Find the row in `faculty`, `research`, or `publications`
2. Change `Is Active` from `Yes` to `No`

This keeps the record in the workbook while removing it from website display.

## Tips To Avoid Breaking The Workbook

- Do not rename sheet tabs.
- Do not rename column headers.
- Do not move columns unless the parsing logic is updated.
- Do not delete ID values after a row has been used.
- Do not use project titles as relationship keys.
- Always use `Project ID` to link publications to projects.
- Use dropdown values exactly as provided.
- Leave optional cells blank rather than writing placeholder text unless required by your team.
- Use one row per person, one row per research item, and one row per publication.
- If you are unsure whether a value is public-facing, put it in `Internal Notes` and ask first.

## START_HERE Sheet Content Draft

The following draft can be pasted into the `START_HERE` tab.

| Section | Instruction |
|---|---|
| Workbook Name | This workbook must be saved as `rcmi_content.xlsx`. |
| Purpose | This workbook controls faculty, research, and publication content for the website. |
| Tabs | Use `faculty` for people, `research` for areas/projects/infrastructure, `publications` for publication records, and `LOOKUPS` for dropdown values. |
| Do Not Rename | Do not rename sheet tabs or column headers. |
| IDs | Do not change `Faculty ID`, `Project ID`, or `Publication ID` once they are in use. |
| Hide vs Delete | To hide an item from the website, set `Is Active` to `No`. Do not delete the row. |
| Research Rows | In the `research` tab, each row must have a `Row Type` of `area`, `project`, or `infrastructure`. |
| Publication Linking | Link each publication to a project by copying the exact `Project ID` from the `research` tab into the `publications` tab. |
| Required Fields | Fill all required columns before marking an item active. |
| Dropdowns | Use dropdown options where available instead of typing custom values. |
| Help | If you need to add new columns or change workbook structure, contact the workbook administrator before editing. |

## Summary

This workbook should be easy for non-technical users if everyone follows these rules:

- edit only the intended data cells
- keep IDs stable
- use dropdown values
- link publications to projects with `Project ID`
- hide rows with `Is Active = No` instead of deleting them
