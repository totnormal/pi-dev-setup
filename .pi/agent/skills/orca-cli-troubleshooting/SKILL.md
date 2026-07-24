---
name: orca-cli-troubleshooting
disable-model-invocation: true
description: >
  Diagnose and fix Orca daemon errors: DaemonProtocolError timeouts, terminal
  creation failures, and workspace overload. Covers root cause analysis for
  "createOrAttach timed out" errors and cleanup automation.
---

# Orca CLI Troubleshooting

## Diagnose Daemon Timeouts

**Error:** `DaemonProtocolError: Request createOrAttach timed out after 30000ms`

### Root Cause
Orca daemon is overwhelmed by too many active terminals. Check terminal count:

```bash
orca terminal list --json | jq '.result.totalCount'
```

If count >15, overload is likely.

### Identify Stale Terminals

Look for indicators of stale/idle terminals:

- `lastOutputAt: null` — terminal never received output or completely idle
- Terminals with `title: null` — often orphaned pty instances
- Terminals showing only shell prompts (`$`, `bash-3.2$`) with no agent activity

### Clean Up Stale Terminals

```bash
# Find stale handles
orca terminal list --json | jq -r '.result.terminals[] | select(.lastOutputAt == null) | .handle'

# Close each stale terminal
orca terminal close --terminal <handle> --json
```

### Test Recovery

After cleanup, verify terminal creation works:

```bash
orca terminal create --title "test-recovery" --json
orca terminal close --terminal <handle> --json
```

## Automation for Prevention

Create recurring cleanup to prevent future buildup:

```bash
orca automations create \
  --name "cleanup-stale-terminals" \
  --trigger "*/20 * * * *" \
  --prompt "Close terminals where lastOutputAt is null or more than 2 hours old. Report count closed." \
  --provider hermes \
  --workspace <selector> \
  --disabled \
  --json
```

Use `--disabled` first to test, then remove to enable.

## Common Terminal States to Clean

From today's session (27 terminals discovered):

| State | Indicator | Action |
|-------|-----------|--------|
| Never-output pty | `lastOutputAt: null` | Close |
| Idle bash prompts | Shell prompt only in preview | Close if stale |
| Completed agents | No recent output, agent state done | Close |
| Error loops | Repeated errors in preview | Close |

## Pitfall: Workspace Selector for Automations

Avoid `--workspace id:<worktreeId>` which often fails with `selector_not_found`. Use:

- `--workspace path:/absolute/path` for folder-based workspaces
- `--workspace id:<repoId>` only for git repos (not workspaces)

## Pitfall: Schedule Syntax for Recurring Jobs

- `20m` → "once in ~20 minutes" (one-shot, NOT recurring)
- `*/20 * * * *` → "every 20 minutes" (true recurring)

For recurring cleanup, always use 5-field cron syntax.