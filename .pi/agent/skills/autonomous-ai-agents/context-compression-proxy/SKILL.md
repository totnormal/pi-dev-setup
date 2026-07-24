---
name: context-compression-proxy
category: autonomous-ai-agents
disable-model-invocation: true
description: Install, configure, and wire context-compression proxies (e.g. Headroom) for AI coding CLI agents — claude, codex, pi, gemini, agy. Covers proxy setup, agent wrapping, environment config, and durable hooks.
tags:
  - headroom
  - context-compression
  - proxy
  - token-optimization
  - coding-agents
---

# Context-Compression Proxy for AI Coding Agents

## When to Use This Skill

Load this when the user asks to:
- Install a context-compression layer (e.g. Headroom) for coding agents
- Wire up headroom/compression for claude, codex, pi, gemini, agy, or similar CLI tools
- Reduce token usage / cut API costs on coding agent workflows
- Set up shared memory or cross-agent context optimization
- "make [tool] available for [agent]" with a proxy/middleware

## Pitfalls & Approach

### ✅ DO: Use the tool's native integration first
When the user says "install X for tools Y,Z" — reach for X's own `init`, `wrap`, or `proxy` commands FIRST. Headroom has `headroom init claude`, `headroom init codex`, etc. Use those before researching each tool's internal configuration.

### ❌ DON'T: Deep-dive into each tool's proxy config
Do NOT go off researching whether each tool supports `ANTHROPIC_BASE_URL` or `GOOGLE_GEMINI_BASE_URL` before trying the simple approach first. The proxy tool itself handles routing. Keep momentum — install, init, move on.

### ❌ DON'T: Stop after a single config step
Keep going until every tool the user listed is wired up. Report per-tool status clearly.

### ⚠️ Headroom proxy must be running
If the proxy isn't started, `headroom init` may set hooks but the actual compression won't work. Start it as a background daemon with no timeout.

## Workflow

### 1. Install headroom

```bash
pip install "headroom-ai[all]"
```

Verify: `headroom --version`

### 2. Start the proxy (daemon)

```bash
headroom proxy --port 8787
```
Run this in background mode — it's a long-lived server that never exits.

Verify: `curl -s -o /dev/null -w '%{http_code}' http://localhost:8787/healthz` → `200`

### 3. Wire each agent

| Agent | Command / Method | Notes |
|-------|-----------------|-------|
| **Claude Code** | `headroom init claude` | Installs durable hooks + MCP retrieve tool |
| **Codex** | `headroom init codex` | Sets model_provider to headroom + hooks |
| **Pi** | Create custom provider extension at `~/.pi/agent/extensions/headroom-proxy/` overriding google/anthropic/openai baseUrl → localhost:8787 | Enable via `pi config` TUI |
| **Gemini CLI** | Set `GOOGLE_GEMINI_BASE_URL=http://localhost:8787` | Supported since v0.28.0 |
| **Antigravity CLI (agy)** | Set `OPENAI_BASE_URL` or `ANTHROPIC_BASE_URL` depending on provider routing | Check `agy plugin list` |
| **Any OpenAI-compat tool** | Set `OPENAI_BASE_URL=http://localhost:8787/v1` | |

### 4. Verify

Run a session with the agent, then check compression stats:

```bash
headroom perf
```

## Pi Extension Template

Custom provider extension at `~/.pi/agent/extensions/headroom-proxy/index.ts`:

```typescript
/**
 * headroom-proxy - Pi extension routing API calls through Headroom proxy
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerProvider("google", { baseUrl: "http://localhost:8787" });
  pi.registerProvider("anthropic", { baseUrl: "http://localhost:8787" });
  pi.registerProvider("openai", { baseUrl: "http://localhost:8787/v1" });
}
```

With `package.json`:

```json
{
  "name": "headroom-proxy",
  "version": "1.0.0",
  "description": "Routes Pi API calls through Headroom context-compression proxy",
  "type": "module",
  "main": "index.ts",
  "keywords": ["pi-package", "pi-extension", "headroom", "proxy"],
  "license": "MIT"
}
```

The TS type import warning (`Cannot find module '@earendil-works/pi-coding-agent'`) is expected — Pi resolves it at runtime. Extensions are auto-discovered from `~/.pi/agent/extensions/`.

## Headroom Proxy Configuration

| Option | Default | Description |
|--------|---------|-------------|
| `--port` | 8787 | Listen port |
| `--host` | 127.0.0.1 | Bind address |
| `--memory` | off | Enable persistent memory |
| `--backend` | anthropic | API backend (anthropic, openrouter, bedrock, etc.) |
| `--code-aware` | off | AST-based code compression (needs `headroom-ai[code]`) |
| `--mode token\|cache` | token | Optimization mode |

## Verification Checklist

- [ ] `headroom proxy` running and responding on `:8787`
- [ ] `headroom init` hooks installed for claude and/or codex
- [ ] Pi extension files exist at `~/.pi/agent/extensions/headroom-proxy/`
- [ ] Gemini CLI has `GOOGLE_GEMINI_BASE_URL` exported
- [ ] agy has appropriate base URL configured