#!/usr/bin/env bash
# pi-acp-multi-session.sh
# Patches pi-acp to allow multiple parallel sessions in the same project.
# Usage:
#   pi-acp-multi-session.sh          # Apply patch
#   pi-acp-multi-session.sh --restore # Revert to original
#
# Safe to re-run after `npm update -g @mariozechner/pi-coding-agent`.

set -euo pipefail

PI_ACP="$(which pi-acp 2>/dev/null || true)"

if [ -z "$PI_ACP" ]; then
  echo "Error: pi-acp not found on PATH" >&2
  exit 1
fi

PI_ACP="$(readlink -f "$PI_ACP" 2>/dev/null || echo "$PI_ACP")"

BACKUP="${PI_ACP}.orig"

if [ "${1:-}" = "--restore" ]; then
  if [ -f "$BACKUP" ]; then
    cp "$BACKUP" "$PI_ACP"
    echo "Restored original pi-acp from backup."
    rm -f "$BACKUP"
  else
    echo "No backup found at $BACKUP — already original?"
  fi
  exit 0
fi

# Check if already patched
if grep -q 'this.sessions.closeAllExcept?.(session.sessionId);' "$PI_ACP" 2>/dev/null; then
  echo "Patching pi-acp at: $PI_ACP"
  # Create backup (only if we don't have one, so updates get a fresh backup)
  cp "$PI_ACP" "$BACKUP"
  # Comment out both closeAllExcept calls
  sed -i '' 's/    this.sessions.closeAllExcept?.(session.sessionId);/    \/\/ this.sessions.closeAllExcept?.(session.sessionId); \/\/ patched by pi-acp-multi-session/' "$PI_ACP"
  echo "Done. Multiple parallel pi-acp sessions now enabled."
  echo "To revert: $(basename "$0") --restore"
else
  echo "Patch already applied or code changed. Checking..."
  if grep -q 'patched by pi-acp-multi-session' "$PI_ACP"; then
    echo "Already patched — nothing to do."
  else
    echo "Warning: Could not find the target line. The pi-acp code may have changed." >&2
    echo "Search for 'closeAllExcept' in $PI_ACP and patch manually." >&2
    exit 1
  fi
fi
