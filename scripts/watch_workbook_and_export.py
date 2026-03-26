#!/opt/homebrew/bin/python3
import os
import subprocess
import sys
import time


ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORKBOOK_PATH = os.path.join(ROOT, "workbook", "rcmi_content.xlsx")
EXPORT_SCRIPT = os.path.join(ROOT, "scripts", "export_workbook_to_csv.py")
POLL_INTERVAL_SECONDS = 1.0
DEBOUNCE_SECONDS = 1.5


def get_file_signature(path):
    if not os.path.exists(path):
        return None
    stat = os.stat(path)
    return (stat.st_mtime_ns, stat.st_size)


def log(message):
    timestamp = time.strftime("%H:%M:%S")
    print(f"[{timestamp}] {message}", flush=True)


def run_export():
    log("exporting sheets")
    result = subprocess.run(
        [sys.executable, EXPORT_SCRIPT],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )

    if result.returncode == 0:
        if result.stdout.strip():
            print(result.stdout.rstrip(), flush=True)
        log("export complete")
        return True

    if result.stdout.strip():
        print(result.stdout.rstrip(), flush=True)
    if result.stderr.strip():
        print(result.stderr.rstrip(), file=sys.stderr, flush=True)
    log("export failed")
    return False


def watch():
    if not os.path.exists(WORKBOOK_PATH):
        print(f"Error: Workbook file is missing: {WORKBOOK_PATH}", file=sys.stderr)
        raise SystemExit(1)

    if not os.path.exists(EXPORT_SCRIPT):
        print(f"Error: Export script is missing: {EXPORT_SCRIPT}", file=sys.stderr)
        raise SystemExit(1)

    log("watching workbook/rcmi_content.xlsx")
    last_signature = get_file_signature(WORKBOOK_PATH)
    pending_since = None
    pending_signature = None

    try:
        while True:
            current_signature = get_file_signature(WORKBOOK_PATH)

            if current_signature is None:
                log("workbook missing")
                time.sleep(POLL_INTERVAL_SECONDS)
                continue

            if current_signature != last_signature:
                if pending_signature != current_signature:
                    pending_signature = current_signature
                    pending_since = time.time()
                    log("workbook changed")
                elif pending_since is not None and (time.time() - pending_since) >= DEBOUNCE_SECONDS:
                    if run_export():
                        last_signature = current_signature
                    else:
                        last_signature = current_signature
                    pending_since = None
                    pending_signature = None

            time.sleep(POLL_INTERVAL_SECONDS)
    except KeyboardInterrupt:
        log("watcher stopped")


if __name__ == "__main__":
    watch()
