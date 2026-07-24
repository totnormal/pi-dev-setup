#!/bin/bash
# Generate skill catalog (TSV) from the canonical skills pool.
# Output: name<TAB>description<TAB>path
#
# Only scans ~/.ai-shared/skills-2/skills/ — all skills consolidated here.
# NPM packages, pi-hermes-memory, and other sources are NOT scanned:
# their skills that belong in the catalog have been copied to the canonical pool.

set -e

die() { echo "$@" >&2; exit 1; }
S2="$(cd "$(dirname "$0")/.." && pwd)"
[ -d "$S2" ] || die "S2 not found at $S2"

# Dedup by SKILL frontmatter name using filesystem markers
SEEN_DIR="$(mktemp -d /tmp/skill-catalog-seen.XXXXXX)"
trap 'rm -rf "$SEEN_DIR"' EXIT

extract_yaml_field() {
  local file="$1" field="$2"
  awk -v f="$field" '
    /^---$/ { in_header = 1; next }
    in_header && /^---$/ { in_header = 0; next }
    in_header && $1 == f":" {
      val = substr($0, index($0, ":") + 2)
      gsub(/^[[:space:]]+|"$/, "", val)
      gsub(/^"/, "", val)

      # Handle YAML block scalars (>, |, >-, |-, >+, |+)
      if (val ~ /^[>|][-+]?[0-9]*$/) {
        block_val = ""
        scalar_type = substr(val, 1, 1)
        while (getline next_line > 0) {
          if (next_line ~ /^---$/ || next_line !~ /^[ \t]/) {
            # Block scalar ended
            break
          }
          gsub(/^[ \t]+/, "", next_line)
          if (block_val != "") {
            if (scalar_type == ">") block_val = block_val " " next_line
            else block_val = block_val "\n" next_line
          } else {
            block_val = next_line
          }
        }
        if (block_val != "") {
          gsub(/^"|"$/, "", block_val)
          print block_val
          exit
        }
      }

      # Inline value
      print val
      exit
    }
  ' "$file"
}

scan_dir() {
  local dir="$1"
  [ -d "$dir" ] || return
  while IFS= read -r -d '' skillfile; do
    local skdir
    skdir="$(dirname "$skillfile")"
    local name desc
    name="$(extract_yaml_field "$skillfile" name)"
    desc="$(extract_yaml_field "$skillfile" description)"
    [ -z "$name" ] && name="$(basename "$skdir")"
    [ -z "$desc" ] && desc="Pi skill"
    local marker="$SEEN_DIR/$name"
    [ -f "$marker" ] && continue
    touch "$marker"
    printf "%s\t%s\t%s\n" "$name" "$desc" "$skdir"
  done < <(find -L "$dir" -maxdepth 3 -name 'SKILL.md' -print0 2>/dev/null)
}

# Single source: canonical pool
scan_dir "$S2"
