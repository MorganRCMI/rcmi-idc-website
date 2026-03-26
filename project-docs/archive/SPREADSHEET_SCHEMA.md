# Spreadsheet Schema

## Purpose

This document proposes a spreadsheet-friendly content model for the current website without changing the website itself. The goal is to define a structure that can work in either Google Sheets or Excel and that maps cleanly to the existing hardcoded content patterns identified in [CONTENT_AUDIT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/CONTENT_AUDIT.md).

## Recommended Workbook Structure

Use one workbook with these sheets:

1. `faculty`
2. `research_areas`
3. `research_projects`
4. `research_infrastructure`
5. `lists`

The `lists` sheet is optional but strongly recommended for dropdown values and editor guidance.

## Sheet 1: `faculty`

This sheet stores one row per faculty member or staff profile shown on the faculty page.

### Required columns

| Column | Type | Description |
|---|---|---|
| `record_id` | Text | Stable unique ID for the row, such as `faculty_christine_hohmann`. |
| `is_active` | Boolean / Yes-No | Controls whether the row should be considered publishable later. |
| `sort_order` | Whole number | Display order on the page. Lower numbers appear first. |
| `name` | Text | Full display name. |
| `category` | Text / Dropdown | Faculty grouping such as `Leadership`, `Principal Investigators`, or `Research Staff`. |
| `title` | Text | Role or academic title shown under the name. |
| `department` | Text | Department, school, or administrative unit. |
| `summary_label` | Text / Dropdown | Section heading such as `Research Interests` or `Role & Expertise`. |
| `summary_text` | Long text | Main descriptive paragraph for the person. |
| `email` | Email / Text | Primary contact email address. |
| `fallback_icon` | Text | Emoji or short fallback value used if no photo is available. |

### Optional columns

| Column | Type | Description |
|---|---|---|
| `education_1` | Text | First education line. |
| `education_2` | Text | Second education line. |
| `education_3` | Text | Third education line. |
| `education_4` | Text | Fourth education line if needed later. |
| `tag_1` | Text | First topical tag. |
| `tag_2` | Text | Second topical tag. |
| `tag_3` | Text | Third topical tag. |
| `tag_4` | Text | Fourth topical tag. |
| `tag_5` | Text | Fifth topical tag if needed later. |
| `tag_6` | Text | Sixth topical tag if needed later. |
| `highlight_heading` | Text | Optional secondary callout heading such as `Publications` or `Recent Focus`. |
| `highlight_text` | Long text | Optional secondary callout body text. |
| `office` | Text | Office location. |
| `phone` | Text | Phone number in display format. |
| `image_path` | Text | Relative image path such as `img/Christine.jpg`. |
| `image_alt` | Text | Alt text for the image. Usually the person’s name. |
| `notes_internal` | Long text | Internal editor notes not meant for publishing. |

### Column notes

- Use `record_id` as the permanent identifier even if a person’s title changes.
- Keep `sort_order` unique if possible to avoid ambiguous ordering.
- Use either `image_path` or `fallback_icon`, but keep `fallback_icon` populated as a backup.
- If a person has no highlight block, leave both `highlight_heading` and `highlight_text` blank.

### Example rows

| record_id | is_active | sort_order | name | category | title | department | summary_label | summary_text | email | fallback_icon | education_1 | education_2 | education_3 | tag_1 | tag_2 | tag_3 | tag_4 | highlight_heading | highlight_text | office | phone | image_path | image_alt |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| faculty_christine_hohmann | Yes | 10 | Dr. Christine Hohmann | Leadership | Lead, Investigator Development Core | Department of Psychology | Research Interests | Neuroscience, investigator development, mentorship programs, and capacity building for early-stage researchers in biomedical sciences. | christine.hohmann@morgan.edu | 👨‍🔬 | Ph.D. in Neuroscience | M.S. in Biological Sciences | B.S. in Psychology | Neuroscience | Mentorship | Grant Writing |  |  |  |  |  | img/Christine.jpg | Dr. Christine Hohmann |
| faculty_james_wachira | Yes | 40 | Dr. James Wachira | Principal Investigators | Professor of Biology | Department of Biology | Research Interests | Cell signaling, RNA packaging, cell growth and proliferation, and gene expression. The laboratory delineates mechanisms of signaling through melanocortin receptors and investigates biophysical principles underlying RNA-protein interactions for insights into cellular RNA packaging and gene expression control. | james.wachira@morgan.edu | 👨‍🔬 | Ph.D., University College London (1994) | M.Sc., University of Nairobi (1990) | B.Sc. (Hons), University of Nairobi (1986) | Cell Signaling | RNA Biology | Gene Expression | Molecular Biology | Publications | Total: 29 publications \| h-Index: 12 \| Citations: 406+ |  |  |  | Dr. James Wachira |
| faculty_diane_hughes | Yes | 60 | Diane Hughes | Research Staff | Program Manager | RCMI Administrative Core | Role & Expertise | Ms. Hughes provides essential organizational support and program coordination for RCMI. With 10 years of experience as an Administrative Assistant in the Dean's office and extensive background in office management, she ensures smooth operations across all RCMI programs. | diane.hughes@morgan.edu | 👩‍💼 | M.Sc. (candidate) in Management, University of Maryland Global Campus | B.A. in Speech Communication (Organizational & Interpersonal), Morgan State University |  | Program Management | Administration | Coordination |  |  |  | Portage 113 | (443) 885-4534 | img/placeholder.png | Diane Hughes |

## Sheet 2: `research_areas`

This sheet stores the research focus cards shown on the research page.

### Required columns

| Column | Type | Description |
|---|---|---|
| `record_id` | Text | Stable unique ID such as `area_molecular_cellular_biology`. |
| `is_active` | Boolean / Yes-No | Controls whether the area should appear later. |
| `sort_order` | Whole number | Display order on the page. |
| `title` | Text | Research area title. |
| `summary` | Long text | Short descriptive paragraph. |
| `icon` | Text | Emoji or icon token used for the card. |

### Optional columns

| Column | Type | Description |
|---|---|---|
| `bullet_1` | Text | First bullet item. |
| `bullet_2` | Text | Second bullet item. |
| `bullet_3` | Text | Third bullet item. |
| `bullet_4` | Text | Fourth bullet item. |
| `bullet_5` | Text | Fifth bullet item if needed later. |
| `notes_internal` | Long text | Internal editor notes. |

### Example rows

| record_id | is_active | sort_order | title | summary | icon | bullet_1 | bullet_2 | bullet_3 | bullet_4 |
|---|---|---:|---|---|---|---|---|---|---|
| area_molecular_cellular_biology | Yes | 10 | Molecular & Cellular Biology | Investigating fundamental biological mechanisms at the molecular and cellular level to understand disease processes. | 🧬 | Cell signaling pathways | Gene expression regulation | RNA-protein interactions | Melanocortin receptor mechanisms |
| area_neuroscience_behavior | Yes | 20 | Neuroscience & Behavior | Exploring the biological basis of behavior and cognitive function across the lifespan. | 🧠 | Developmental neurobiology | Cognitive aging | Risky behaviors | Drug abuse mechanisms |

## Sheet 3: `research_projects`

This sheet stores the featured project cards shown on the research page.

### Required columns

| Column | Type | Description |
|---|---|---|
| `record_id` | Text | Stable unique ID such as `project_melanocortin_signaling`. |
| `is_active` | Boolean / Yes-No | Controls whether the project should be included later. |
| `sort_order` | Whole number | Display order on the page. |
| `title` | Text | Project title. |
| `pi_name` | Text | Principal investigator display name. |
| `department` | Text | Department label shown in the project card. |
| `description` | Long text | Main project summary paragraph. |

### Optional columns

| Column | Type | Description |
|---|---|---|
| `tag_1` | Text | First project tag. |
| `tag_2` | Text | Second project tag. |
| `tag_3` | Text | Third project tag. |
| `tag_4` | Text | Fourth project tag if needed later. |
| `project_status` | Text / Dropdown | Optional status such as `Current`, `Archived`, or `Planned`. |
| `project_url` | URL / Text | Optional project link. |
| `funding_source` | Text | Optional sponsor or grant source. |
| `grant_number` | Text | Optional grant identifier. |
| `start_date` | Date | Optional project start date. |
| `end_date` | Date | Optional project end date. |
| `notes_internal` | Long text | Internal editor notes. |

### Example rows

| record_id | is_active | sort_order | title | pi_name | department | description | tag_1 | tag_2 | tag_3 | project_status |
|---|---|---:|---|---|---|---|---|---|---|---|
| project_melanocortin_signaling | Yes | 10 | Melanocortin Receptor Signaling in Health and Disease | Dr. James Wachira | Biology | This project delineates the mechanisms of signaling through melanocortin receptors, which play important roles in diverse physiological processes including energy homeostasis, pigmentation, and inflammation. Understanding these pathways has implications for treating obesity, metabolic disorders, and inflammatory diseases. | Cell Signaling | Molecular Biology | Metabolic Disease | Current |
| project_urban_health_interventions | Yes | 30 | Community-Based Health Interventions in Urban Settings | Dr. Payam Sheikhattari | Public Health | This research employs community-based participatory approaches to address health disparities in urban populations, with a focus on tobacco control and nicotine dependence. The project develops and tests culturally-appropriate interventions that can be sustained in community settings. | Public Health | CBPR | Health Disparities | Current |

## Sheet 4: `research_infrastructure`

This sheet stores the research infrastructure/resource cards shown on the research page.

### Required columns

| Column | Type | Description |
|---|---|---|
| `record_id` | Text | Stable unique ID such as `infra_mcb_core_lab`. |
| `is_active` | Boolean / Yes-No | Controls whether the item should appear later. |
| `sort_order` | Whole number | Display order on the page. |
| `name` | Text | Resource or infrastructure name. |
| `description` | Long text | Short descriptive paragraph. |
| `icon` | Text | Emoji or icon token for the card. |

### Optional columns

| Column | Type | Description |
|---|---|---|
| `notes_internal` | Long text | Internal notes for editors. |

### Example rows

| record_id | is_active | sort_order | name | description | icon |
|---|---|---:|---|---|---|
| infra_mcb_core_lab | Yes | 10 | MCB Core Laboratory | Molecular and Cellular Biology core providing access to advanced instrumentation and technical expertise for biomedical research. | 🔬 |
| infra_biostatistics_unit | Yes | 30 | Biostatistics Unit | Statistical consultation and support for study design, data analysis, and manuscript preparation. | 📈 |

## Sheet 5: `lists`

This support sheet is for controlled values used in dropdowns and validation rules.

### Suggested list blocks

| List Name | Values |
|---|---|
| `yes_no` | Yes, No |
| `faculty_category` | Leadership, Principal Investigators, Research Staff |
| `summary_label` | Research Interests, Role & Expertise |
| `project_status` | Current, Archived, Planned |

You can also use this sheet for instructions, examples, and approved tag vocabulary.

## Field Type Guidance

Use these practical types in either Google Sheets or Excel:

| Field Type | Safe Spreadsheet Format |
|---|---|
| Text | Plain text cell |
| Long text | Wrapped text cell |
| Whole number | Number with no decimals |
| Boolean / Yes-No | Dropdown or data validation list |
| Email | Plain text validated with a pattern if available |
| URL | Plain text validated to start with `http://` or `https://` when external |
| Date | Date-formatted cell |

## Safe Editing Rules For Non-Technical Staff

### General rules

- Do not rename sheet tabs or column headers.
- Do not reorder columns unless the technical workflow is updated to match.
- Add new records as new rows, not by inserting content into notes or blank spaces outside the table.
- Keep one person, area, project, or infrastructure item per row.
- Leave optional fields blank rather than writing placeholder text like `TBD` unless your team explicitly wants placeholders.

### Text entry rules

- Copy titles, names, and departments exactly as they should appear publicly.
- Use sentence case for summaries and descriptions.
- Avoid extra line breaks inside a single cell unless the publishing process later supports them.
- Keep tag values short and consistent. Example: use `Public Health`, not a mix of `Public health`, `PH`, and `public health`.

### Image rules

- If using local site images later, enter relative paths like `img/Christine.jpg`.
- Do not paste private file system paths such as `/Users/name/Desktop/photo.jpg`.
- Do not paste Google Drive share links as image paths unless the future publishing workflow is designed to transform them.
- Always provide `image_alt` when `image_path` is filled.

### Row lifecycle rules

- Use `is_active = No` to deactivate content instead of deleting rows.
- Do not reuse an old `record_id` for a different person or project.
- Keep `sort_order` values spaced by 10s so new items can be inserted later without renumbering everything.

## Validation Suggestions

These suggestions work conceptually in both Google Sheets and Excel.

### Required field validation

Apply required-field checks to:

- All `record_id` columns
- All `is_active` columns
- All `sort_order` columns
- Faculty: `name`, `category`, `title`, `department`, `summary_label`, `summary_text`, `email`, `fallback_icon`
- Research areas: `title`, `summary`, `icon`
- Research projects: `title`, `pi_name`, `department`, `description`
- Research infrastructure: `name`, `description`, `icon`

### Dropdown suggestions

Use dropdown validation for:

- `is_active`: `Yes`, `No`
- `category`: `Leadership`, `Principal Investigators`, `Research Staff`
- `summary_label`: `Research Interests`, `Role & Expertise`
- `project_status`: `Current`, `Archived`, `Planned`

### Sort order rules

- Must be a positive whole number.
- Should be unique within each sheet.
- Recommended pattern: `10, 20, 30, 40`.

### Email rules

- Must contain exactly one `@`.
- Must not contain spaces.
- Should use institutional email addresses where possible.

### Image path / image URL rules

Choose one rule set and enforce it consistently later:

1. Local asset rule:
   - Value must begin with `img/`
   - Value should end with `.jpg`, `.jpeg`, `.png`, or `.webp`
2. Public URL rule:
   - Value must begin with `https://`
   - Value must point to a publicly accessible image file

If both local assets and public URLs may be used later, document that clearly in the sheet instructions and use a separate column like `image_source_type`.

### Active / inactive flags

- `Yes` means eligible to publish.
- `No` means keep the row for records/history but omit it from future output.
- Do not delete old rows unless there is a retention policy requiring deletion.

### Duplicate prevention

Check for duplicates in:

- `record_id`
- Faculty `email`
- Exact combination of `name` plus `title` for faculty
- Exact `title` plus `pi_name` for projects when duplicate project names would be confusing

## Recommended Conventions

### Naming conventions

- `record_id` should use lowercase letters, numbers, and underscores only.
- Avoid spaces and punctuation in `record_id`.
- Example: `faculty_kia_proctor`, `project_rna_packaging_gene_expression`

### Blank values

- Blank is better than filler text for optional fields.
- If a section should not render later, leave its related optional columns empty.

### Tag conventions

- Prefer title case for all tags.
- Reuse existing terms rather than inventing near-duplicates.
- Maintain an approved tag list in the `lists` sheet if the tag library grows.

## Minimum Viable Spreadsheet Setup

If the team wants the simplest possible starting point, create these four tabs first:

1. `faculty`
2. `research_areas`
3. `research_projects`
4. `research_infrastructure`

Then add `lists` once the team begins using dropdowns or needs stricter validation.

## Summary

This schema keeps the content model close to the current website structure:

- `faculty` maps to the repeated faculty cards
- `research_areas` maps to the research focus cards
- `research_projects` maps to the featured project cards
- `research_infrastructure` maps to the infrastructure/resource cards

It is intentionally conservative so the team can organize content in spreadsheets now without committing to a framework migration, a runtime approach, or visible website changes.
