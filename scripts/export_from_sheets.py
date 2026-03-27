#!/usr/bin/env python3
import json
import os
import sys
from pathlib import Path

import gspread
import pandas as pd
from google.oauth2.service_account import Credentials


ROOT = Path(__file__).resolve().parent.parent
SHEET_NAME = "rcmi_content"
WORKSHEETS = {
    "faculty": ROOT / "docs" / "data" / "faculty.csv",
    "research": ROOT / "docs" / "data" / "research.csv",
    "publications": ROOT / "docs" / "data" / "publications.csv",
}
SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]


def fail(message):
    print(f"Error: {message}", file=sys.stderr)
    raise SystemExit(1)


def credentials_from_env():
    raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT")
    if not raw:
        fail("GOOGLE_SERVICE_ACCOUNT is not set.")

    try:
        service_account_info = json.loads(os.environ["GOOGLE_SERVICE_ACCOUNT"])
    except json.JSONDecodeError as exc:
        fail(f"GOOGLE_SERVICE_ACCOUNT is not valid JSON: {exc}")

    return Credentials.from_service_account_info(service_account_info, scopes=SCOPES)


def worksheet_to_dataframe(worksheet):
    values = worksheet.get_all_values()
    if not values:
        fail(f"Worksheet '{worksheet.title}' is empty.")

    headers = values[0]
    if not any(str(header).strip() for header in headers):
        fail(f"Worksheet '{worksheet.title}' is missing a header row.")

    rows = values[1:]
    normalized_rows = []
    width = len(headers)

    for row in rows:
        if len(row) < width:
            row = row + [""] * (width - len(row))
        elif len(row) > width:
            row = row[:width]
        normalized_rows.append(row)

    dataframe = pd.DataFrame(normalized_rows, columns=headers)
    return dataframe.fillna("")


def export():
    credentials = credentials_from_env()
    client = gspread.authorize(credentials)

    try:
        workbook = client.open(SHEET_NAME)
    except Exception as exc:
        fail(f"Unable to open Google Sheet '{SHEET_NAME}': {exc}")

    summaries = []

    for worksheet_name, output_path in WORKSHEETS.items():
        try:
            worksheet = workbook.worksheet(worksheet_name)
        except gspread.WorksheetNotFound:
            fail(f"Worksheet '{worksheet_name}' was not found in Google Sheet '{SHEET_NAME}'.")

        dataframe = worksheet_to_dataframe(worksheet)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        dataframe.to_csv(output_path, index=False)
        summaries.append((worksheet_name, output_path.relative_to(ROOT), len(dataframe.index)))

    print("Exported Google Sheets data to CSV:")
    for worksheet_name, output_path, row_count in summaries:
        print(f"- {worksheet_name} -> {output_path} ({row_count} data rows)")


if __name__ == "__main__":
    export()
