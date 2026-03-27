# Export Bug Fix Summary

## Root Cause

The workbook export script was manually parsing the `.xlsx` ZIP/XML structure and reading raw `<v>` cell values without resolving Excel shared strings. For string cells, Excel stores the visible text in a shared string table and writes numeric indexes into the worksheet XML. The exporter was writing those indexes directly into the CSV output, which is why files like `faculty.csv` contained values such as `30,31,32...` instead of the actual workbook text.

## What Was Changed

- Replaced the manual XML-based workbook reader in `scripts/export_workbook_to_csv.py`.
- Switched the export logic to use `openpyxl` with:
  - `read_only=True`
  - `data_only=True`
- Added a local vendored dependency path at `scripts/_vendor` so the script can reliably import `openpyxl` without changing the site runtime.
- Preserved:
  - fixed workbook source path: `workbook/rcmi_content.xlsx`
  - exact sheet names
  - exact worksheet row/header order
  - atomic CSV overwrite behavior

## How The Fix Was Verified

- Regenerated:
  - `docs/data/faculty.csv`
  - `docs/data/research.csv`
  - `docs/data/publications.csv`
- Confirmed the exported CSV headers now contain real visible workbook text instead of numeric shared-string indexes.
- Confirmed the first data rows also contain readable workbook values rather than raw internal IDs.
