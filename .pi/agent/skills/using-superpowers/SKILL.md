---
disable-model-invocation: true
name: using-superpowers
description: "Instruction Priority. Keywords: using superpowers."
---

# Instruction Priority

## Extended Details

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## Context Management (CRITICAL)

**YOU MUST MANAGE YOUR CONTEXT WINDOW PROACTIVELY.**

### Token Thresholds

| Tokens | Status | Action |
|--------|--------|--------|
| < 150k | ✅ OK | Continue normally |
| 150k-180k | ⚠️ WARNING | Plan cleanup |
| 180k-200k | 🚨 CRITICAL | Squash recommended |
| > 200k | 🚨 EMERGENCY | MUST squash NOW |

### Proactive Checks

**Check context_log EVERY 20-30 TOOL CALLS** regardless of whether asked.

**If context > 150k tokens:**
1. Run `context_log` to see history
2. Identify what can be squashed
3. Squash with backup: `context_checkout`
4. Tag the new state: `context_tag`

### Context Hygiene Rules

1. **Never exceed 200k tokens** - API will reject
2. **Squash research/results** - process is noise, only keep findings
3. **Keep backups** - before squashing valuable work
4. **Tag frequently** - create checkpoints for easy navigation

### Check Now

If this session has been running for a while, run:
```
context_log
```

If history is large (>150k tokens), SQUASH NOW before continuing.
