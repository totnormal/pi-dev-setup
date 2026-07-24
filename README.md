# Pi Dev Agent Setup — Private Backup

Complete backup of my pi coding agent configuration. One-command restore on any machine.

## Quick Restore

```bash
git clone https://github.com/totnormal/pi-dev-setup.git
cd pi-dev-setup
./restore.sh
```

Then add secrets manually (API keys, auth.json, browser cookies).

## What's Included

- `.pi/settings.json` — Global pi config (MCP servers)
- `.pi/agent/settings.json` — Packages, extensions, theme, providers
- `.pi/agent/keybindings.json`, `models.json`, `entwurf-targets.json`
- `.pi/agent/themes/`, `scripts/`, `extensions/`, `agents/`
- `.pi/agent/skills/` — 1100+ skills
- `project/` — Project-local config (Skills, AGENTS.md)

## Secrets NOT included

- `auth.json`, `secrets/` — Add via `pi auth login`
- API keys in `settings.json` (Stitch, RevenueCat)
- `models.json` provider credentials (OpenRouter, ZAI, Nous)
- Browser cookies (DeepSeek, Qwen)
- `telegram.json`, `entwurf-targets.json` credentials
