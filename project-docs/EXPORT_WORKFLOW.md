# Export Workflow

## Purpose

This workflow makes the Excel workbook the local editable source of truth for the generated site data files.

Source of truth:

- [rcmi_content.xlsx](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/workbook/rcmi_content.xlsx)

Exporter script:

- [export_workbook_to_csv.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/export_workbook_to_csv.py)

Watcher script:

- [watch_workbook_and_export.py](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/scripts/watch_workbook_and_export.py)

## What The Script Does

The export script:

- reads `workbook/rcmi_content.xlsx`
- verifies that the required workbook sheets exist
- exports the workbook sheets to generated CSV files
- preserves the workbook header row exactly as stored in the workbook
- overwrites the target CSV files safely
- prints a short console summary of the regenerated files

## Generated CSV Files

The script exports these workbook sheets:

- `faculty` -> [faculty.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/faculty.csv)
- `research` -> [research.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/research.csv)
- `publications` -> [publications.csv](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/data/publications.csv)

The workbook sheet `LOOKUPS` is not exported to the runtime CSV files.

The workbook sheet `START_HERE` is instructions only and is not exported to runtime CSV files.

## How To Run It

From the project root:

```bash
make export-data
```

Direct script option:

```bash
python3 scripts/export_workbook_to_csv.py
```

## Watch Mode

To start automatic export when the workbook changes:

```bash
make watch-data
```

Direct script option:

```bash
python3 scripts/watch_workbook_and_export.py
```

To stop the watcher:

- press `Ctrl+C` in the terminal where it is running

Expected watcher behavior:

- monitors `workbook/rcmi_content.xlsx`
- waits briefly for file-save activity to settle
- prints messages such as:
  - `workbook changed`
  - `exporting sheets`
  - `export complete`
  - `export failed`
- regenerates:
  - `data/faculty.csv`
  - `data/research.csv`
  - `data/publications.csv`

Expected console output looks like:

```text
Regenerated CSV files from workbook:
- faculty -> data/faculty.csv (...)
- research -> data/research.csv (...)
- publications -> data/publications.csv (...)
```

## Expected Workbook Structure

The script expects the workbook to contain these exact sheets:

- `START_HERE`
- `faculty`
- `research`
- `publications`
- `LOOKUPS`

The exported runtime sheets are:

- `faculty`
- `research`
- `publications`

This structure is defined by:

- [WORKBOOK_CONTRACT.md](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/docs/WORKBOOK_CONTRACT.md)

## Failure Behavior

The script fails with a clear error if:

- the workbook file is missing
- the workbook is not a valid `.xlsx` file
- a required sheet is missing
- an exported sheet is empty

## Notes

- The exporter does not rename headers.
- The exporter does not depend on spreadsheet column order beyond the workbook’s actual stored header row.
- The exporter is intended to keep the generated CSV files in sync with the workbook while preserving the established workbook contract.
- The watcher uses simple polling and does not require extra dependencies.
