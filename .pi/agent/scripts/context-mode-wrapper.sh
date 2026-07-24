#!/bin/bash
# context-mode wrapper for Pi MCP server.
# Fixes two problems:
# 1) Pi does not expand shell expressions in settings.json env blocks.
# 2) Launcher exports are not forwarded into the MCP stdio child.
# This wrapper sets lightweight + per-project context-mode defaults at runtime.

set -euo pipefail

# Resolve project root without relying on shell globals.
if [[ -d "${PWD}/.pi" ]]; then
  export CONTEXT_MODE_DATA_DIR="${PWD}/.pi/context-mode"
fi

export CONTEXT_MODE_SEARCH_WINDOW_MS="${CONTEXT_MODE_SEARCH_WINDOW_MS:-120000}"
export CONTEXT_MODE_SEARCH_MAX_RESULTS_AFTER="${CONTEXT_MODE_SEARCH_MAX_RESULTS_AFTER:-2}"
export CONTEXT_MODE_SEARCH_BLOCK_AFTER="${CONTEXT_MODE_SEARCH_BLOCK_AFTER:-6}"
export CONTEXT_MODE_BRIDGE_IDLE_MS="${CONTEXT_MODE_BRIDGE_IDLE_MS:-120000}"

exec context-mode "$@"
