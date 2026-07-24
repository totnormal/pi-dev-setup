---
name: reduce-pi-startup-context
description: Diagnose and reduce pi coding agent startup context bloat for local LLMs. Use when kv_len is high on new conversations, compaction fails with prefill memory errors, or local models (MLX/oMLX) run out of memory before generation starts.
disable-model-invocation: true
---

# reduce-pi-startup-context

## When to Use
- Local model (oMLX/MLX, Ollama, LM Studio) throws `prefill_memory_exceeded` on a new conversation
- `kv_len` is unexpectedly high (20K-40K+) on the very first turn
- Compaction fails with `Summarization failed: 400: prefill memory guard rejected`
- You want to run a 30B+ local model inside pi without running out of unified memory

## Root Causes (in priority order)

### 1. Tool Schema Bloat (~77% of startup tokens)
Every registered tool's full JSON schema is sent as the `tools` array on every API call. Pi extensions register MANY tools:
- **pi-subagents**: `subagent` tool alone = 16.8KB description (~4.2K tokens)
- **context-mode MCP**: 14 `ctx_*` tools (~8K tokens total)
- **playwright MCP**: 21 browser tools (~5K tokens)
- **tolaria MCP**: 10 vault tools (~2.5K tokens)
- **entwurf**: 3 spawn tools (~2K tokens)
- **pi-hermes-memory**: memory/skill/session_search/memory_search (~2K tokens)

### 2. Skills Section (~14%)
46 enabled skills (those WITHOUT `disable-model-invocation: true`) inject name+description+location = ~5.1K tokens. The other 1,171 skills correctly self-disable.

### 3. AGENTS.md Triplication (~8%)
Many projects mirror identical content across AGENTS.md, CLAUDE.md, GEMINI.md. Pi loads ALL matching files, tripling the cost (~3K tokens wasted).

### 4. Memory Policy (~2%)
`pi-hermes-memory` defaults to `memoryPolicyStyle: "full"`, injecting ~920 tokens of policy text.

## Procedure

### Step 1: Measure the actual budget
```bash
# Count tool registrations across active packages
grep -rn "registerTool" ~/.pi/agent/npm/node_modules/*/src/**/*.ts 2>/dev/null | wc -l

# Check AGENTS.md duplication
md5 AGENTS.md CLAUDE.md GEMINI.md 2>/dev/null

# Count enabled (non-disabled) skills
grep -rL "disable-model-invocation:.*true" ~/.ai-shared/skills-2/skills/*/SKILL.md 2>/dev/null | wc -l
```

### Step 2: Choose a reduction tier

**Tier 1 — Nuclear (for large local models, ~95% reduction → ~1.8K tokens):**
```bash
# Use the minimal settings profile (zero packages, zero MCP)
pi --settings ~/.pi/agent/settings.local-minimal.json
```

**Tier 2 — Balanced (keep memory + free models, ~68% reduction → ~12K tokens):**
```bash
pi --settings ~/.pi/agent/settings.local-balanced.json
```

**Tier 3 — Surgical fixes (edit existing settings.json):**
1. Remove `context-mode` and `playwright` from `mcpServers` → saves ~13K tokens
2. Remove `pi-subagents` from `packages` → saves ~5.7K tokens
3. Dedup AGENTS.md: `cd <project> && rm CLAUDE.md GEMINI.md && ln -s AGENTS.md CLAUDE.md && ln -s AGENTS.md GEMINI.md` → saves ~2K tokens
4. Set hermes memory config: create `~/.pi/agent/hermes-memory-config.json` with `{"memoryPolicyStyle": "compact"}` → saves ~500 tokens
5. Remove tolaria, entwurf, transcribe_media packages → saves ~6K tokens

### Step 3: Verify
```bash
# After applying fixes, start pi and check the first-turn token count
# The model should no longer throw prefill_memory_exceeded on new conversations
```

## Pitfalls
- **Don't remove native tools** (read, bash, edit, write) — these are irreducible and required for pi to function
- **Settings profiles are additive** — `--settings` replaces the packages list entirely; it doesn't merge
- **MCP tools are discovered at runtime** — removing from `mcpServers` is the only way to prevent their schemas from being sent; disabling the extension isn't enough
- **context-mode is also an MCP server AND a pi package** — remove from BOTH `mcpServers` and `packages` to fully eliminate
- **Symlinks for AGENTS.md** — some tools may check for file existence by type; `ln -s` works but verify your editor follows symlinks
- **The subagent tool description is dynamically generated** — even if you think you're not using subagents, the 16.8KB description is injected if `pi-subagents` is in packages

## Verification
- Start a new pi session with the chosen settings
- Send a trivial message ("hello")
- The model should respond without `prefill_memory_exceeded`
- For Qwen3-30B-A3B-4bit: target startup context < 8K tokens for comfortable headroom
