.PHONY: export-data watch-data

export-data:
	python3 scripts/export_workbook_to_csv.py

watch-data:
	python3 scripts/watch_workbook_and_export.py
