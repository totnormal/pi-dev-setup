# Dev Tools Skills — Quick Reference

> Location: `~/.pi/agent/skills/`

---

## 1. Multi-Draft — Multi-Model Parallel Drafting

**Author:** Custom (pi-specific)

Run the same task across N git worktrees, each powered by a different model, then compare results.

### When to Activate
- "In 3 worktrees, implement this using X, Y, and Z"
- "Compare models on this task"
- "Parallel draft using multiple models"
- "Multi-model implementation"

**Do NOT activate** for single-model requests or unrelated git worktree questions.

### How It Works
1. Creates git worktrees from the current branch
2. Opens a Terminal tab per model, each running `pi --model <model> "<prompt>"`
3. After user presses Enter, generates a diff comparison

### Model Resolution

| User Says | Provider/Model |
|-----------|---------------|
| glm-5.1 | `zai/glm-5.1` |
| deepseek | `deepseek/deepseek-v4-pro` |
| kimi-k2 | `openrouter/kimi-k2.6` |
| gemini | `google/gemini-3.1-pro` |
| gpt-5 | `openai-codex/gpt-5.5` |
| claude / sonnet | `anthropic/claude-sonnet` |
| o3 | `openai/o3-pro` |

### Workflow

```
Step 1: Parse request → extract task, models, slug, base branch
Step 2: Confirm plan with user (always, unless "just do it")
Step 3: Execute multi-draft CLI
Step 4: Tell user tabs are open, come back to compare
Step 5: Compare drafts → strengths/weaknesses per model → pick or combine
```

### Commands

```bash
# Standard
multi-draft --task "landing" \
  zai/glm-5.1 \
  openrouter/kimi-k2.6 \
  google/gemini-3.1-pro \
  --prompt "Build a landing page for..."

# Long prompt → temp file
cat > /tmp/multi-draft-prompt.md << 'EOF'
[full prompt]
EOF
multi-draft --task "blog" zai/glm-5.1 anthropic/claude-sonnet \
  --prompt-file /tmp/multi-draft-prompt.md

# Cleanup when done
git worktree remove <path>
git branch -d <branch-name>
```

### Quick Commands
```
Draft this landing page in 3 worktrees using glm-5.1, kimi-k2, and gemini
Compare models on implementing the auth module
Multi-draft the API design using claude and deepseek
```

---

## 2. HALO Improve — Harness Optimization

**Author:** Custom (pi-specific)

Automatically analyze pi agent traces with HALO and apply harness optimizations. Runs a 5-step pipeline to find systemic failure patterns and apply fixes.

### When to Trigger
- "Improve pi"
- "Improve the harness"
- "Optimize pi"
- "HALO analysis"
- "Run HALO"

### 5-Step Pipeline

```
Step 1: SNAPSHOT
  cd ~/.pi/agent && git add -A && git commit -m "pre-halo snapshot"

Step 2: CONVERT TRACES
  python3 ~/Documents/Playground/halo/pi-to-halo-v3.py /tmp/pi_traces_latest.jsonl
  → Verify: tool spans have real names, error detection clean

Step 3: RUN HALO
  Uses OpenAI-compatible API via OpenRouter
  Model: openai/gpt-5.2
  Timeout: 600s
  → Analyzes traces for systemic harness failure patterns

Step 4: APPLY FIXES
  Edits only user config files:
    ~/.pi/agent/agents/*.md      — system prompts
    ~/.pi/agent/settings.json    — pi configuration
    ~/.pi/bin/pi                 — startup shim
  For pi core changes → creates idempotent patches in ~/.pi/agent/patches/

Step 5: COMMIT
  cd ~/.pi/agent && git commit -m "HALO improvements: [summary]"
```

### Safety
- Git snapshot before every run — `git checkout HEAD~1` to revert
- Only edits user config files, never pi core
- Ignores known false positives (npm deprecation warnings, "node-domexception", etc.)

### Quick Commands
```
Improve pi
Run HALO analysis
Optimize the harness
```

---

## Skills Comparison

| Feature | Multi-Draft | HALO Improve |
|---------|:---:|:---:|
| Purpose | Multi-model parallel work | Pi harness optimization |
| Requires git | ✅ (worktrees) | ✅ (snapshot/commit) |
| Automation level | Semi-auto (user confirms) | Full-auto pipeline |
| Output | Diff comparison | Config patches |
| Scope | Task-specific | System-wide |
