# Cron-Based Terminal Cleanup

Use Hermes cron with `no_agent=true` for more reliable cleanup than Orca automations.

## Why Cron Over Orca Automations?

- Orca automations require a provider and workspace selection
- Cron with `no_agent=true` runs scripts directly without LLM overhead
- Works even when Orca daemon is in a degraded state

## Script Template

`cleanup-stale-orca-terminals.py` should:

1. Call `orca terminal list --json`
2. Identify stale terminals (null `lastOutputAt` or >2 hours old)
3. Close each stale terminal
4. Output ONLY the count closed (empty = silent delivery)

## Cron Creation

```python
cronjob(
  action='create',
  script='cleanup-stale-orca-terminals.py',
  schedule='*/20 * * * *',  # every 20 minutes
  no_agent=True,             # script-only mode
  deliver='local'            # or platform-specific
)
```

## Schedule Syntax

- `20m` → "once in ~20 minutes" (one-shot)
- `*/20 * * * *` → "every 20 minutes" (true recurring)

## Orca Timestamp Format

Timestamps are milliseconds since Unix epoch. Example:
- `1782742902319` = June 29, 2026 ~17:28 UTC
- `2 hours` = `2 * 60 * 60 * 1000 = 7,200,000 ms`