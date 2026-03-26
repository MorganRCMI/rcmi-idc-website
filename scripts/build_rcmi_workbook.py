#!/opt/homebrew/bin/python3
import csv
import datetime as dt
import html
import os
import zipfile
from xml.sax.saxutils import escape


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORKBOOK_DIR = os.path.join(ROOT, "workbook")
OUTPUT = os.path.join(WORKBOOK_DIR, "rcmi_content.xlsx")


def read_csv(path):
    with open(path, newline="", encoding="utf-8") as handle:
        rows = list(csv.reader(handle))
    if not rows:
        return rows
    width = len(rows[0])
    normalized = [rows[0]]
    for row in rows[1:]:
        if len(row) < width:
            row = row + [""] * (width - len(row))
        elif len(row) > width:
            row = row[:width]
        normalized.append(row)
    return normalized


def start_here_rows():
    return [
        ["Section", "Instruction"],
        ["Purpose", "This workbook controls website content for faculty, research, publications, and lookup values."],
        ["Tab: START_HERE", "Instructions only. Use this tab to understand the workbook before editing any content tabs."],
        ["Tab: faculty", "One row per faculty or staff profile. Edit profile text, tags, education, and contact details here."],
        ["Tab: research", "One row per research area, project, or infrastructure item. Use Row Type to identify the kind of record."],
        ["Tab: publications", "One row per publication. Link each publication to a research project using Project ID."],
        ["Tab: LOOKUPS", "Stores dropdown values. Most users should not edit this tab."],
        ["Edit These Fields", "Edit normal content fields such as names, titles, summaries, descriptions, tags, links, and Is Active values."],
        ["Do Not Edit", "Do not rename tabs, do not rename headers, and do not change ID fields such as Faculty ID, Project ID, or Publication ID unless you are managing the workbook structure."],
        ["Do Not Delete Rows", "Do not delete rows to remove content from the website. Keep the record and change Is Active to No instead."],
        ["Visibility", "Use Is Active to hide content without deleting it. If a future Publish Status field is introduced, use that control instead of deleting rows."],
        ["Dropdowns", "Use dropdown lists where provided. Do not type alternate values when a dropdown is available."],
        ["Project Links", "Publications.Project ID must match an existing research.Project ID. Do not change Project ID values casually after records are linked."],
        ["Sorting", "Sort the full sheet range if needed. Do not sort a single column by itself."],
        ["Help", "If you need structural changes, update WORKBOOK_CONTRACT.md first so the workbook and parser stay aligned."],
    ]


def xml_attr(value):
    return escape(str(value), {'"': "&quot;"})


def inline_string_cell(ref, value, style_id):
    safe = escape("" if value is None else str(value))
    return f'<c r="{ref}" t="inlineStr" s="{style_id}"><is><t xml:space="preserve">{safe}</t></is></c>'


def number_cell(ref, value, style_id):
    return f'<c r="{ref}" s="{style_id}"><v>{value}</v></c>'


def col_letter(index):
    letters = ""
    while index > 0:
        index, remainder = divmod(index - 1, 26)
        letters = chr(65 + remainder) + letters
    return letters


def cell_ref(row_idx, col_idx):
    return f"{col_letter(col_idx)}{row_idx}"


def is_number(value):
    if value is None:
        return False
    text = str(value).strip()
    if text == "":
        return False
    try:
        int(text)
        return True
    except ValueError:
        return False


def sheet_xml(rows, widths=None, freeze_top_row=False, wrap_cols=None):
    widths = widths or {}
    wrap_cols = set(wrap_cols or [])
    max_row = len(rows) if rows else 1
    max_col = max((len(row) for row in rows), default=1)
    dimension = f"A1:{cell_ref(max_row, max_col)}"

    cols_xml = ""
    if widths:
        col_parts = []
        for idx in range(1, max_col + 1):
            width = widths.get(idx)
            if width:
                col_parts.append(f'<col min="{idx}" max="{idx}" width="{width}" customWidth="1"/>')
        if col_parts:
            cols_xml = "<cols>" + "".join(col_parts) + "</cols>"

    sheet_view = '<sheetViews><sheetView workbookViewId="0"/>'
    if freeze_top_row:
        sheet_view = (
            '<sheetViews><sheetView workbookViewId="0">'
            '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>'
            '<selection pane="bottomLeft" activeCell="A2" sqref="A2"/>'
            "</sheetView>"
        )
    sheet_view += "</sheetViews>"

    row_parts = []
    for r_idx, row in enumerate(rows, start=1):
        cell_parts = []
        for c_idx in range(1, max_col + 1):
            value = row[c_idx - 1] if c_idx - 1 < len(row) else ""
            style_id = 0
            if r_idx == 1:
                style_id = 1
            elif c_idx in wrap_cols:
                style_id = 2
            ref = cell_ref(r_idx, c_idx)
            if is_number(value) and r_idx != 1:
                cell_parts.append(number_cell(ref, int(str(value).strip()), style_id))
            else:
                cell_parts.append(inline_string_cell(ref, value, style_id))
        row_parts.append(f'<row r="{r_idx}">{"".join(cell_parts)}</row>')

    sheet_data = "<sheetData>" + "".join(row_parts) + "</sheetData>"
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f"<dimension ref=\"{dimension}\"/>"
        f"{sheet_view}"
        f"{cols_xml}"
        f"{sheet_data}"
        "</worksheet>"
    )


def workbook_xml(sheet_names):
    sheets = []
    for idx, name in enumerate(sheet_names, start=1):
        sheets.append(
            f'<sheet name="{xml_attr(name)}" sheetId="{idx}" r:id="rId{idx}"/>'
        )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        "<bookViews><workbookView xWindow=\"0\" yWindow=\"0\" windowWidth=\"28800\" windowHeight=\"17400\"/></bookViews>"
        f"<sheets>{''.join(sheets)}</sheets>"
        "</workbook>"
    )


def workbook_rels(sheet_count):
    rels = []
    for idx in range(1, sheet_count + 1):
        rels.append(
            f'<Relationship Id="rId{idx}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{idx}.xml"/>'
        )
    rels.append(
        f'<Relationship Id="rId{sheet_count + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        f"{''.join(rels)}"
        "</Relationships>"
    )


def root_rels():
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>'
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>'
        "</Relationships>"
    )


def content_types(sheet_count):
    overrides = [
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>',
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>',
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>',
        '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>',
    ]
    for idx in range(1, sheet_count + 1):
        overrides.append(
            f'<Override PartName="/xl/worksheets/sheet{idx}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        f"{''.join(overrides)}"
        "</Types>"
    )


def styles_xml():
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<fonts count="2">'
        '<font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/></font>'
        '<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/></font>'
        '</fonts>'
        '<fills count="3">'
        '<fill><patternFill patternType="none"/></fill>'
        '<fill><patternFill patternType="gray125"/></fill>'
        '<fill><patternFill patternType="solid"><fgColor rgb="FF1F4E79"/><bgColor indexed="64"/></patternFill></fill>'
        '</fills>'
        '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        '<cellXfs count="3">'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
        '<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"><alignment horizontal="center" vertical="center"/></xf>'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>'
        '</cellXfs>'
        '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
        '</styleSheet>'
    )


def core_xml():
    created = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:dcterms="http://purl.org/dc/terms/" '
        'xmlns:dcmitype="http://purl.org/dc/dcmitype/" '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        '<dc:title>RCMI Content Workbook</dc:title>'
        '<dc:creator>OpenAI Codex</dc:creator>'
        '<cp:lastModifiedBy>OpenAI Codex</cp:lastModifiedBy>'
        f'<dcterms:created xsi:type="dcterms:W3CDTF">{created}</dcterms:created>'
        f'<dcterms:modified xsi:type="dcterms:W3CDTF">{created}</dcterms:modified>'
        '</cp:coreProperties>'
    )


def app_xml(sheet_names):
    titles = "".join(f"<vt:lpstr>{escape(name)}</vt:lpstr>" for name in sheet_names)
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">'
        '<Application>Microsoft Excel</Application>'
        '<DocSecurity>0</DocSecurity>'
        '<ScaleCrop>false</ScaleCrop>'
        f'<HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>{len(sheet_names)}</vt:i4></vt:variant></vt:vector></HeadingPairs>'
        f'<TitlesOfParts><vt:vector size="{len(sheet_names)}" baseType="lpstr">{titles}</vt:vector></TitlesOfParts>'
        '<Company></Company>'
        '<LinksUpToDate>false</LinksUpToDate>'
        '<SharedDoc>false</SharedDoc>'
        '<HyperlinksChanged>false</HyperlinksChanged>'
        '<AppVersion>16.0300</AppVersion>'
        '</Properties>'
    )


def build_workbook():
    faculty = read_csv(os.path.join(WORKBOOK_DIR, "faculty_template.csv"))
    research = read_csv(os.path.join(WORKBOOK_DIR, "research_template.csv"))
    publications = read_csv(os.path.join(WORKBOOK_DIR, "publications_template.csv"))
    lookups = read_csv(os.path.join(WORKBOOK_DIR, "lookups_template.csv"))
    start_here = start_here_rows()

    sheet_names = ["START_HERE", "faculty", "research", "publications", "LOOKUPS"]
    sheets = [
        sheet_xml(start_here, widths={1: 24, 2: 120}, freeze_top_row=False, wrap_cols={2}),
        sheet_xml(
            faculty,
            widths={1: 28, 2: 12, 3: 12, 4: 28, 5: 24, 6: 28, 7: 28, 8: 20, 9: 60, 10: 30, 11: 14, 12: 28, 13: 28, 14: 28, 15: 28, 16: 18, 17: 18, 18: 18, 19: 18, 20: 18, 21: 18, 22: 22, 23: 48, 24: 20, 25: 18, 26: 26, 27: 28, 28: 28},
            freeze_top_row=True,
            wrap_cols={9, 23, 28},
        ),
        sheet_xml(
            research,
            widths={1: 18, 2: 34, 3: 12, 4: 12, 5: 34, 6: 55, 7: 12, 8: 24, 9: 24, 10: 24, 11: 24, 12: 24, 13: 24, 14: 24, 15: 22, 16: 70, 17: 18, 18: 18, 19: 18, 20: 18, 21: 18, 22: 32, 23: 20, 24: 18, 25: 16, 26: 16, 27: 26, 28: 28, 29: 40, 30: 28},
            freeze_top_row=True,
            wrap_cols={6, 16, 30},
        ),
        sheet_xml(
            publications,
            widths={1: 34, 2: 30, 3: 12, 4: 12, 5: 44, 6: 40, 7: 24, 8: 12, 9: 22, 10: 20, 11: 28, 12: 70, 13: 22, 14: 65, 15: 18, 16: 40, 17: 28, 18: 28},
            freeze_top_row=True,
            wrap_cols={5, 6, 12, 14, 18},
        ),
        sheet_xml(lookups, widths={1: 24, 2: 28, 3: 12}, freeze_top_row=True, wrap_cols=set()),
    ]

    os.makedirs(WORKBOOK_DIR, exist_ok=True)

    with zipfile.ZipFile(OUTPUT, "w", compression=zipfile.ZIP_DEFLATED) as xlsx:
        xlsx.writestr("[Content_Types].xml", content_types(len(sheet_names)))
        xlsx.writestr("_rels/.rels", root_rels())
        xlsx.writestr("docProps/core.xml", core_xml())
        xlsx.writestr("docProps/app.xml", app_xml(sheet_names))
        xlsx.writestr("xl/workbook.xml", workbook_xml(sheet_names))
        xlsx.writestr("xl/_rels/workbook.xml.rels", workbook_rels(len(sheet_names)))
        xlsx.writestr("xl/styles.xml", styles_xml())
        for idx, sheet in enumerate(sheets, start=1):
            xlsx.writestr(f"xl/worksheets/sheet{idx}.xml", sheet)


if __name__ == "__main__":
    build_workbook()
    print(OUTPUT)
