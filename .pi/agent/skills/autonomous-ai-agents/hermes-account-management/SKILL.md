---
name: hermes-account-management
disable-model-invocation: true
description: "Manage provider accounts, OAuth sessions, and credentials in Hermes Agent — log in, log out, troubleshoot auth issues across the CLI and desktop app."
version: 1.0.0
author: Agent (from session)
platforms: [macos]
metadata:
  related_skills: [hermes-agent, github-auth]
  tags: [hermes, auth, accounts, oauth, providers, credentials]
---

# Hermes Account Management

Manage provider accounts, OAuth sessions, and API-key credentials in Hermes Agent. Covers the CLI (`hermes auth`) and the desktop app's `Settings → Providers → Accounts` UI, including the interaction between the two.

## Account Types & Storage

Hermes stores credentials in **two separate systems** depending on the account type:

| Store | File | What it holds |
|-------|------|---------------|
| Credential pool | `~/.hermes/auth.json` | API keys, credential pool entries (OpenRouter, Copilot, Nous, NVIDIA, custom providers, etc.) |
| OAuth sessions | `~/.hermes/.anthropic_oauth.json` | OAuth access/refresh tokens for Anthropic (desktop app browser sign-in) |
| Desktop app state | `~/Library/Application Support/Hermes/` (Electron: Cookies, Local Storage, Session Storage) | Electron-level state (cookies, cached data) — generally not needed for logout |

The credential pool (`auth.json`) and OAuth session file (`.anthropic_oauth.json`) are **independent** — logging out of one does not clear the other.

## CLI Commands

### List all credentials
```
hermes auth list
```
Shows pooled credentials by provider, with auth type and source.

### Log out of a provider
```
hermes auth logout <provider>
```
Examples:
- `hermes auth logout anthropic`
- `hermes auth logout openrouter`

This clears in-memory auth state for the provider. **Does NOT remove persisted OAuth session files** (see below).

### Remove a specific credential from pool
```
hermes auth remove <provider> <index>
```
Remove a credential by provider name and index (from `hermes auth list`).

### Reset exhaustion status
```
hermes auth reset <provider>
```
Clears the "exhausted" (rate-limited / 401) flag on a provider's credential pool.

### Re-authenticate OAuth providers
```
hermes auth add <provider>
```
Interactive OAuth flow. Providers: `nous`, `openai-codex`, `qwen-oauth`.

## Logging Out of Anthropic (Desktop App)

The Hermes desktop app stores Anthropic OAuth sessions in two places. Both must be cleaned for a full logout:

### Step 1 — CLI logout
```bash
hermes auth logout anthropic
```

### Step 2 — Remove OAuth session file
```bash
rm ~/.hermes/.anthropic_oauth.json
```

After both steps, the desktop app's Settings → Providers → Accounts page will show Anthropic as disconnected (no "Connected" badge).

### Verifying logout
```bash
hermes auth status anthropic
# Should show: anthropic: logged out
ls ~/.hermes/.anthropic_oauth.json 2>&1
# Should show: No such file or directory
```

## Desktop App Accounts UI

Access: **Settings → Providers → Accounts** (in the macOS desktop app)

The Accounts page shows:
- **Nous Portal** — OAuth-connected (device code flow)
- **Anthropic API Key** — API key based (shows as "Connected" when OAuth session exists)
- **Anthropic OAuth** — browser-based OAuth sign-in

Each entry has a right chevron → to manage settings. Some providers also show a terminal icon for browser-based sign-in flows.

The "Have an API key instead?" link switches the Anthropic entry from OAuth to direct API key input.

## Pitfalls

- **`hermes auth logout anthropic` alone is NOT sufficient.** The `.anthropic_oauth.json` file persists the OAuth tokens and re-establishes the session. Always remove that file too.
- **Commented-out config lines are NOT active auth.** A line like `# LLM_MODEL=anthropic/claude-opus-4.6` or `# model: anthropic/claude-sonnet-4` in `.env` / `config.yaml` is just a comment — no login state.
- **Credential pool entries and OAuth sessions live in different files.** Logging out of the pool (`hermes auth logout`) does not touch `.anthropic_oauth.json`, and vice versa.
- **Unknown provider error** when running `hermes auth logout` — the provider name must match exactly (e.g. `anthropic`, not `anthropic-api-key` or `anthropic-oauth`).
- **Desktop app vs CLI state**: The desktop app may show "Connected" badges based on `.anthropic_oauth.json` even after CLI logout. Always check both stores.