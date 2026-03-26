# Change Alignment Log

## Runtime Error Fix

### What caused the error

The research and publications sandbox pages expected a shared helper API at a global namespace, but the helper layer had drifted across multiple access patterns and a more brittle bootstrap. The failure surfaced as:

- `helpers.loadDataset is not a function`
- `Sandbox helper API is unavailable. Expected window.rcmiSandboxHelpers.loadDataset().`

This was a shared-helper bootstrap and global-name consistency issue, not a workbook-contract problem and not a CSV/header-mapping problem.

### What was changed

- Standardized the shared sandbox helper API behind:
  - `window.rcmiSandboxHelpers`
- Updated all sandbox pages to read helpers from:
  - `window.rcmiSandboxHelpers`
- Added a clear startup error if the helper API is unavailable or does not expose `loadDataset`
- Rewrote the shared helper bootstrap to attach directly to `window.rcmiSandboxHelpers` using plain browser-compatible JavaScript
- Removed page-side dependency on helper fallback resolution so every page now uses the same helper global
- Removed the legacy helper bridge so the sandbox now has one standard runtime helper namespace
- Added cache-busting query params to shared helper scripts:
  - `FIELD_MAP.js?v=1`
  - `common.js?v=1`

Updated files:

- [common.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/common.js)
- [faculty-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/faculty-prototype.html)
- [research-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/research-prototype.html)
- [publications-prototype.html](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/prototypes/publications-prototype.html)

### Standard helper API

All sandbox pages should now use these helpers from `window.rcmiSandboxHelpers`:

- `loadDataset(datasetKey)`
- `activeSorted(items)`
- `buildPublicationIndex(publications)`
- `warnMissingProjectLinks(projects, publications)`
- `transformFacultyRecords(rows)`
- `transformResearchRecords(rows)`
- `transformPublicationRecords(rows)`
- `renderTagRow(tags, className)`
- `renderFooter(currentPage)`

### Result

The sandbox pages now use one consistent helper global, the shared helper file attaches that API directly to `window`, shared scripts load in a fixed order, and cache-busting is in place for the helper layer.

## Final Stable Structure

- Page script order on all sandbox pages:
  - `FIELD_MAP.js?v=1`
  - `common.js?v=1`
  - page-specific inline script
- Final standard helper global:
  - `window.rcmiSandboxHelpers`
- Standard dataset loading call:
  - `window.rcmiSandboxHelpers.loadDataset(datasetKey)`
- Shared helper file:
  - [common.js](/Users/mind/Desktop/Projects/RCMI_web_prototype_o/rcmi_web/js/common.js)
