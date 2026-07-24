---
name: hermes-cron-reliability
description: "Diagnose and fix recurring cron job failures in Hermes Agent — when a scheduled job's `last_status` is `error`, when deliveries stop arriving, or when an `agent reported failure` notification comes through. Covers the silent-failure mode where a job references a missing skill, the diagnostic recipe using `~/.hermes/cron/output/`, and the self-contained fix pattern (inline the prompt, clear `skills: []`). Triggers on: 'cron job failed', 'agent reported failure', 'cron not running', 'last_status: error', 'cron delivery missing', 'cron job stopped working', 'no more Telegram summary from cron'."
version: 1.0.0
author: Agent (from session)
metadata:
  hermes:
    tags: [hermes, cron, scheduler, reliability, troubleshooting, diagnostics]
    related_skills: [hermes-agent]
disable-model-invocation: true
---

# Hermes Cron Job Reliability

Diagnose and fix recurring cron jobs in Hermes Agent when they fail, stop delivering, or silently degrade. **Covers the most common trap: a job referencing a missing or deleted skill still "runs successfully" but produces nothing useful.**

## When to Use

- `cronjob` response says `last_status: error` or `agent reported failure`
- A scheduled job used to deliver a Telegram/file summary and now doesn't
- You deleted/renamed a skill and a cron job that referenced it now misbehaves
- You get a "Cronjob Response: ... failed: agent reported failure" notification
- `[SILENT]` is showing up in too many outputs (job is alive but toothless)

## ⚠️ The Silent-Failure Trap (Read This First)

A cron job referencing a **missing or deleted skill** does NOT fail loudly. The runtime falls back to whatever skills ARE present, prepends a notice to the prompt, and the agent either:

- **Emits `[SILENT]`** → runtime treats this as `last_status: ok` (the failure is masked as success)
- **Trips over the thin prompt** → runtime reports `RuntimeError: agent reported failure` (the visible failure mode)

Either way, **`last_status: ok` is not proof the job is healthy**. A job can be "successful" for weeks while producing nothing. Always check the actual output, not just the status.

**Concrete failure mode seen in this repo (July 7, 2026):** `marketing-research-daily` and `marketing-research-daily-updated` referenced skills that no longer existed in `~/.hermes/skills/`. Both jobs ran daily for ~10 days. The 12:00 job emitted `[SILENT]` (status `ok`). The 14:00 job crashed (`status: error`). Neither produced a report.

## Diagnostic Recipe (5-step)

When a cron job is broken, run these in order — they go from cheapest to most informative.

### 1. List jobs and read the obvious state

```bash
# Via the cronjob tool
cronjob action=list
```

Look at each job's `last_status`, `last_error`, `last_run_at`, `last_delivery_error`, and the `enabled_toolsets` / `skills` arrays. Also note the `deliver` field — if `telegram:...` is in there, a missing gateway will surface as `last_delivery_error`, not `last_error`.

### 2. Read the raw jobs.json for ground truth

```bash
cat ~/.hermes/cron/jobs.json
```

The `cronjob action=list` view is a summary; the file has the full config including `prompt_preview` truncation. Useful when the listed prompt is cut off mid-sentence.

### 3. Inspect the per-run output archive

Every cron run is archived at:

```
~/.hermes/cron/output/<job_id>/<YYYY-MM-DD_HH-MM-SS>.md
```

Each file has three sections:
- `## Prompt` — the full system prompt + skill content the agent was actually given
- `## Response` — what the agent returned
- `## Error` (if any) — the runtime error trace

This is **the single most useful debugging surface**. When the prompt section says "skill(s) not found and skipped: X", that's the root cause.

```bash
# Most recent run for a job:
ls -lt ~/.hermes/cron/output/<job_id>/ | head -3

# Compare the most recent run to one that worked:
diff ~/.hermes/cron/output/<job_id>/2026-07-06_*.md ~/.hermes/cron/output/<job_id>/2026-07-07_*.md
```

### 4. Check the scheduler heartbeat

```bash
cat ~/.hermes/cron/ticker_heartbeat
cat ~/.hermes/cron/ticker_last_success
```

If the heartbeat is stale, the scheduler itself is down (separate from individual job failures).

### 5. Confirm the skills referenced by the job still exist

```bash
# Pull the skills list from jobs.json and check each one:
python3 -c "
import json
jobs = json.load(open('$HOME/.hermes/cron/jobs.json'))['jobs']
for j in jobs:
    for s in (j.get('skills') or []) + ([j['skill']] if j.get('skill') else []):
        path = f'$HOME/.hermes/skills/{s}'
        import os
        print(f\"{'OK ' if os.path.isdir(path) else 'MISSING'} {s} ({path})\")
"
```

A `MISSING` line is the smoking gun for the silent-failure trap.

## Common Failure Modes

| Symptom | Root cause | Fix |
|---|---|---|
| `last_status: error` + `RuntimeError: agent reported failure` | Agent tripped over a thin/missing prompt, or model stream died | See "Self-Contained Fix" below — inline the prompt |
| `last_status: ok` but no Telegram/file delivered for days | Skill(s) referenced by job no longer exist; agent emits `[SILENT]` | Same — inline the prompt |
| `last_delivery_error` populated, `last_error` empty | Gateway/channel is down or unreachable, not the agent | Check gateway logs: `tail -f ~/.hermes/logs/gateway.log` |
| Job never runs at all | `enabled: false`, `paused_at` set, or scheduler stopped | `cronjob action=resume <id>`; restart ticker |
| `agent reported failure` only on long/heavy jobs | Hit the 3-minute hard interrupt or the 600s idle timeout | Shrink the prompt's allowed tool call count, or move heavy work to `script` with `no_agent=True` |
| Skill loads but agent ignores its instructions | Skill's frontmatter description doesn't match the agent's intent | Update the skill's `description:` field to be trigger-accurate |

## The Self-Contained Fix (When a Skill Has Gone Missing)

If the diagnostic surfaces a missing or unstable skill that the job depends on, **stop coupling the job to skill lifecycle** by inlining the prompt.

### Before (fragile)

```python
cronjob(
    action="create",
    name="marketing-research-daily",
    skills=["marketing-research-daily", "arxiv"],
    schedule="0 12 * * *",
    prompt="",  # empty — relies on the skill
)
```

If `~/.hermes/skills/marketing-research-daily/` is deleted, this job silently degrades.

### After (self-contained)

```python
cronjob(
    action="update",
    job_id="<id>",
    prompt="<FULL INLINE PROMPT WITH METHODOLOGY, SAVE PATH, TELEGRAM FORMAT>",
    skills=[],   # cleared — prompt is now self-sufficient
)
```

`cronjob action=update` accepts the same fields as `create`. Pass the full prompt as a string and clear the `skills` array. The job will then run identically regardless of what's in `~/.hermes/skills/`.

### When NOT to do this

- The skill is actively maintained and unlikely to disappear (e.g., bundled `arxiv` or `web-search`).
- The prompt is too long to inline cleanly (>8KB suggests the prompt itself should be split into smaller jobs, not inlined as a wall of text).
- You want non-developers to be able to edit the methodology by editing a skill file instead of poking jobs.json.

## Verify the Fix

After updating a job, don't wait for the next scheduled tick. Trigger a manual run:

```bash
cronjob action=run job_id=<id>
```

This fires the job immediately and updates `last_status` / `last_error` synchronously. Inspect the new output file in `~/.hermes/cron/output/<job_id>/` to confirm:
- The prompt section no longer mentions "skill(s) not found and skipped"
- The response section contains the expected `FILE_SAVED:` and `TELEGRAM_SUMMARY:` block (or whatever the prompt asks for)
- No `## Error` section is appended

## Cron-Specific Gotchas (from session experience)

- **`[SILENT]` is success, not failure.** A job that returns exactly `[SILENT]` suppresses delivery — the runtime marks it `ok`. If your job legitimately has nothing to report most days, that's fine. If it should always produce output, treat frequent `[SILENT]` returns as a smell.
- **Required output format for Telegram file delivery:** after `write_file()`, the final response must contain `FILE_SAVED: <absolute path>` followed by `TELEGRAM_SUMMARY:` and a 4-bullet summary block. The Hermes gateway parses this block to deliver the file + summary to Telegram. Missing or malformed → no Telegram delivery, even if the file was written.
- **`execute_code` and `memory` are blocked in cron mode by design** (set `enabled_toolsets` to `["web", "file"]` to enforce). If a prompt accidentally calls `execute_code`, the run fails. The cron-mode constraint is built into the runtime, not the model.
- **`last_delivery_error` ≠ `last_error`.** Delivery errors (Telegram/Discord/etc. unreachable) populate `last_delivery_error`; agent-side errors populate `last_error`. A green `last_status: ok` with a non-null `last_delivery_error` means the agent worked but the gateway couldn't ship the result.
- **Path quirks on Google Drive paths.** The standard save path under `Library/CloudStorage/GoogleDrive-<email>/Shared drives/...` has a space in `Shared drives` and the path often flips between `_Work/_Other/_comms/` (with underscore) and `Work/Other/_comms/` (no underscore). Verify the actual directory exists with `ls` before pointing a prompt at it — a typo produces a `FILE_SAVE_FAILED` rather than a runtime error.

## Related

- `skill_view(name="hermes-agent")` — Cron CLI section, scheduler architecture, `cron/jobs.py` internals
- `references/diagnosis-walkthrough.md` — annotated real-world example of the silent-failure trap and the fix applied
- `references/cron-output-anatomy.md` — exact structure of a `~/.hermes/cron/output/<job_id>/<ts>.md` file, with annotated fields
- `references/writing-file-instructions.md` — how to write files and emit the required `FILE_SAVED:`/`TELEGRAM_SUMMARY:` block for Telegram delivery in cron jobs
