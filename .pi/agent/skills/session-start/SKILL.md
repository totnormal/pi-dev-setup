---
disable-model-invocation: true
name: session-start
description: Run at session start — check context, summarize recent work, clean slate
---

# Session Start Protocol

## Extended Details

Run this at the START of every session or when resuming work.

### 1. Check Context Health
```
context_log
```

### 2. If Context is Large (>150k tokens)
**Squash immediately:**
```javascript
context_tag({ name: "session-resume-before-cleanup" });
context_checkout({
  target: "session-resume-before-cleanup",
  message: "[Summary of recent work and decisions]",
  backupTag: "session-raw-history"
});
context_tag({ name: "session-clean-start" });
```

### 3. Read Project State
Check if there's recent work to understand:
- `.omni/PROJECT.md` - Current project
- `.omni/TASKS.md` - Active tasks
- `.omni/QUEUE.md` - Queued tasks
- `.omni/KEEP-IN-MIND.md` - Ideas to explore

### 4. Quick Status Update
Provide a brief summary of:
- Current task/project
- Pending items in queue
- Ideas in keep-in-mind

### 5. Proceed
Once context is clean and state is understood, proceed with user's request.
