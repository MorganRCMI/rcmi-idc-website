# GitHub Pages Setup

Use GitHub Pages with the repository root branch and the `/docs` folder as the publishing source.

## Final Setting

- Deploy from branch
- Branch: `main`
- Folder: `/docs`

## Result

With that setting:

- `docs/index.html` is the website entry point
- all live HTML pages are served from `docs/`
- runtime CSV data is served from `docs/data/`
- shared JavaScript is served from `docs/js/`
- shared CSS is served from `docs/styles/`
- images are served from `docs/img/`

## Notes

- `project-docs/` contains repository documentation and is not part of the published site
- `prototypes/`, `scripts/`, `workbook/`, `Makefile`, and `README.md` remain outside the publish root
- the export workflow still uses `workbook/rcmi_content.xlsx` as the single source of truth
