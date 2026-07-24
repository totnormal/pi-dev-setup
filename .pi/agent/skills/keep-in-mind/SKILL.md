---
disable-model-invocation: true
name: keep-in-mind
description: Remember ideas/requests — remind after tasks, only forget when cancelled
---

# Keep-in-Mind Manager

## Extended Details

Stores ideas and requests to remember, reminds user periodically.

### Remember This
```
/keep-in-mind <idea or request>
```

Steps:
1. Read current `~/.omni/KEEP-IN-MIND.md`
2. Add idea with timestamp and remind_count = 0
3. Ask user: "Should we work on this now?"
   - If yes: Start working on it
   - If no: Store and say "Got it. I'll remind you after the current task."

### Show Kept Ideas
```
/show-keep-in-mind
```

Steps:
1. Read `~/.omni/KEEP-IN-MIND.md`
2. Display all ideas with numbers, descriptions, and reminder counts
3. Show tips for managing: "Say 'forget about #N' to cancel"

### Reminder Check (After Task Completion)
After completing any task:

1. Read `~/.omni/KEEP-IN-MIND.md`
2. If ideas exist:
   - Show: "You wanted to explore: [idea]"
   - Ask: "Should we work on this now?"
   - If yes: Work on it
   - If no: Increment remind_count, say "I'll ask again after the next task"
3. If remind_count > 3 on an item:
   - Ask: "You've deferred this [N] times. Still want to keep it?"
   - If no: Remove from file

### Cancel/Forget
```
/forget <idea number or description>
```

Steps:
1. Remove specified idea from `~/.omni/KEEP-IN-MIND.md`
2. Confirm: "Forgot: [idea]"

### Complete & Archive
When idea is implemented:
1. Move from "Ideas to Explore" to "Completed" section
2. Confirm with user

### Data Format

```markdown
# Keep-in-Mind

## Ideas to Explore
| # | Idea | Added | Remind Count |
|---|------|-------|--------------|
| 1 | Idea description | YYYY-MM-DD | 0 |
| 2 | Another idea | YYYY-MM-DD | 1 |

## Completed
| Idea | Completed |
|------|-----------|
| Implemented idea | YYYY-MM-DD |
```

### Rules
1. Only forget when user explicitly cancels or after implementation
2. Increment "remind count" each time user defers
3. If remind_count > 3, confirm user still wants the idea
4. Persist across sessions
5. Be helpful but not annoying
