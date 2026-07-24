# Writing Files and Telegram Output in Cron Jobs

When a cron job is expected to produce a file (e.g., a research report), the prompt must include explicit instructions to:
1. Call `write_file()` to save the result.
2. After a successful write, output the exact `FILE_SAVED:` and `TELEGRAM_SUMMARY:` block so the Hermes gateway can deliver both the file and a summary to Telegram.

## Required Prompt Steps

### Step 1: Save the file
Use `write_file()` with the target path, inserting today's date in the filename.
Example:
```python
write_file(
    path="/Users/andreitarnovski/Library/CloudStorage/GoogleDrive-andrei@tarnovski.com/Shared drives/Admin T.com/_Work/_Other/_comms/2-marketing-research-YYYY-MM-DD.md",
    content=report_markdown
)
```
Replace `YYYY-MM-DD` with the actual date (the prompt should compute it or instruct the agent to do so).

### Step 2: Output the delivery block
After `write_file()` succeeds, the agent's **final response** must be exactly:
```
FILE_SAVED: /full/path/to/file.md
TELEGRAM_SUMMARY:
📊 Marketing Research — Month DD, YYYY
• Top story: [1-line insight with source]
• Key trend: [1-line insight validated by thought leader]
• Insight: [1-line insight with publication]
• Paper: [1-line insight with arXiv link]
```
- No extra text before or after this block.
- The summary bullets should reflect the key points from the report.
- If `write_file()` fails, output:
```
FILE_SAVE_FAILED: [reason]
TELEGRAM_SUMMARY:
📊 Marketing Research — Month DD, YYYY
• Top story: [1-line insight with source]
• Key trend: [1-line insight validated by thought leader]
• Insight: [1-line insight with publication]
• Paper: [1-line insight with arXiv link]
```
- If there is genuinely nothing to report, output exactly `[SILENT]` and nothing else.

## Why This Matters
- The Hermes gateway looks for the `FILE_SAVED:` line to attach the file to the Telegram message.
- It then parses the `TELEGRAM_SUMMARY:` block to send as the message body.
- Missing or malformed output results in no file delivery, even if the file was written correctly.
- The `execute_code` and `memory` tools are disabled in cron mode; rely only on `web`, `file`, and related toolsets.

## Verification
After a cron run, check the agent log for:
-visible in the file write and output.
You can also manually trigger a run with `cronjob action=run job_id=<id>` and inspect the immediate response.