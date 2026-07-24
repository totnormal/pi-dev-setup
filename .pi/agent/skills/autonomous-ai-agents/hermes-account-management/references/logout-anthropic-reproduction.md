# Logging Out of Anthropic Account — Reproduction Recipe

## Problem
User was logged into Anthropic accounts in the Hermes desktop app (Settings → Providers → Accounts showed "Connected" badges for both "Anthropic API Key" and "Anthropic OAuth"). They wanted to fully disconnect.

## Investigation Path

1. **Check CLI credentials** — `hermes auth list` showed no Anthropic entries in the credential pool. No API key was stored.
2. **Check `.env` and `config.yaml`** — only commented-out lines found (`# LLM_MODEL=anthropic/claude-opus-4.6`, `# model: anthropic/claude-sonnet-4`). These are NOT active auth.
3. **Try CLI logout** — `hermes auth logout anthropic` returned "Logged out of Anthropic. Model provider configuration was unchanged." This cleared in-memory state but didn't fully disconnect.
4. **Check auth.json** — `~/.hermes/auth.json` had no `anthropic` provider entry. Only credential pool entries.
5. **Check desktop app storage** — `~/Library/Application Support/Hermes/` has Electron-style files (Cookies, Session Storage, Local Storage). No Anthropic cookies found in the Cookies SQLite DB.
6. **Find the OAuth file** — Discovered `~/.hermes/.anthropic_oauth.json` via `find ~/.hermes -name "*.json"`. It contained `accessToken`, `refreshToken`, and `expiresAt`.

## Resolution

```bash
# Step 1: CLI logout
hermes auth logout anthropic

# Step 2: Remove persisted OAuth session
rm ~/.hermes/.anthropic_oauth.json

# Verify
hermes auth status anthropic   # Should show: logged out
ls ~/.hermes/.anthropic_oauth.json  # Should show: No such file or directory
```

## Key Files

| File | Purpose |
|------|---------|
| `~/.hermes/.anthropic_oauth.json` | Anthropic OAuth tokens (access + refresh) — persists across sessions |
| `~/.hermes/auth.json` | All credential pool entries — API keys, OAuth tokens for non-Anthropic providers |
| `~/.hermes/config.yaml` | Provider model config (commented-out lines are inactive) |
| `~/.hermes/.env` | Environment variable overrides (commented-out lines are inactive) |
| `~/Library/Application Support/Hermes/Cookies` | Electron cookie store (Anthropic.com session cookies) |