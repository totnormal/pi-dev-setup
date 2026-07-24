#!/usr/bin/env bash
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="$HOME/.pi-backup-$(date +%Y%m%d-%H%M%S)"
log() { echo -e "\033[1;32m[restore]\033[0m $*"; }

log "Starting restore from $REPO_ROOT"
log "Backups → $BACKUP_DIR"

backup() { [[ -e "$1" || -L "$1" ]] && mkdir -p "$BACKUP_DIR/$(dirname "${1#$HOME/}")" && mv "$1" "$BACKUP_DIR/${1#$HOME/}" && log "Backed up $1"; }
copy() { backup "$2"; mkdir -p "$(dirname "$2")"; cp "$1" "$2"; log "Copied $2"; }
link() { backup "$2"; mkdir -p "$(dirname "$2")"; ln -sfn "$1" "$2"; log "Linked $2 → $1"; }

# Global pi config
copy "$REPO_ROOT/.pi/settings.json" "$HOME/.pi/settings.json"

# Agent config
copy "$REPO_ROOT/.pi/agent/settings.json" "$HOME/.pi/agent/settings.json"
copy "$REPO_ROOT/.pi/agent/keybindings.json" "$HOME/.pi/agent/keybindings.json"
copy "$REPO_ROOT/.pi/agent/models.json" "$HOME/.pi/agent/models.json"
copy "$REPO_ROOT/.pi/agent/entwurf-targets.json" "$HOME/.pi/agent/entwurf-targets.json"

# Themes, scripts, extensions, agents
for f in "$REPO_ROOT"/.pi/agent/themes/*.json; do [[ -f "$f" ]] && copy "$f" "$HOME/.pi/agent/themes/$(basename "$f")"; done
for f in "$REPO_ROOT"/.pi/agent/scripts/*; do [[ -f "$f" ]] && copy "$f" "$HOME/.pi/agent/scripts/$(basename "$f")" && chmod +x "$HOME/.pi/agent/scripts/$(basename "$f")"; done
rsync -a "$REPO_ROOT/.pi/agent/extensions/" "$HOME/.pi/agent/extensions/" 2>/dev/null && log "Synced extensions"
rsync -a "$REPO_ROOT/.pi/agent/agents/" "$HOME/.pi/agent/agents/" 2>/dev/null && log "Synced agents"

# Skills (symlink to repo)
link "$REPO_ROOT/.pi/agent/skills" "$HOME/.pi/agent/skills"

# Project
PROJECT="$HOME/Documents/Playground/skills-and-pi-tools"
[[ -d "$REPO_ROOT/project/.pi" ]] && rsync -a "$REPO_ROOT/project/.pi/" "$PROJECT/.pi/" && log "Synced project .pi"
[[ -f "$REPO_ROOT/project/AGENTS.md" ]] && copy "$REPO_ROOT/project/AGENTS.md" "$PROJECT/AGENTS.md"
[[ -d "$REPO_ROOT/project/Skills" ]] && rsync -a "$REPO_ROOT/project/Skills/" "$PROJECT/Skills/" && log "Synced project Skills"

# Install packages
if command -v pi &>/dev/null; then
    pi package install 2>/dev/null || log "Run 'pi package install' manually"
else
    log "pi CLI not found: npm i -g @earendil-works/pi-coding-agent"
fi

echo
echo "=== DONE ==="
echo "Backups: $BACKUP_DIR"
echo
echo "Manual steps:"
echo "  1. pi auth login (or edit ~/.pi/agent/auth.json)"
echo "  2. Edit ~/.pi/agent/models.json — replace ZAI_API_KEY, OPENROUTER_API_KEY, NOUS_API_KEY"
echo "  3. Edit ~/.pi/settings.json — add MCP server API keys (Stitch, RevenueCat)"
echo "  4. Restore browser cookies: deepseek-web-cookie.json, qwen-web-token.json"
echo "  5. Restore telegram.json"
echo "  6. Verify: pi skills list && pi extensions list && pi doctor"