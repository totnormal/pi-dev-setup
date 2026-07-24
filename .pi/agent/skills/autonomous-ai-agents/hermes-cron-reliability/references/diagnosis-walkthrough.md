# Diagnosis Walkthrough: marketing-research-daily Failure (Jul 7, 2026)

Annotated real-world example of the silent-failure trap, with the exact commands and outputs that surfaced the root cause.

## Symptoms

- Telegram notification: `⚠️ Cron 'marketing-research-daily-updated' failed: agent reported failure`
- The other cron job (`marketing-research-daily`, 12:00) showed `last_status: ok` and seemed fine
- No marketing research file had been saved to Google Drive `_Work/_Other/_comms/` since June 27 — 10 days of silence

## Step 1 — List jobs

```bash
cronjob action=list
```

Output (abbreviated):
```json
{
  "job_id": "eeb318198d30",
  "name": "marketing-research-daily",
  "last_status": "ok",
  "skills": ["marketing-research-daily", "arxiv"]
},
{
  "job_id": "316c75b921dd",
  "name": "marketing-research-daily-updated",
  "last_status": "error",
  "last_error": "RuntimeError: agent reported failure",
  "skills": ["marketing-research-daily-updated", "arxiv"]
}
```

**Smell #1:** `last_status: ok` on the 12:00 job despite no file delivery for 10 days. The skill list references two skills that may not exist.

## Step 2 — Read jobs.json for ground truth

```bash
cat ~/.hermes/cron/jobs.json
```

Confirmed the `prompt` field was `""` for both jobs — they relied entirely on the listed skills to inject their methodology.

## Step 3 — Inspect the per-run output archive

```bash
ls -lt ~/.hermes/cron/output/316c75b921dd/ | head -3
# 2026-07-07_14-08-50.md   (today's failure)
# 2026-07-06_14-03-14.md   (yesterday's run, also broken)
# 2026-07-05_16-27-03.md   (older)
```

Read the most recent file. The `## Prompt` section opened with:

```
[IMPORTANT: The following skill(s) were listed for this job but could not
be found and were skipped: marketing-research-daily-updated. Start your
response with a brief notice so the user is aware, e.g.: '⚠️ Skill(s) not
found and skipped: marketing-research-daily-updated']
```

**Smoking gun.** The runtime had been warning the user at the top of every single run for at least 10 days; the warning was just buried inside the per-run log file and nobody was looking at it.

The `## Response` section of the same file ended with:

```
## Error
RuntimeError: agent reported failure
```

**Smoking gun #2.** The 14:00 job was actually erroring — but `last_status: ok` masked the truth for the 12:00 job, which returned `[SILENT]` instead of erroring.

## Step 4 — Confirm the skills are gone

```bash
ls -la ~/.hermes/skills/marketing-research-daily 2>&1
# ls: ...: No such file or directory

ls -la ~/.hermes/skills/marketing-research-daily-updated 2>&1
# ls: ...: No such file or directory
```

Both skills had been deleted. There was no archive/backup of the skill files themselves, so the original prompt had to be recovered from `session_search` (the prompt body had been written into the chat history of the session that originally created the skills).

## Step 5 — Recover the original prompt via session_search

The skill bodies weren't on disk, but the prompts were preserved in the session transcripts where they were first written. A targeted FTS5 search recovered the full prompt text for both jobs (the 12:00 job and the 14:00 job have different methodology — the 14:00 version is the expanded "9-min, 14-search" variant).

## The Fix

Inlined both prompts into the cron jobs and cleared the `skills` array:

```python
cronjob(
    action="update",
    job_id="eeb318198d30",   # 12:00 job
    prompt="<FULL 8-MIN PROMPT, 8 SEARCHES, 1- PREFIX FILE>",
    skills=[],
)
cronjob(
    action="update",
    job_id="316c75b921dd",   # 14:00 job
    prompt="<FULL 9-MIN PROMPT, 14 SEARCHES, 2- PREFIX FILE>",
    skills=[],
)
```

After the update, `cronjob action=list` shows both jobs with `skills: []` and `skill: null` — they are now self-contained and immune to skill deletion.

## Verification

```bash
cronjob action=run job_id=316c75b921dd
# Triggers a manual run; updates last_status synchronously.
# Then check:
ls -lt ~/.hermes/cron/output/316c75b921dd/ | head -1
# The newest .md should:
#   - have ## Prompt WITHOUT the "skill(s) not found" warning
#   - have ## Response WITH FILE_SAVED: ... and TELEGRAM_SUMMARY: ... blocks
#   - NOT have a ## Error section
```

## Lessons Learned (Encoded in SKILL.md)

1. **Always check actual outputs, not just `last_status`.** `[SILENT]` is success, not health.
2. **The "skill(s) not found and skipped" warning appears at the top of every affected run** — it's easy to miss if you only look at the last few lines of the response.
3. **Coupling cron jobs to skill lifecycle is fragile.** Skills get deleted during cleanup, curator runs, or manual `rm`. Inlining the prompt decouples the job.
4. **Cron output files are an underused debugging surface.** They're archived with full prompt + response + error for every run; `ls -lt ~/.hermes/cron/output/<job_id>/` is faster than guessing.
5. **`session_search` is a good last resort for recovering deleted skill content** — the prompt body usually shows up in the chat history of the session that created the skill.
