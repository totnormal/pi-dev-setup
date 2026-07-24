---
disable-model-invocation: true
name: "model-failure-resume"
description: "Automatically resume task execution after model failures or model switches. When the agent detects it's been interrupted by a model switch, it should silently resume the previous task without asking the user."
version: 2
created: "2026-06-14"
updated: "2026-06-14"
---
# Model Failure Auto-Resume

## The Core Rule

**When you detect a model-switch or model-failure notification in your context, silently resume the previous task. Do NOT:**
- Acknowledge the switch notification
- Ask the user what to do
- Explain what happened
- Wait for instructions

**Just continue the work.**

## When This Activates

This skill activates when you see ANY of these patterns in recent context:
- `⚡ Switched to ...` — model failure switch notification
- `Error: provider returned error` — model returned empty/garbled response
- `empty response` — model returned nothing
- `⚡ All fallbacks exhausted` — all fallback models failed
- You're starting a new turn after a previous turn ended with a model error

## Instructions

### Step 1: Detect interruption silently

Scan the recent context quietly. If you detect a model-switch signal:
- ✓ Silently note it happened
- ✗ Do NOT stop to analyze it
- ✗ Do NOT tell the user "I see the model was switched"

### Step 2: Re-establish context (fast)

Quickly determine what you were doing before the interruption:

1. **Check git status:** `git status --short` — shows uncommitted work = mid-task
2. **Check todo:** `todo list` — look for `in_progress` tasks
3. **Check checkpoint file:** if you saved one, read it
4. **Check git diff (optional):** `git diff --stat` for a quick summary of changes made so far

### Step 3: Resume work

Based on what you find:
- **If uncommitted edits exist** → continue the edit/feature you were working on
- **If a todo is in_progress** → continue that task
- **If a subagent was running** → check its status with `entwurf_status` or `subagent({ action: "status" })`
- **If nothing is found** → ask the user briefly: "What would you like me to continue?"

### Step 4: Save checkpoints proactively (for future interruptions)

Before starting any multi-step task (3+ edits, complex research, multi-file refactor):

```bash
python3 /Users/andreitarnovski/Documents/Playground/execution/checkpoint.py save \
  --task "<brief task description>" \
  --summary "<what you've done so far>" \
  --next "<what you're about to do next>"
```

When the task completes:
```bash
python3 /Users/andreitarnovski/Documents/Playground/execution/checkpoint.py clear
```

This ensures that after ANY model switch, you can pick up exactly where you left off.

### Step 5: Use subagents for fragile/long tasks

For tasks with 5+ steps or that span multiple tool calls, delegate to a subagent:

```
subagent({
  agent: "name",
  task: "<full task including all context>",
  context: "fork"
})
```

The subagent handles its own retries. If it fails, the parent session still has the full task description and can re-delegate. This isolates the main session from model flakiness.

## So, in practice

| You see this... | Do this... |
|---|---|
| `⚡ Switched to qwen3.5` | Continue task silently |
| `Error: empty response` | The extension already handled it — resume |
| `✅ ... recovered` | Ignore completely (extension was silenced) |
| User says "continue" | You were already resuming — just do it faster |

## Verification

- Model-switch notifications are processed silently (no acknowledgment)
- After a model failure, task continues without user intervention
- Checkpoint file is written during long tasks
- Subagent handles flaky models internally

## Pitfalls
- The recovery notification was REMOVED from hermes-fallback extension — the old "✅ ... recovered — staying on ..." message no longer appears. This is intentional: it was the main source of task interruption.
- If a model switch happens mid-tool-execution (e.g., during a write/edit), the tool may have already succeeded. Check git status and file content to verify.
- The checkpoint file is in `~/.tmp/` — it survives across sessions but is cleared on system reboot. Write important checkpoints to a more stable location if needed.
- The subagent approach is best for long fragile tasks; for quick edits, just check git status and continue.
- Do NOT use this skill as an excuse to drop error handling — model switches are normal, silent resumption is the expected behavior.