# Google Sheets Sync Setup

## How The Automation Works

This project can now pull content directly from a private Google Sheet using a service account and a fixed spreadsheet ID.

The GitHub Actions workflow:

- reads the GitHub secret `GOOGLE_SERVICE_ACCOUNT`
- reads the GitHub secret `GOOGLE_SHEET_ID`
- authenticates to Google Sheets
- opens the spreadsheet by ID with `open_by_key(...)`
- exports the worksheets:
  - `faculty`
  - `research`
  - `publications`
- writes CSV files to:
  - `docs/data/faculty.csv`
  - `docs/data/research.csv`
  - `docs/data/publications.csv`
- commits and pushes updated CSV files only when changes exist

## How To Update Data

Edit the Google Sheet only.

You do not need to run local export scripts for the GitHub-based sync workflow. Once the sheet is updated, the workflow can refresh the CSV files automatically on:

- push to `main`
- manual run from GitHub Actions
- scheduled hourly sync

## Required GitHub Secret

Add this repository secret:

- `GOOGLE_SERVICE_ACCOUNT`
- `GOOGLE_SHEET_ID`

`GOOGLE_SERVICE_ACCOUNT` must be the full JSON for the service account key.

`GOOGLE_SHEET_ID` must be the spreadsheet ID for the Google Sheet.

The workflow passes both secrets into the Python exporter as environment variables.

## Why Spreadsheet ID Is Used

Spreadsheet ID is used instead of spreadsheet name because it is more reliable:

- spreadsheet names can be changed
- names can be duplicated
- ID-based lookup directly targets the intended document

## Sheet Requirements

The spreadsheet referenced by `GOOGLE_SHEET_ID` must contain these worksheet tabs exactly:

- `faculty`
- `research`
- `publications`

Headers should remain stable because the site expects the exported CSV headers in the same order as the worksheet header row.

## Troubleshooting

If sync fails, check:

- the service account has been shared on the Google Sheet with at least view access
- the GitHub secret `GOOGLE_SERVICE_ACCOUNT` contains valid JSON
- the GitHub secret `GOOGLE_SHEET_ID` contains the correct spreadsheet ID
- the worksheet tabs still exist and are named exactly:
  - `faculty`
  - `research`
  - `publications`
- the workflow logs for authentication or worksheet lookup errors

If the workflow runs but no commit is created:

- there may be no actual CSV changes
- the sheet data may already match the committed CSV files

## Notes

- No frontend code changes are required for this sync flow.
- The output file paths remain unchanged.
- The workflow updates only the generated CSV files under `docs/data/`.
