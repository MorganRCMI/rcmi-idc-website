#!/usr/bin/env node
"use strict";

// Cross-platform wrapper: tries `python3` first, falls back to `python` if
// that's not on PATH (common on Windows, where the launcher is usually just
// `python`). Forwards all args and the child's exit code unchanged.

const { spawnSync } = require("child_process");

const args = process.argv.slice(2);

function tryRun(cmd) {
    return spawnSync(cmd, args, { stdio: "inherit" });
}

let result = tryRun("python3");

if (result.error && result.error.code === "ENOENT") {
    result = tryRun("python");
}

if (result.error) {
    console.error('Could not find "python3" or "python" on PATH. Please install Python 3.');
    process.exit(1);
}

process.exit(typeof result.status === "number" ? result.status : 1);
