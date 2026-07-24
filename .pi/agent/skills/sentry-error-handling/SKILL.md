---
name: "sentry-error-handling"
disable-model-invocation: true
description: "Use when a user asks to investigate, debug, or fix errors reported in Sentry; fetch error details, analyze stack traces, identify root cause, and implement fixes with user approval. Integrates with Sentry CLI and API for comprehensive error analysis."
---

# Sentry Error Handling & Debugging

## Overview

When Sentry alerts or errors are reported, use this skill to systematically investigate, analyze, and help fix issues. The skill integrates with Sentry CLI (`sentry-cli`) and Sentry API to fetch error details, analyze stack traces, identify affected components, and guide users through resolution.

**Triggers:**
- "Sentry alert"
- "Fix error from Sentry"
- "Debug Sentry error"
- "Investigate Sentry issue"
- "Sentry error monitoring"
- "Check Sentry events"

## Prerequisites

1. **Sentry CLI Installation** (recommended):
   ```bash
   # macOS
   brew install sentry-cli

   # Other platforms
   curl -sL https://sentry.io/get-cli/ | bash
   ```

2. **Sentry Authentication**:
   ```bash
   sentry-cli login
   # Or set environment variable:
   export SENTRY_AUTH_TOKEN=<your-auth-token>
   export SENTRY_ORG=<your-organization-slug>
   export SENTRY_PROJECT=<your-project-slug>
   ```

3. **Required Permissions**: Ensure the auth token has `project:read` and `event:read` scopes.

## Inputs

- `issue_id`: Sentry issue ID or short ID (e.g., "12345" or "PROJECT-123")
- `project`: Project slug (optional; can use environment or default)
- `org`: Organization slug (optional; can use environment or default)
- `environment`: Filter by environment (e.g., "production", "staging")
- `limit`: Number of events to fetch (default: 10)
- `since`: Time filter (e.g., "24h", "7d")

## Quick Start

```bash
# Using the skill script directly
python "<path-to-skill>/scripts/sentry_error_investigator.py" --issue-id "12345" --limit 5

# With environment filter
python "<path-to-skill>/scripts/sentry_error_investigator.py" --issue-id "PROJECT-123" --environment production

# Get recent errors
python "<path-to-skill>/scripts/sentry_error_investigator.py" --recent-errors --limit 20

# Fetch specific event
python "<path-to-skill>/scripts/sentry_error_investigator.py" --event-id "abcdef123456"
```

## Workflow

### 1. Gather Error Context

**User provides:**
- Sentry issue ID or alert link
- Project name (if not in environment)
- Timeframe of interest

**Action:**
- Verify Sentry authentication: `sentry-cli auth status`
- If not authenticated, ask user to run `sentry-cli login` or set environment variables
- Extract issue ID from user input (could be URL like `https://sentry.io/organizations/org/issues/12345/`)

### 2. Fetch Error Details

**Primary method** (using sentry-cli):
```bash
# Get issue details
sentry-cli issues get <issue_id> --org <org> --project <project>

# Get recent events for the issue
sentry-cli events list <issue_id> --org <org> --project <project> --limit <n>

# Get specific event with stacktrace
sentry-cli events get <event_id> --org <org> --project <project>
```

**Alternative** (API-based, bundled script):
```bash
python "<path-to-skill>/scripts/sentry_error_investigator.py" \
  --issue-id <issue_id> \
  --limit 10 \
  --output json
```

### 3. Analyze Stack Trace

From the fetched data:
- Identify exception type and message
- Extract top stack frames (culprit file/line)
- Look for patterns across multiple events
- Check for:
  - Null pointer exceptions
  - API failures (HTTP status codes, timeout)
  - Database connection issues
  - Memory/performance issues
  - Third-party service failures

**Summarize:**
- Error frequency and trend
- First seen / last seen
- Number of affected users
- Environment breakdown (production/staging)
- Suspected root cause based on stack trace

### 4. Correlate with Code

If stack trace points to a specific file:
- Recommend examining that file in the codebase
- Suggest checking recent changes that might have introduced the error
- Look for:
  - Null safety issues
  - Missing error handling
  - API contract violations
  - Race conditions
  - Resource leaks

### 5. Propose Fix Plan

Create a concise plan:
1. **Investigation**: What to check in the codebase
2. **Root cause**: Analysis conclusion
3. **Fix**: Suggested code changes
4. **Validation**: How to test the fix (repro steps, test cases)
5. **Prevention**: Measures to avoid recurrence (better error handling, monitoring, tests)

**Get explicit approval** before implementing changes.

### 6. Implement & Verify

After approval:
- Apply the fix to the code
- Suggest creating a test case that reproduces the error and validates the fix
- Recommend deploying to staging first and monitoring Sentry
- After deployment, verify error frequency decreases in Sentry

### 7. Re-monitor

- Wait a reasonable period (depending on error frequency)
- Re-run the sentry query to confirm the issue is resolved
- Check for any new related errors

## Bundled Resources

### scripts/sentry_error_investigator.py

Comprehensive Python script for Sentry error investigation.

**Features:**
- Fetch issue details and recent events
- Parse and format stack traces
- Identify top culprits
- Export to JSON or markdown
- Aggregate statistics (frequency, users, environment)

**Usage:**
```bash
python scripts/sentry_error_investigator.py \
  --issue-id 12345 \
  --limit 20 \
  --output markdown

python scripts/sentry_error_investigator.py \
  --recent-errors \
  --limit 50 \
  --since 24h
```

**Arguments:**
- `--issue-id`: Sentry issue ID (required for specific issue)
- `--event-id`: Specific event ID (optional)
- `--recent-errors`: Fetch recent errors instead of specific issue
- `--limit`: Number of events to fetch (default: 10)
- `--org`: Organization slug (default: $SENTRY_ORG)
- `--project`: Project slug (default: $SENTRY_PROJECT)
- `--environment`: Filter by environment
- `--since`: Time filter (e.g., "24h", "7d")
- `--output`: Output format: "json", "markdown", "summary" (default: summary)
- `--verbose`: Show full stack traces

### scripts/sentry_stack_analyzer.sh

Bash script to quickly analyze stack trace patterns from multiple events.

**Usage:**
```bash
bash scripts/sentry_stack_analyzer.sh < event_data.json
# or pipe from sentry-cli
sentry-cli events list <issue_id> --json | bash scripts/sentry_stack_analyzer.sh
```

**Output:**
- Top exception types
- Most frequent culprit files
- Common error patterns

## Examples

### Example 1: Debugging a Production Null Pointer Exception

**User:**
> "We got a Sentry alert for issue PROJECT-456. It's a null pointer in UserProfile.swift. Can you help debug?"

**Skill Actions:**
1. Verify auth: `sentry-cli auth status`
2. Fetch issue: `sentry-cli issues get PROJECT-456`
3. Fetch recent events: `sentry-cli events list PROJECT-456 --limit 10`
4. Parse stack traces, find:
   ```
   Error: Unexpectedly found nil while unwrapping an Optional
   at UserProfileViewController.viewDidLoad() line 42
   Culprit: UserProfileViewController.swift:42
   ```
5. Summarize: "Null pointer in viewDidLoad when accessing user profile image. Likely user data not loaded before UI update. Check API response handling."
6. Plan: "Add optional binding, show placeholder if image missing. Create unit test for nil data scenario."
7. Get approval, implement, deploy, monitor.

### Example 2: Investigating Spiking Error Rates

**User:**
> "Sentry shows errors spiking in the last hour. What's going on?"

**Skill Actions:**
1. Use recent-errors mode: `sentry_error_investigator.py --recent-errors --since 1h --limit 50`
2. Group by issue ID, find top error
3. Fetch details for top issue
4. Identify it's a database timeout error affecting 10% of requests
5. Correlate with deployment time (check git log around the spike)
6. Suggest: "Recent database connection pool change likely too aggressive. Roll back connection limit, monitor pool metrics."
7. Create plan for approval.

### Example 3: API Integration Failure

**User:**
> "Sentry alert: Payment API returning 429 on all transactions. Fix needed."

**Skill Actions:**
1. Fetch error events with that issue ID
2. Parse logs: "Stripe API responded with status 429 (Too Many Requests)"
3. Check if error includes headers like `Retry-After`
4. Identify: No retry logic in payment service
5. Plan: "Add exponential backoff retry (max 3 attempts). Add rate limit headers to logging. Monitor API response codes in Sentry."
6. Implement fix, deploy, verify 429 errors eliminated.

## References

- **Sentry CLI Documentation**: https://docs.sentry.io/platforms/cli/
- **Sentry API Reference**: https://docs.sentry.io/api/
- **Error Issue Management**: https://docs.sentry.io/product/issues/
- **Stack Trace Parsing Guide**: https://docs.sentry.io/platforms/guides/stacktrace/
- **Best Practices for Debugging**: https://docs.sentry.io/product/issues/issue-stream/
- **Sentry Webhooks & Alerts**: https://docs.sentry.io/product/alerts/

### Sentry Command Reference

```bash
# Authentication
sentry-cli auth status
sentry-cli login

# Issues
sentry-cli issues list [--project PROJECT] [--query QUERY]
sentry-cli issues get ISSUE_ID
sentry-cli issues resolve ISSUE_ID
sentry-cli issues ignore ISSUE_ID

# Events
sentry-cli events list ISSUE_ID [--limit N]
sentry-cli events get EVENT_ID
sentry-cli events raw EVENT_ID

# Releases
sentry-cli releases list
sentry-cli releases describe VERSION

# Source Maps (for JavaScript)
sentry-cli releases files VERSION upload-sourcemaps ./dist/ --url-prefix '~/'

# Debug Information (for native)
sentry-cli upload-dif
```

## Notes

- Always get explicit user approval before making code changes
- Keep Sentry tokens secure; never commit to repository
- Consider environment-specific issues (production vs development)
- For performance issues, check `sentry-cli issues list --query 'tag[perf]'` if performance tags exist
- When in doubt about the cause, gather more events before concluding
- Use `--verbose` with scripts for detailed analysis

## Troubleshooting

**"sentry-cli: command not found"**
→ Install Sentry CLI: https://docs.sentry.io/platforms/cli/

**Authentication errors**
→ Run `sentry-cli login` or set `SENTRY_AUTH_TOKEN` environment variable
→ Verify token has proper scopes in Sentry organization settings

**"Issue not found"**
→ Check organization and project slugs with `sentry-cli projects list`
→ Use `--org` and `--project` flags explicitly

**No events returned**
→ Issue may be resolved or outside retention period
→ Check environment filter; try removing it

**API rate limits**
→ Implement delays between API calls if processing many issues
→ Use cached data for repeated queries

---

**Skill Version**: 1.0.0
**Author**: Andrei Tarnovski
**Compatible With**: Sentry CLI 2.0+, Sentry API v0
**Category**: Development Tools / Error Monitoring
