#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT="$SCRIPT_DIR/pi-update-preflight.sh"

fail() {
  echo "FAIL: $*" >&2
  exit 1
}

assert_contains() {
  local file="$1"
  local needle="$2"
  if ! grep -Fq -- "$needle" "$file"; then
    echo "--- $file ---" >&2
    cat "$file" >&2
    fail "expected output to contain: $needle"
  fi
}

assert_not_contains() {
  local file="$1"
  local needle="$2"
  if grep -Fq -- "$needle" "$file"; then
    echo "--- $file ---" >&2
    cat "$file" >&2
    fail "expected output not to contain: $needle"
  fi
}

assert_file() {
  [[ -f "$1" ]] || fail "expected file: $1"
}

assert_dir() {
  [[ -d "$1" ]] || fail "expected directory: $1"
}

make_fixture() {
  local root="$1"
  mkdir -p \
    "$root/home/.pi/agent/extensions" \
    "$root/home/.pi/agent/skills/strix" \
    "$root/home/.pi/agent/patches" \
    "$root/home/.pi/bin" \
    "$root/home/.agents/skills/creative-diversification" \
    "$root/home/.ai-shared/skills-2/skills/marketing-strategist" \
    "$root/home/.squirrel" \
    "$root/home/.strix/bin" \
    "$root/home/.local/bin" \
    "$root/zed"

  cat > "$root/home/.pi/agent/settings.json" <<'JSON'
{
  "packages": ["npm:context-mode", "npm:pi-zai-tools"],
  "skills": ["!*", "+creative-diversification", "-strix"],
  "defaultProvider": "deepseek",
  "defaultModel": "deepseek-v4-pro"
}
JSON

  cat > "$root/home/.pi/agent/models.json" <<'JSON'
{
  "providers": {
    "deepseek": {
      "compat": {
        "reasoningEffortMap": { "medium": "high", "xhigh": "max" }
      },
      "models": [{ "id": "deepseek-v4-pro", "reasoning": true }]
    },
    "zai": { "models": [{ "id": "glm-4.6" }] }
  }
}
JSON

  printf 'extension' > "$root/home/.pi/agent/extensions/provider-manager.ts"
  printf 'patch' > "$root/home/.pi/agent/patches/fix-skill-filter.sh"
  printf 'shim' > "$root/home/.pi/bin/pi"
  printf 'skill' > "$root/home/.pi/agent/skills/strix/SKILL.md"
  printf 'skill' > "$root/home/.agents/skills/creative-diversification/SKILL.md"
  printf 'squirrel' > "$root/home/.local/bin/squirrel"
  printf 'strix' > "$root/home/.strix/bin/strix"
  cat > "$root/zed/settings.json" <<'JSON'
{"agent_servers":{"pi-acp":{"type":"registry"}}}
JSON
}

test_dry_run_reports_risks_without_creating_backup() {
  local tmp out backup_root
  tmp="$(mktemp -d)"
  make_fixture "$tmp"
  out="$tmp/out.txt"
  backup_root="$tmp/backups"

  PI_PREFLIGHT_HOME="$tmp/home" \
  PI_PREFLIGHT_ZED_SETTINGS="$tmp/zed/settings.json" \
  PI_PREFLIGHT_BACKUP_ROOT="$backup_root" \
  PI_PREFLIGHT_TIMESTAMP="20260102-030405" \
    "$SCRIPT" --dry-run > "$out"

  assert_contains "$out" "Mode: dry-run"
  assert_contains "$out" "Would create backup"
  assert_contains "$out" "reasoningEffortMap occurrences: 1"
  assert_contains "$out" "BREAKING: migrate reasoningEffortMap to thinkingLevelMap"
  assert_contains "$out" "context-mode better-sqlite3 may need rebuild"
  assert_contains "$out" "Zed pi-acp configured"
  assert_not_contains "$out" "Backup created:"

  [[ ! -e "$backup_root/pi-pre-0.72.1-20260102-030405" ]] || fail "dry-run created backup directory"
}

test_backup_copies_critical_state_and_writes_manifest() {
  local tmp out backup_dir
  tmp="$(mktemp -d)"
  make_fixture "$tmp"
  out="$tmp/out.txt"

  PI_PREFLIGHT_HOME="$tmp/home" \
  PI_PREFLIGHT_ZED_SETTINGS="$tmp/zed/settings.json" \
  PI_PREFLIGHT_BACKUP_ROOT="$tmp/backups" \
  PI_PREFLIGHT_TIMESTAMP="20260102-030405" \
    "$SCRIPT" --backup > "$out"

  backup_dir="$tmp/backups/pi-pre-0.72.1-20260102-030405"
  assert_dir "$backup_dir"
  assert_file "$backup_dir/home/.pi/agent/settings.json"
  assert_file "$backup_dir/home/.pi/agent/models.json"
  assert_file "$backup_dir/home/.pi/agent/extensions/provider-manager.ts"
  assert_file "$backup_dir/home/.agents/skills/creative-diversification/SKILL.md"
  assert_file "$backup_dir/home/.local/bin/squirrel"
  assert_file "$backup_dir/zed-settings.json"
  assert_file "$backup_dir/MANIFEST.txt"
  assert_contains "$backup_dir/MANIFEST.txt" "reasoningEffortMap occurrences: 1"
  assert_contains "$out" "Backup created: $backup_dir"
}

test_refuses_backup_when_target_exists() {
  local tmp out backup_dir status
  tmp="$(mktemp -d)"
  make_fixture "$tmp"
  backup_dir="$tmp/backups/pi-pre-0.72.1-20260102-030405"
  mkdir -p "$backup_dir"
  out="$tmp/out.txt"

  set +e
  PI_PREFLIGHT_HOME="$tmp/home" \
  PI_PREFLIGHT_ZED_SETTINGS="$tmp/zed/settings.json" \
  PI_PREFLIGHT_BACKUP_ROOT="$tmp/backups" \
  PI_PREFLIGHT_TIMESTAMP="20260102-030405" \
    "$SCRIPT" --backup > "$out" 2>&1
  status=$?
  set -e

  [[ "$status" -ne 0 ]] || fail "expected backup to fail when target exists"
  assert_contains "$out" "Refusing to overwrite existing backup"
}

test_dry_run_handles_missing_optional_paths() {
  local tmp out
  tmp="$(mktemp -d)"
  mkdir -p "$tmp/home/.pi/agent"
  printf '{}' > "$tmp/home/.pi/agent/settings.json"
  out="$tmp/out.txt"

  PI_PREFLIGHT_HOME="$tmp/home" \
  PI_PREFLIGHT_ZED_SETTINGS="$tmp/missing-zed.json" \
  PI_PREFLIGHT_BACKUP_ROOT="$tmp/backups" \
  PI_PREFLIGHT_TIMESTAMP="20260102-030405" \
    "$SCRIPT" --dry-run > "$out"

  assert_contains "$out" "WARN missing"
  assert_contains "$out" "Mode: dry-run"
}

run_test() {
  local name="$1"
  echo "RUN $name"
  "$name"
  echo "PASS $name"
}

run_test test_dry_run_reports_risks_without_creating_backup
run_test test_backup_copies_critical_state_and_writes_manifest
run_test test_refuses_backup_when_target_exists
run_test test_dry_run_handles_missing_optional_paths

echo "All tests passed"
