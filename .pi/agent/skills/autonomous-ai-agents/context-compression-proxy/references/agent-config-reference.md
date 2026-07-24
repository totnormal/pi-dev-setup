# Agent Proxy Configuration Details

## Claude Code
- **Init command**: `headroom init claude`
- **What it does**: Installs durable hooks in `~/.claude/settings.local.json` + MCP retrieve tool registration
- **Hook path**: `~/.claude/plugins/marketplaces/headroom-marketplace/`
- **Alternative**: `ANTHROPIC_BASE_URL=http://localhost:8787 claude`
- **Verify**: Check `~/.claude/settings.json` for `"headroom-marketplace"` entry

## Codex CLI
- **Init command**: `headroom init codex`
- **What it does**: Sets `model_provider = "headroom"` in `~/.codex/config.toml`, adds MCP server + hooks in `~/.codex/hooks.json`
- **Alternative**: `OPENAI_BASE_URL=http://localhost:8787/v1 codex`
- **Verify**: Check `~/.codex/config.toml` for `model_provider = "headroom"`

## Pi (pi.dev)
- **No native headroom init support** — uses custom provider extension
- **Extension path**: `~/.pi/agent/extensions/headroom-proxy/`
- **Files needed**: `index.ts` + `package.json`
- **Extension API**: `pi.registerProvider("google", { baseUrl: "http://localhost:8787" })`
- **Enable**: Run `pi config` and toggle `[x] headroom-proxy/index.ts` in the TUI
- **Default provider**: `google` (but also override `anthropic` and `openai` for flexibility)
- **TS import warning**: `Cannot find module '@earendil-works/pi-coding-agent'` is expected — Pi resolves it at runtime

## Gemini CLI
- **No native headroom init support**
- **Env var**: `GOOGLE_GEMINI_BASE_URL=http://localhost:8787`
- **Supported since**: v0.28.0 (fix in PR #18231)
- **Alternative**: Set in `~/.gemini/settings.json` under model config
- **Note**: If using sandbox mode, env var needs to be propagated

## Antigravity CLI (agy)
- **Binary**: `agy` at `~/.local/bin/agy`
- **Built in**: Go
- **Config**: Check `agy plugin list` for available provider routing
- **Likely env vars**: `OPENAI_BASE_URL` or `ANTHROPIC_BASE_URL` depending on model provider
- **No native headroom init support** as of v1.0.8
