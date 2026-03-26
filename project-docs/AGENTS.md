# AGENTS.md

## Project rules
- Do not modify production website files unless explicitly requested.
- Preserve the current website layout and visual design.
- Keep backward compatibility with the current local workflow.
- Treat the Excel workbook as the single source of truth for editable content.
- Never rely on spreadsheet column order. Always map by exact header name.
- If a sheet or column name changes, update the parser and document the change.
- Before editing code, inspect the existing project structure and explain the plan briefly.
- Make minimal changes.
- Do not add dependencies unless explicitly requested.
- When creating or editing spreadsheet parsing logic, keep the Excel template and code in sync.
- If a user-facing spreadsheet becomes more complex, prefer clearer labels and documentation over more columns.
- Never delete existing content handling without creating a compatible replacement.