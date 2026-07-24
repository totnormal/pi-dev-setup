---
disable-model-invocation: true
name: context-check
description: Proactive context health check — run BEFORE hitting token limits
---

# Context Health Check

## Extended Details

**CRITICAL: Check context size BEFORE it hits the limit.**

### Proactive Thresholds

| Token Level | Action |
|-------------|--------|
| < 150k | Normal operation |
| 150k-180k | **WARNING** - Start planning cleanup |
| 180k-200k | **CRITICAL** - Squashes recommended |
| > 200k | **EMERGENCY** - Must squash NOW |

### When to Run This Check

**Run BEFORE:**
- Starting any large task
- After 10+ tool calls
- Before reading large files
- When session feels "heavy"

### How to Check

Use `context_log` to see current state:

```
context_log
```

### If Context is Large (>150k tokens)

**IMMEDIATELY** do one of:

1. **Squash with Tag:**
```javascript
context_checkout({
  target: "<last-tag>",
  message: "[Summary of what was done]",
  backupTag: "<task>-raw-history"
});
context_tag({ name: "<task>-squashed" });
```

2. **If no recent tag exists:**
```javascript
context_tag({ name: "checkpoint-before-squash" });
// Then squash
context_checkout({
  target: "checkpoint-before-squash",
  message: "[Summary]",
  backupTag: "checkpoint-raw"
});
```

### Rules

1. **Never let context exceed 200k tokens**
2. Check context_log every 20-30 tool calls
3. If context feels heavy, squash immediately
4. Keep backups of valuable work before squashing
