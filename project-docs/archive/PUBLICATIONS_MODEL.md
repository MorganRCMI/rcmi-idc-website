# Publications Model

## Purpose

The publications dataset should provide a structured, spreadsheet-friendly way to manage publication records that are related to research projects.

It serves two website needs:

1. show publication links under research items on the research page
2. power a separate publications page listing all publications

The purpose of this dataset is to move publication information out of overloaded text fields and into its own stable, reusable content model.

## Workbook Structure

This should be modeled in one Excel workbook with multiple sheets.

Recommended sheets:

1. `faculty`
2. `research_projects`
3. `research_areas`
4. `research_infrastructure`
5. `publications`
6. `lists`

The new sheet introduced here is:

- `publications`

## Relationship To Research Projects

Publications should relate to research projects through a stable Project ID.

Recommended relationship:

- `research_projects.record_id` is the project primary key
- `publications.project_record_id` is the foreign key that points to `research_projects.record_id`

This is the cleanest structure because:

- project names can change without breaking the relationship
- multiple publications can point to the same project
- one publication list can be reused on both the research page and the publications page
- workbook maintenance stays manageable for non-technical users

## Can One Project Have Multiple Publications?

Yes.

One project should be allowed to have multiple publications.

Recommended relationship type:

- one `research_projects` row to many `publications` rows

This is the correct structure because:

- research projects often generate multiple papers over time
- a single overloaded publication field on the project row will not scale
- separate publication rows allow sorting, filtering, and adding metadata cleanly

## Recommended Publications Sheet

Sheet name:

- `publications`

Each row should represent one publication.

## Recommended Publication Fields

### Required fields

| Header | Purpose |
|---|---|
| `record_id` | Stable unique ID for the publication row |
| `project_record_id` | Links the publication to a research project |
| `is_active` | Controls whether the publication should appear on the site |
| `sort_order` | Controls display order within a project or page |
| `title` | Full publication title |
| `authors` | Display-ready author string |
| `year` | Publication year |
| `publication_type` | Type such as Journal Article, Review, Conference Paper |
| `full_text_url` | Public URL to the full text or official publication page |

### Optional fields

| Header | Purpose |
|---|---|
| `department` | Department associated with the publication |
| `journal_or_source` | Journal name, conference name, or source |
| `citation_text` | Preformatted citation text if needed later |
| `doi` | DOI string |
| `abstract` | Abstract or summary |
| `featured_label` | Optional short label such as Featured or Open Access |
| `project_display_override` | Optional manual text if the linked project title should be displayed differently |
| `authors_short` | Short author string for tighter layouts |
| `notes_internal` | Internal workbook note not meant for publishing |

## Recommended Stable Headers

Use these exact headers for the `publications` sheet:

- `record_id`
- `project_record_id`
- `is_active`
- `sort_order`
- `title`
- `authors`
- `year`
- `publication_type`
- `full_text_url`
- `department`
- `journal_or_source`
- `citation_text`
- `doi`
- `abstract`
- `featured_label`
- `project_display_override`
- `authors_short`
- `notes_internal`

These headers are:

- simple
- stable
- readable by non-technical staff
- explicit enough for future code and workbook validation

## Recommended Field Definitions

### `record_id`

- Type: text
- Example: `pub_melanocortin_2024_signal_review`
- Required: yes
- Notes: should be unique and stable

### `project_record_id`

- Type: text
- Example: `project_melanocortin_signaling`
- Required: yes
- Notes: must exactly match a row in `research_projects.record_id`

### `is_active`

- Type: yes/no dropdown
- Required: yes
- Notes: use `Yes` to publish, `No` to retain without display

### `sort_order`

- Type: whole number
- Required: yes
- Notes: controls ordering; use `10, 20, 30`

### `title`

- Type: text
- Required: yes
- Notes: full publication title as it should appear publicly

### `authors`

- Type: text
- Required: yes
- Notes: display-ready author list in the preferred public format

### `year`

- Type: whole number or text
- Required: yes
- Notes: use a four-digit year

### `publication_type`

- Type: dropdown/text
- Required: yes
- Notes: recommended controlled values listed below

### `full_text_url`

- Type: URL
- Required: yes
- Notes: should point to a public page or direct full text location

### `department`

- Type: text
- Required: no
- Notes: useful for the publications page and filtering

### `journal_or_source`

- Type: text
- Required: no
- Notes: journal name, book title, proceedings, or repository

### `citation_text`

- Type: long text
- Required: no
- Notes: useful if the team wants a ready-to-render citation later

### `doi`

- Type: text
- Required: no
- Notes: store the DOI string, not only the DOI URL

### `abstract`

- Type: long text
- Required: no
- Notes: optional for richer publication pages later

### `featured_label`

- Type: text
- Required: no
- Notes: small badge text if needed later

### `project_display_override`

- Type: text
- Required: no
- Notes: only needed if the project title shown with the publication should differ from the canonical project title

### `authors_short`

- Type: text
- Required: no
- Notes: shorter author text for compact cards or list items

### `notes_internal`

- Type: long text
- Required: no
- Notes: internal editorial notes only

## Recommended Controlled Values

For `publication_type`, use a dropdown where possible.

Suggested values:

- `Journal Article`
- `Review Article`
- `Conference Paper`
- `Book Chapter`
- `Report`
- `Preprint`
- `Other`

## Which Fields Should Appear On The Research Page

The research page needs a light-touch publication link under each project, not a full citation database.

Recommended fields for research page display:

- `title`
- `full_text_url`
- `year`
- `publication_type`

Optional if space allows:

- `authors_short`

Recommended research page behavior:

- list one or more linked publications beneath each project
- link text should usually use the publication `title`
- if multiple publications exist, show a short list

## Which Fields Should Appear On The Future Publications Page

The publications page should show fuller publication records.

Recommended fields for publications page display:

- `title`
- `authors`
- `year`
- `publication_type`
- `department`
- `journal_or_source`
- linked project title via `project_record_id`
- `full_text_url`

Optional fields for richer versions later:

- `citation_text`
- `doi`
- `abstract`
- `featured_label`

## Recommended Relationship Structure

Use this structure:

- `research_projects.record_id` -> primary project key
- `publications.project_record_id` -> foreign key to the project

This is the recommended one-to-many model:

- one project
- many publications

Do not use:

- a comma-separated publication list on the project row
- one overloaded `publication_link` field on the project row
- project title text as the relationship key

Those approaches create maintenance problems and make workbook sync brittle.

## Recommended Additions To The Research Model

To support publication linking cleanly, the current research model needs these additions or clarifications:

### Already present and usable

- `research_projects.record_id`

This is the correct field to use as the Project ID key.

### Needed for clean linking

- A dedicated `publications` sheet
- A required `publications.project_record_id` field

### Optional but recommended additions to `research_projects`

These are not strictly required, but they may help:

- `has_publications`
  - optional convenience field, not required if the site can compute this from linked publication rows
- `project_short_title`
  - optional only if the project title is too long for compact references

The cleanest approach is still to derive publication presence from linked publication rows, not from a manual boolean field.

## Non-Technical Workbook Guidance

To keep this spreadsheet-friendly:

- one publication per row
- never put multiple publications in one cell
- always link a publication to a project using `project_record_id`
- use dropdowns for `is_active` and `publication_type`
- use `sort_order` values like `10, 20, 30`
- keep `full_text_url` as a public URL only
- do not delete old rows when a publication should no longer display; set `is_active = No`

## Minimal Viable Publications Model

If the team wants the smallest useful model first, use only these fields:

- `record_id`
- `project_record_id`
- `is_active`
- `sort_order`
- `title`
- `authors`
- `year`
- `publication_type`
- `full_text_url`

That is enough to:

- link publications under research projects
- build a dedicated publications page
- keep the workbook normalized and maintainable

## Summary

The recommended publications model is:

- a separate `publications` sheet
- one row per publication
- one-to-many relationship from project to publications
- linkage by `project_record_id` pointing to `research_projects.record_id`

This is the simplest structure that will scale cleanly and keep the workbook and website aligned over time.
