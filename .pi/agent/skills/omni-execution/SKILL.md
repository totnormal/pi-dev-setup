---
disable-model-invocation: true
name: omni-execution
description: Implements the next task from .omni/TASKS.md with narrow scope and concise handoff notes. Triggers include "do the next task", "implement", "execute", or when a task is ready for implementation.
---

# Omni Execution

## Goals

- read the next task brief
- complete the requested change with minimal context
- record concise implementation notes for verification and handoff

## Rules

- stay narrowly scoped
- do not rewrite the plan during execution
- leave reusable failure notes if the task cannot be completed

## After Task Completion

After completing ANY task, ALWAYS check:

### 1. Check Task Queue
Read `~/.omni/QUEUE.md`:
- If tasks exist, show the queue and ask: "Should I work on the next queued task?"
- If yes, start working on first queued task
- If no, leave tasks in queue

### 2. Check Keep-in-Mind
Read `~/.omni/KEEP-IN-MIND.md`:
- If ideas exist, show the first one and ask: "You wanted to explore this. Should we work on it now?"
- If yes, start working on it
- If no, increment remind_count and say "I'll ask again after the next task"
- If remind_count > 3, ask: "You've deferred this [N] times. Still want to keep it?"
