#!/opt/homebrew/bin/python3
import csv
import os
import sys
import tempfile
import zipfile
from xml.etree import ElementTree as ET


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORKBOOK_PATH = os.path.join(ROOT, "workbook", "rcmi_content.xlsx")
TARGETS = {
    "faculty": os.path.join(ROOT, "docs", "data", "faculty.csv"),
    "research": os.path.join(ROOT, "docs", "data", "research.csv"),
    "publications": os.path.join(ROOT, "docs", "data", "publications.csv"),
}
NS = {
    "m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "pr": "http://schemas.openxmlformats.org/package/2006/relationships",
}


def fail(message):
    print(f"Error: {message}", file=sys.stderr)
    raise SystemExit(1)


def get_cell_value(cell):
    inline = cell.find("m:is/m:t", NS)
    if inline is not None:
        return inline.text or ""
    value = cell.find("m:v", NS)
    if value is not None:
        return value.text or ""
    return ""


def cell_column_index(ref):
    letters = "".join(char for char in ref if char.isalpha())
    index = 0
    for char in letters:
        index = index * 26 + (ord(char.upper()) - 64)
    return index


def rows_from_sheet(xml_bytes):
    root = ET.fromstring(xml_bytes)
    sheet_data = root.find("m:sheetData", NS)
    rows = []

    if sheet_data is None:
        return rows

    for row in sheet_data.findall("m:row", NS):
        values = []
        current_col = 1
        for cell in row.findall("m:c", NS):
            ref = cell.attrib.get("r", "")
            col_idx = cell_column_index(ref) if ref else current_col
            while current_col < col_idx:
                values.append("")
                current_col += 1
            values.append(get_cell_value(cell))
            current_col += 1
        rows.append(values)

    return rows


def workbook_sheet_map(workbook_zip):
    workbook = ET.fromstring(workbook_zip.read("xl/workbook.xml"))
    rels = ET.fromstring(workbook_zip.read("xl/_rels/workbook.xml.rels"))
    rel_map = {}

    for rel in rels.findall("pr:Relationship", NS):
        rel_map[rel.attrib["Id"]] = "xl/" + rel.attrib["Target"]

    sheet_map = {}
    sheets = workbook.find("m:sheets", NS)
    if sheets is None:
        fail("Workbook is missing sheet definitions.")

    for sheet in sheets.findall("m:sheet", NS):
        rel_id = sheet.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id")
        if rel_id in rel_map:
            sheet_map[sheet.attrib["name"]] = rel_map[rel_id]

    return sheet_map


def normalize_rows(rows):
    if not rows:
        return rows
    width = len(rows[0])
    normalized = [rows[0]]
    for row in rows[1:]:
        trimmed = row[:width]
        if len(trimmed) < width:
            trimmed = trimmed + [""] * (width - len(trimmed))
        normalized.append(trimmed)
    return normalized


def write_csv_atomic(path, rows):
    directory = os.path.dirname(path)
    os.makedirs(directory, exist_ok=True)
    fd, temp_path = tempfile.mkstemp(prefix=".tmp_", suffix=".csv", dir=directory)
    os.close(fd)
    try:
        with open(temp_path, "w", newline="", encoding="utf-8") as handle:
            writer = csv.writer(handle)
            writer.writerows(rows)
        os.replace(temp_path, path)
    finally:
        if os.path.exists(temp_path):
            os.unlink(temp_path)


def export():
    if not os.path.exists(WORKBOOK_PATH):
        fail(f"Workbook file is missing: {WORKBOOK_PATH}")

    try:
        with zipfile.ZipFile(WORKBOOK_PATH) as workbook_zip:
            sheet_map = workbook_sheet_map(workbook_zip)
            missing_sheets = [name for name in TARGETS if name not in sheet_map]
            if missing_sheets:
                fail("Workbook is missing required sheets: " + ", ".join(missing_sheets))

            summaries = []
            for sheet_name, target_path in TARGETS.items():
                rows = rows_from_sheet(workbook_zip.read(sheet_map[sheet_name]))
                if not rows:
                    fail(f"Sheet '{sheet_name}' is empty in workbook: {WORKBOOK_PATH}")
                normalized = normalize_rows(rows)
                write_csv_atomic(target_path, normalized)
                summaries.append((sheet_name, target_path, max(len(normalized) - 1, 0)))
    except zipfile.BadZipFile:
        fail(f"Workbook is not a valid .xlsx file: {WORKBOOK_PATH}")

    print("Regenerated CSV files from workbook:")
    for sheet_name, target_path, row_count in summaries:
        rel_path = os.path.relpath(target_path, ROOT)
        print(f"- {sheet_name} -> {rel_path} ({row_count} data rows)")


if __name__ == "__main__":
    export()
