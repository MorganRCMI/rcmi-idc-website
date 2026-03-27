# Google Sheets Sync Setup

## How The Automation Works

This project can now pull content directly from a private Google Sheet named `rcmi_content` using a service account.

The GitHub Actions workflow:

- reads the GitHub secret `GOOGLE_SERVICE_ACCOUNT`
- authenticates to Google Sheets
- opens the workbook `rcmi_content`
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

Its value must be the full JSON for the service account key. The workflow passes that secret into the Python exporter as an environment variable.

## Sheet Requirements

The Google Sheet name must be:

- `rcmi_content`

It must contain these worksheet tabs exactly:

- `faculty`
- `research`
- `publications`

Headers should remain stable because the site expects the exported CSV headers in the same order as the worksheet header row.

## Troubleshooting

If sync fails, check:

- the service account has been shared on the Google Sheet with at least view access
- the GitHub secret `GOOGLE_SERVICE_ACCOUNT` contains valid JSON
- the Google Sheet is still named `rcmi_content`
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
