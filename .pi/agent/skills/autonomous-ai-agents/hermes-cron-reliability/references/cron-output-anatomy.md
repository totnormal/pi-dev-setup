# Cron Output File Anatomy

Every cron run produces one markdown file at:

```
~/.hermes/cron/output/<job_id>/<YYYY-MM-DD_HH-MM-SS>.md
```

This file is the single best debugging surface for cron jobs. It contains the **exact** prompt the agent received (including any skill content), the agent's response, and any error trace.

## File Structure

```markdown
# Cron Job: <name>
**Job ID:** <id>
**Run Time:** <YYYY-MM-DD HH:MM:SS>
**Schedule:** <cron expr>

## Prompt
[Full system prompt + skill content the agent was given]

## Response
[Final assistant response — what the agent returned as its "output"]

## Error
[Only present if the run errored. Format: `RuntimeError: agent reported failure`]
```

The `## Error` section is appended **only on failure**. A successful run has just `## Prompt` + `## Response`.

## What to Look For

### In the `## Prompt` section

| Line you see | Meaning |
|---|---|
| `[IMPORTANT: The user has invoked the "X" skill, indicating they want you to follow its instructions. The full skill content is loaded below.]` | The skill loaded successfully — body follows |
| `[IMPORTANT: The following skill(s) were listed for this job but could not be found and were skipped: X. Start your response with a brief notice so the user is aware, e.g.: '⚠️ Skill(s) not found and skipped: X']` | **The skill is missing.** This is the silent-failure trap. The agent gets a thin prompt with only the surviving skills' content. |
| `[IMPORTANT: You are running as a scheduled cron job. DELIVERY: ...]` | The cron-mode framing block — always present, includes the `[SILENT]` convention |
| A full skill body (YAML frontmatter + markdown) | Skill loaded — confirms the skill still exists on disk |

### In the `## Response` section

| Pattern | Meaning |
|---|---|
| `[SILENT]` | Agent decided there was nothing to report. Runtime treats as `ok`. If your job should always produce output, this is a smell. |
| `FILE_SAVED: <path>` followed by `TELEGRAM_SUMMARY: ...` | Standard file + summary delivery block. The Hermes gateway parses this to ship the file to Telegram. |
| `FILE_SAVE_FAILED: <reason>` | `write_file()` failed. The agent's response is preserved for the user, but no file was written. |
| A full marketing research report (or whatever the prompt asked for) | Healthy run. |
| Empty response (just whitespace) | Almost always a stream/agent failure. Look at `## Error`. |

### In the `## Error` section

Most cron failures are one of:

- `RuntimeError: agent reported failure` — the agent exited without producing a parseable response (often: model stream died, hit timeout, ran out of tool calls, or tripped over a malformed prompt)
- Stream-related errors (less common) — usually the runtime retries automatically

## Sample Inspection Commands

```bash
# Most recent run for a job
ls -lt ~/.hermes/cron/output/<job_id>/ | head -3

# The "skill not found" warning across all jobs in the last 30 days
grep -lE "could not be found and were skipped" \
  ~/.hermes/cron/output/*/2026-*.md | xargs -I {} dirname {} | sort -u

# Compare today's run to one that worked
diff ~/.hermes/cron/output/<job_id>/2026-07-06_14-03-14.md \
        ~/.hermes/cron/output/<job_id>/2026-07-07_14-08-50.md

# Find runs that ended in [SILENT]
grep -lE "^\[SILENT\]$" ~/.hermes/cron/output/*/2026-*.md

# Find runs that errored
grep -lE "^## Error$" ~/.hermes/cron/output/*/2026-*.md
```

## Why This File Exists

The cron scheduler writes these files to enable **post-mortem debugging without re-running the job**. The prompt is captured verbatim so you can confirm what the agent saw, the response is preserved so you can see what the agent decided, and errors are captured so you can correlate agent-side failures with delivery failures.

These files do **not** rotate automatically. After months of daily runs, the directory can grow large. If it becomes a problem:

```bash
# Find old runs (older than 90 days) per job
find ~/.hermes/cron/output/ -name "2026-04-*.md" -type f
```

Pruning is safe — the jobs.json `last_run_at` and `last_status` are the canonical "what's the latest state" record; the output files are pure debugging history.

## Field Quirk: `prompt_preview` in jobs.json is Truncated

`cronjob action=list` and the `jobs.json` `prompt_preview` field truncate the inline prompt to roughly the first 200 characters. If you need the full prompt that was actually used in a specific run, **read the corresponding `~/.hermes/cron/output/<job_id>/<ts>.md`** — that file has the complete prompt that was injected at runtime.
