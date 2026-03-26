# Workbook Verification

## Scope

This verification checks:

- [rcmi_content.xlsx](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/rcmi_content.xlsx)
- against [WORKBOOK_CONTRACT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/WORKBOOK_CONTRACT.md)

## Result

The workbook is now aligned with the contract for:

- sheet names
- header rows
- core relationship keys
- sample `Project ID` links between `research` and `publications`

Status:

- `Aligned after fixes`

## Checks Performed

### 1. Sheet Names

Expected sheet names:

1. `START_HERE`
2. `faculty`
3. `research`
4. `publications`
5. `LOOKUPS`

Verified result:

- all five sheet names match exactly

### 2. Header Rows

Verified workbook headers:

#### `START_HERE`

- `Section`
- `Instruction`

#### `faculty`

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

#### `research`

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

#### `publications`

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

#### `LOOKUPS`

- `List Name`
- `Value`
- `Sort Order`

Verified result:

- all workbook headers now match the contract exactly

### 3. Relationship Checks

#### `publications.Project ID` -> `research.Project ID`

Verified result:

- all sample publication `Project ID` values match existing `research.Project ID` values
- no missing publication-to-project links were found

#### `research.PI Faculty ID` -> `faculty.Faculty ID`

Verified result:

- all sample `PI Faculty ID` values match existing faculty records
- no missing project-to-faculty links were found

## Mismatches Found And Fixed

Two issues were found in the first generated workbook:

### 1. Extra Blank Header Cell In `faculty` And `research`

Cause:

- trailing blank cells were being carried through from source CSV row structure

Fix:

- updated [build_rcmi_workbook.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/build_rcmi_workbook.py) to normalize every data row to the header width
- regenerated [rcmi_content.xlsx](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/rcmi_content.xlsx)

### 2. Misaligned `research` Project Rows

Cause:

- the two project rows in [research_template.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/research_template.csv) were shifted left by one column
- this caused `PI Faculty ID`, `PI Name`, `Department`, and later fields to appear under the wrong headers

Fix:

- corrected the project row commas in [research_template.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/research_template.csv)
- corrected the infrastructure row alignment in [research_template.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/research_template.csv)
- regenerated [rcmi_content.xlsx](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/rcmi_content.xlsx)

## User-Friendliness Check

The workbook still includes the usability improvements previously applied:

- frozen top row on editable sheets
- bold header row
- widened columns
- wrapped long-text columns
- user-friendly labels preserved exactly as defined in the contract

## Conclusion

The generated workbook is now aligned with [WORKBOOK_CONTRACT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/WORKBOOK_CONTRACT.md) for the required structure and sample relationships.
