---
name: lazyman-cli
description: "Task manager CLI for plan.tarnovski.com. Manage todos, projects, tasks, subtasks. Keywords: task, todo, project, lazyman, planning."
disable-model-invocation: true
---

# Lazyman Task Manager CLI

## Usage

```bash
lazyman status                              # System status & user info
lazyman todos                               # List all todos
lazyman todo add "Title" -p high -d 2025-12-31 -n "Notes"
lazyman todo complete <id>
lazyman todo delete <id>
lazyman projects                            # List all projects
lazyman project add "Name" -c CLIENT_ID -d 2025-12-31
lazyman project <id>                        # Get project details
lazyman task add -P PROJECT_ID "Title" -D "Desc"
lazyman subtask add -T TASK_ID "Title"
```

## Auth

Requires env vars: `LAZYMAN_EMAIL`, `LAZYMAN_PASSWORD`, `LAZYMAN_MASTER_PASSWORD` (or `USER_EMAIL`, `USER_PASSWORD`, `MASTER_PASSWORD`).

## JSON output

Add `--json` as the first argument for raw JSON output.
