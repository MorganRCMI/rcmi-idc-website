# Integration Gaps

The sandbox pages now mirror the live faculty and research pages closely, but some page content is still not sourced from the current CSV/JSON data structure.

## Missing From Current Data Structure

- Page-level navigation labels and URLs
  - The header navigation is still hardcoded in the HTML.
- Footer content and footer links
  - Footer headings, address lines, and link URLs are still generated from hardcoded helper markup.
- Faculty filter labels
  - The current filter names are injected from helper payload logic rather than coming from CSV.
- Research page section labels and section descriptions
  - `Focus Areas`, `Current Work`, `Resources`, and their section descriptions are still hardcoded in the HTML.
- Research CTA content
  - CTA heading, body copy, button text, and button URL are not in `research.csv`.
- Faculty page header copy and research page header copy
  - The current page title/description are supplied by helper payload functions, not by CSV rows.

## Optional Future Columns To Close These Gaps

- `nav_label`
- `nav_url`
- `footer_section`
- `footer_heading`
- `footer_text`
- `footer_link_label`
- `footer_link_url`
- `filter_label`
- `page_title`
- `page_description`
- `section_label`
- `section_title`
- `section_description`
- `cta_heading`
- `cta_text`
- `cta_button_label`
- `cta_button_url`

## Notes

- No production files were changed.
- The current data model is sufficient for the repeated faculty cards, research area cards, project cards, and infrastructure cards.
- The remaining gaps are mostly page chrome and section-level editorial copy.
