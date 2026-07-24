---
name: ai-agent-cli-troubleshooting
category: autonomous-ai-agents
disable-model-invocation: true
description: Diagnose and fix CLI agent startup failures — missing modules, path resolution, peer dependency issues for Pi, Claude Code, Codex, Gemini, and Hermes terminal/backend toolsets.
tags:
  - cli
  - troubleshooting
  - node-modules
  - peer-dependencies
  - hermes-terminal
  - shell-environment
---

# AI Agent CLI Troubleshooting

## When to Use This Skill

Load this skill when:
- Pi, Claude Code, Codex, or Gemini CLI fails to start with module errors
- Extensions fail with "Cannot find module '@earendil-works/...'" or similar
- Peer dependency warnings appear at install time but cause runtime failures
- CLI commands hang or timeout unexpectedly on clean installs
- **Hermes agent fails to launch** — terminal/does not start, system dependency warnings
- **hermes doctor** shows "system dependency not met" for terminal toolset

## Common Failure Patterns

### Missing Peer Dependencies (Pi)

**Symptoms:**
```
Error: Cannot find module '@earendil-works/pi-ai'
Error: Cannot find module '@earendil-works/pi-tui'
Error: (0 , _piAi.getModels) is not a function
```

**Root Cause:** Pi extensions import from `@earendil-works/*` packages that aren't on the module resolution path.

**Fix:**
```bash
# 1. Find where packages actually live
find ~/.local/share/fnm -name "@earendil-works" -type d 2>/dev/null

# 2. Create symlink at top-level node_modules (if fnm-managed)
ln -sfn ~/.local/share/fnm/node-versions/*/installation/lib/node_modules/pi-btw/node_modules/@earendil-works \
  ~/.local/share/fnm/node-versions/*/installation/lib/node_modules/@earendil-works

# 3. Update ~/.pi/bin/pi launcher to include the correct CLI path
# Add to the for loop candidate paths:
/home/*/node_modules/pi-*/node_modules/@earendil-works/pi-coding-agent/dist/cli.js
```

### Path Not Found Errors

**Symptoms:**
```
ERROR: Cannot find pi-coding-agent cli.js
command not found: claude, codex, pi
```

**Fix:**
```bash
# For fnm-managed Node, ensure PATH includes node and npm bin
eval "$(fnm env)"

# Or run the CLI directly with node
node node_modules/pi-btw/node_modules/@earendil-works/pi-coding-agent/dist/cli.js --version
```

### Extension Timeout / Hang

**Symptoms:** CLI starts but hangs when loading certain extensions.

**Fix:** Identify problematic extensions and either:
- Disable them in `~/.pi/agent/settings.json`
- Remove the extension directory
- Check for version mismatches in peer dependencies

## Diagnostic Commands

```bash
# Verify launcher finds correct CLI
.pi/bin/pi --version

# Check which npm packages have the modules
npm list -g --depth=0 | grep pi

# Find all module locations
find ~/.local/share/fnm/node-versions -name "@earendil-works" -type d 2>/dev/null

# Test direct module resolution
node -e "console.log(require.resolve('@earendil-works/pi-ai'))"
```

## Quick Resolution Flow

1. **Identify the missing module** from error message
2. **Locate it** in existing node_modules tree
3. **Symlink to top-level** if it's an npm peer dependency issue
4. **Update launcher script** if CLI path is wrong
5. **Verify** with `--version` or `--help`

## Key Paths

| Agent | Executable | Extension Dir | Modules |
|-------|------------|---------------|---------|
| Pi | `~/.pi/bin/pi` | `~/.pi/agent/extensions/` | `@earendil-works/pi-coding-agent` |
| Claude Code | `claude` | `~/.claude/*.json` | `@anthropic-ai/sdk` |
| Codex | `codex` | builtin | `@opencode/*` |
| Gemini | `gemini` | builtin | `@google/*` |

### Hermes Terminal Toolset

**Symptoms:**
```
⚠ terminal (system dependency not met)
Couldn't launch Hermes — the terminal did not start.
```

**Diagnostic:**
```bash
# Run doctor to check toolset status
hermes doctor

# Verify bash is available (required for terminal backend)
which bash
/bin/bash --version

# Check for shell profile errors that prevent spawning
bash -l -c 'exit 0'  # Should succeed silently

# View crash logs for specific error
tail -50 ~/.hermes/logs/tui_gateway_crash.log
```

**Root Causes:**
- Missing or broken bash installation
- Shell profile (`.bashrc`, `.zshrc`) syntax errors that abort on `bash -l`
- Corrupted PATH preventing terminal process from starting
- macOS-specific: Git Bash required for certain path translations

**Fix:**
```bash
# 1. If bash is missing (macOS)
brew install bash

# 2. If shell profile has errors
bash -l -c 'echo OK' 2>&1  # Check for errors
# Fix any syntax errors in ~/.zshrc or ~/.bash_profile

# 3. If PATH is broken
eval "$(fnm env)"  # Or restore PATH to include /usr/local/bin, /bin
```
```

### Missing Firecrawl API Key (Web Search Failure)

**Symptoms:**
```bash
Tool web_search returned error: Web tools are not configured. Set FIRECRAWL_API_KEY for cloud Firecrawl or set FIRECRAWL_API_URL for a self-hosted Firecrawl instance. Log in to Nous Portal to use mana …
```

**Root Cause:**
The Hermes agent lacks a valid Nous/Firecrawl API token, which is required for the `web_search` and `web_extract` tools to function. Without this token, cron jobs (or any agent tasks) that rely on web research cannot fetch data, resulting in no output files being generated.

**Fix:**
Authenticate with Nous to obtain the necessary token:

```bash
hermes auth add nous-oauth
```

Follow the prompts to log in to your Nous account. This stores a refresh token that the agent can exchange for a short‑lived Firecrawl API key when needed.

After successful authentication, re‑run the affected cron job or agent task:

```bash
cronjob action=run job_id=<your-job-id>
```

Verify that web searches now succeed by checking the agent log for entries like `web_search returned success` and that the expected output files (e.g., marketing research reports) are written to your Google Drive folder.