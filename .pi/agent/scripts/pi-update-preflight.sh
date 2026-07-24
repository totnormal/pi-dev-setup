#!/usr/bin/env bash
set -euo pipefail

TARGET_VERSION="0.72.1"
MODE="dry-run"

usage() {
  cat <<USAGE
Usage: $(basename "$0") [--dry-run|--backup]

Safe preflight for updating pi to ${TARGET_VERSION}.

Modes:
  --dry-run   Inspect current setup and report risks. Does not create files.
  --backup    Create a timestamped backup of critical pi/Zed/integration state.

Environment overrides for tests or unusual installs:
  PI_PREFLIGHT_HOME           Home directory to inspect (default: HOME)
  PI_PREFLIGHT_BACKUP_ROOT    Backup parent dir (default: ~/Backups)
  PI_PREFLIGHT_TIMESTAMP      Timestamp override
  PI_PREFLIGHT_ZED_SETTINGS   Zed settings path
USAGE
}

for arg in "$@"; do
  case "$arg" in
    --dry-run) MODE="dry-run" ;;
    --backup) MODE="backup" ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown argument: $arg" >&2; usage >&2; exit 2 ;;
  esac
done

HOME_DIR="${PI_PREFLIGHT_HOME:-$HOME}"
BACKUP_ROOT="${PI_PREFLIGHT_BACKUP_ROOT:-$HOME_DIR/Backups}"
TIMESTAMP="${PI_PREFLIGHT_TIMESTAMP:-$(date +%Y%m%d-%H%M%S)}"
BACKUP_DIR="$BACKUP_ROOT/pi-pre-${TARGET_VERSION}-${TIMESTAMP}"
ZED_SETTINGS="${PI_PREFLIGHT_ZED_SETTINGS:-$HOME_DIR/Library/Application Support/Zed/settings.json}"

PI_DIR="$HOME_DIR/.pi"
PI_AGENT_DIR="$HOME_DIR/.pi/agent"
SETTINGS_JSON="$PI_AGENT_DIR/settings.json"
ROOT_SETTINGS_JSON="$PI_DIR/settings.json"
MODELS_JSON="$PI_AGENT_DIR/models.json"
NPM_GLOBAL="$HOME_DIR/.npm-global/lib/node_modules"
BUN_GLOBAL="$HOME_DIR/.bun/install/global/node_modules"

warnings=()
infos=()

warn() { warnings+=("$*"); }
info() { infos+=("$*"); }
exists_or_warn() {
  local path="$1"
  if [[ -e "$path" ]]; then
    return 0
  fi
  warn "WARN missing: $path"
  return 1
}

count_occurrences() {
  local file="$1" needle="$2"
  if [[ -f "$file" ]]; then
    grep -Foc -- "$needle" "$file" || true
  else
    echo 0
  fi
}

json_summary() {
  local file="$1"
  if [[ -f "$file" ]] && command -v python3 >/dev/null 2>&1; then
    python3 - "$file" <<'PY' 2>/dev/null || true
import json, sys
p=sys.argv[1]
data=json.load(open(p))
if isinstance(data, dict):
    if 'providers' in data:
        print('providers=' + ','.join(sorted(data.get('providers', {}).keys())))
    if 'packages' in data:
        pkgs=data.get('packages') or []
        names=[]
        for item in pkgs:
            names.append(item.get('source') if isinstance(item, dict) else str(item))
        print('packages=' + ','.join(names))
    if 'skills' in data:
        print('skills=' + ','.join(map(str, data.get('skills') or [])))
    if 'defaultProvider' in data or 'defaultModel' in data:
        print(f"default={data.get('defaultProvider')}/{data.get('defaultModel')}")
PY
  fi
}

copy_if_exists() {
  local src="$1" dest="$2"
  if [[ ! -e "$src" ]]; then
    return 0
  fi
  mkdir -p "$(dirname "$dest")"
  cp -a "$src" "$dest"
}

inspect() {
  exists_or_warn "$PI_DIR" >/dev/null || true
  exists_or_warn "$SETTINGS_JSON" >/dev/null || true
  exists_or_warn "$MODELS_JSON" >/dev/null || true
  exists_or_warn "$PI_AGENT_DIR/extensions" >/dev/null || true
  exists_or_warn "$PI_AGENT_DIR/skills" >/dev/null || true
  exists_or_warn "$HOME_DIR/.agents/skills" >/dev/null || true
  exists_or_warn "$PI_AGENT_DIR/patches/fix-skill-filter.sh" >/dev/null || true
  exists_or_warn "$HOME_DIR/.pi/bin/pi" >/dev/null || true
  exists_or_warn "$ZED_SETTINGS" >/dev/null || true

  local rem tlm
  rem="$(count_occurrences "$MODELS_JSON" "reasoningEffortMap")"
  tlm="$(count_occurrences "$MODELS_JSON" "thinkingLevelMap")"
  info "reasoningEffortMap occurrences: $rem"
  info "thinkingLevelMap occurrences: $tlm"
  if [[ "$rem" != "0" ]]; then
    warn "BREAKING: migrate reasoningEffortMap to thinkingLevelMap before/after pi ${TARGET_VERSION}"
  fi

  if [[ -d "$NPM_GLOBAL/context-mode/node_modules/better-sqlite3" || -d "$BUN_GLOBAL/context-mode/node_modules/better-sqlite3" ]] || { [[ -f "$SETTINGS_JSON" ]] && grep -Fq 'context-mode' "$SETTINGS_JSON"; }; then
    warn "context-mode better-sqlite3 may need rebuild after Node/pi runtime changes"
  fi

  if [[ -f "$ZED_SETTINGS" ]] && grep -Fq '"pi-acp"' "$ZED_SETTINGS"; then
    info "Zed pi-acp configured: $ZED_SETTINGS"
  fi

  if [[ -e "$HOME_DIR/.local/bin/squirrel" || -e "$HOME_DIR/.squirrel" ]]; then
    info "squirrel integration present"
  fi
  if [[ -e "$HOME_DIR/.strix" || -e "$PI_AGENT_DIR/skills/strix" ]]; then
    info "strix integration/skill present"
  fi
  if [[ -e "$HOME_DIR/.agents/skills/creative-diversification" || -e "$HOME_DIR/.ai-shared/skills-2/skills/creative-diversification" ]]; then
    info "creative-diversification skill present"
  fi
}

write_manifest() {
  local dest="$1"
  {
    echo "Pi ${TARGET_VERSION} preflight backup"
    echo "Created: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
    echo "Home inspected: $HOME_DIR"
    echo ""
    echo "== Tool versions =="
    command -v node >/dev/null 2>&1 && node -v || true
    command -v npm >/dev/null 2>&1 && npm -v || true
    command -v pi >/dev/null 2>&1 && pi --version 2>/dev/null || true
    echo ""
    echo "== Settings summary =="
    json_summary "$SETTINGS_JSON"
    json_summary "$MODELS_JSON"
    echo ""
    echo "== Findings =="
    for line in "${infos[@]}"; do echo "$line"; done
    for line in "${warnings[@]}"; do echo "$line"; done
    echo ""
    echo "== Global npm packages =="
    if command -v npm >/dev/null 2>&1 && [[ -d "$HOME_DIR/.npm-global" ]]; then
      npm list -g --depth=0 --prefix "$HOME_DIR/.npm-global" 2>/dev/null || true
    fi
  } > "$dest"
}

create_backup() {
  if [[ -e "$BACKUP_DIR" ]]; then
    echo "Refusing to overwrite existing backup: $BACKUP_DIR" >&2
    exit 1
  fi
  mkdir -p "$BACKUP_DIR/home"

  copy_if_exists "$PI_DIR" "$BACKUP_DIR/home/.pi"
  copy_if_exists "$HOME_DIR/.agents" "$BACKUP_DIR/home/.agents"
  copy_if_exists "$HOME_DIR/.ai-shared/skills-2" "$BACKUP_DIR/home/.ai-shared/skills-2"
  copy_if_exists "$HOME_DIR/.squirrel" "$BACKUP_DIR/home/.squirrel"
  copy_if_exists "$HOME_DIR/.strix" "$BACKUP_DIR/home/.strix"
  copy_if_exists "$HOME_DIR/.local/bin/squirrel" "$BACKUP_DIR/home/.local/bin/squirrel"
  copy_if_exists "$ZED_SETTINGS" "$BACKUP_DIR/zed-settings.json"

  # Package trees can be large. Preserve manifests/inventory by default; full package dirs
  # should be backed up separately if desired.
  if command -v npm >/dev/null 2>&1 && [[ -d "$HOME_DIR/.npm-global" ]]; then
    npm list -g --depth=0 --prefix "$HOME_DIR/.npm-global" > "$BACKUP_DIR/npm-global-before.txt" 2>&1 || true
  fi
  if command -v bun >/dev/null 2>&1; then
    bun pm ls -g > "$BACKUP_DIR/bun-global-before.txt" 2>&1 || true
  fi

  write_manifest "$BACKUP_DIR/MANIFEST.txt"
  echo "Backup created: $BACKUP_DIR"
}

inspect

if [[ "$MODE" == "dry-run" ]]; then
  echo "Pi ${TARGET_VERSION} preflight"
  echo "Mode: dry-run"
  echo "Would create backup: $BACKUP_DIR"
  echo ""
  echo "Findings:"
  for line in "${infos[@]}"; do echo "- $line"; done
  for line in "${warnings[@]}"; do echo "- $line"; done
  echo ""
  echo "No files changed. Next safe step: rerun with --backup, then migrate provider thinkingLevelMap, then run pi update --self."
else
  echo "Pi ${TARGET_VERSION} preflight"
  echo "Mode: backup"
  create_backup
  echo ""
  echo "Findings:"
  for line in "${infos[@]}"; do echo "- $line"; done
  for line in "${warnings[@]}"; do echo "- $line"; done
fi
