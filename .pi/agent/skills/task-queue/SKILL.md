---
disable-model-invocation: true
name: task-queue
description: Manage task queue — add tasks, show queue, process after completion
---

# Task Queue Manager

## Extended Details

Manages a queue of tasks stored in `~/.omni/QUEUE.md`.

### Add to Queue
```
/queue <task description>
```

Steps:
1. Read current `~/.omni/QUEUE.md`
2. Find the next task number
3. Add task with timestamp: `[ ] [N]. <task> - Added: YYYY-MM-DD HH:MM`
4. Write updated content back
5. Confirm with user

### Show Queue
```
/show-queue
```

Steps:
1. Read `~/.omni/QUEUE.md`
2. Display all queued tasks with numbers
3. Show count: "X tasks in queue"

### Process Queue (After Task Completion)
After completing any task, check queue:

1. Read `~/.omni/QUEUE.md`
2. If tasks exist:
   - Show the queue
   - Ask: "Should I work on the next queued task?"
   - If yes: Start working on first task in queue
   - If no: Leave task in queue
3. If no tasks: Continue normally

### Complete & Remove from Queue
When user says "done with that" or "completed":
1. Move task from "Queued Tasks" to "Completed" section
2. Update with completion timestamp
3. Show updated queue

### Clear from Queue
```
/clear-queue <task number or description>
```

Steps:
1. Remove specified task from queue
2. Confirm with user

### Data Format

```markdown
# Task Queue

## Queued Tasks
[ ] 1. Task description - Added: YYYY-MM-DD HH:MM
[ ] 2. Another task - Added: YYYY-MM-DD HH:MM

## Completed
- ✓ Task that was done - Completed: YYYY-MM-DD HH:MM
```

### Rules
1. Always check queue after completing a task
2. If queue has items, ask user before proceeding
3. Keep queue sorted by add time (oldest first)
4. Persist queue across sessions
