# Data Flow Check

## Result

The prototype pages are reading the CSV files generated from:

- [rcmi_content.xlsx](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/rcmi_content.xlsx)

No path fixes were needed.

## Verified Prototype Page Inputs

### Faculty Page

[faculty-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/faculty-prototype.html) calls:

- `window.rcmiSandboxHelpers.loadDataset("faculty")`

That resolves through [FIELD_MAP.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/FIELD_MAP.js) to:

- `./faculty.csv`

Which is:

- [faculty.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/faculty.csv)

### Research Page

[research-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/research-prototype.html) calls:

- `window.rcmiSandboxHelpers.loadDataset("research")`
- `window.rcmiSandboxHelpers.loadDataset("publications")`

Those resolve through [FIELD_MAP.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/FIELD_MAP.js) to:

- `./research.csv`
- `./publications.csv`

Which are:

- [research.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/research.csv)
- [publications.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/publications.csv)

### Publications Page

[publications-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/publications-prototype.html) calls:

- `window.rcmiSandboxHelpers.loadDataset("research")`
- `window.rcmiSandboxHelpers.loadDataset("publications")`

Those resolve through [FIELD_MAP.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/FIELD_MAP.js) to:

- `./research.csv`
- `./publications.csv`

Which are:

- [research.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/research.csv)
- [publications.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/publications.csv)

## Full Data Flow

The current local data flow is:

1. Edit [rcmi_content.xlsx](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/rcmi_content.xlsx)
2. Run [export_workbook_to_csv.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/export_workbook_to_csv.py)
3. The export script writes:
   - [faculty.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/faculty.csv)
   - [research.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/research.csv)
   - [publications.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/publications.csv)
4. [FIELD_MAP.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/FIELD_MAP.js) maps dataset keys to those CSV file names
5. [common.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/common.js) loads the CSV files by dataset key using `window.rcmiSandboxHelpers.loadDataset(datasetKey)`
6. The prototype pages transform and render those rows

## Key Files In The Flow

- Source workbook:
  - [rcmi_content.xlsx](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/rcmi_content.xlsx)
- Export script:
  - [export_workbook_to_csv.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/export_workbook_to_csv.py)
- Dataset mapping:
  - [FIELD_MAP.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/FIELD_MAP.js)
- Shared loader:
  - [common.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/common.js)
- Prototype pages:
  - [faculty-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/faculty-prototype.html)
  - [research-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/research-prototype.html)
  - [publications-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/publications-prototype.html)

## Conclusion

The prototype pages are currently reading the generated CSV files, and those CSV files are on the workbook export path from `rcmi_content.xlsx`.
