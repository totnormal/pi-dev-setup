#!/bin/bash
# Scans all skill locations and outputs a compact catalog.
# Output format: SKILL_NAME\tDESCRIPTION\tPATH
set -euo pipefail
export LC_ALL=C

ACTIVE_SKILLS="$HOME/.claude/skills"
ARCHIVE_SKILLS="$HOME/.claude/skills-archive"

scan_dir() {
  local base="$1"
  local depth="${2:-2}"
  [ -d "$base" ] || return 0
  find -L "$base" -maxdepth "$depth" -name "SKILL.md" 2>/dev/null | while IFS= read -r f; do
    local dir
    dir="$(basename "$(dirname "$f")")"
    local desc
    desc=$(awk '/^description:/{sub(/^description: */,""); print; exit}' "$f" | head -c 150)
    printf '%s\t%s\t%s\n' "$dir" "$desc" "$f"
  done
}

# Active skills (currently loaded)
scan_dir "$ACTIVE_SKILLS" 2

# Archived skills (available on demand)
scan_dir "$ARCHIVE_SKILLS" 2

# Archived standalone files
if [ -d "$ARCHIVE_SKILLS/_files" ]; then
  find -L "$ARCHIVE_SKILLS/_files" -maxdepth 1 -type f \( -name "*.md" ! -name "_*" \) 2>/dev/null | while IFS= read -r f; do
    local name
    name="$(basename "$f" .md)"
    local desc
    desc=$(awk '/^description:/{sub(/^description: */,""); print; exit}' "$f" | head -c 150)
    printf '%s\t%s\t%s\n' "$name" "$desc" "$f"
  done
fi
