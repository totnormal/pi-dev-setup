# Sentry Error Handling Skill

A comprehensive Claude Code skill for investigating, debugging, and resolving errors reported in Sentry.

## Overview

This skill provides automated workflows for Sentry error monitoring and debugging. It integrates with the Sentry CLI and API to fetch error details, analyze stack traces, identify root causes, and guide you through implementing fixes.

## Triggers

The skill automatically activates when you use phrases like:
- "Sentry alert"
- "Fix error from Sentry"
- "Debug Sentry error"
- "Investigate Sentry issue"
- "Sentry error monitoring"
- "Check Sentry events"

## Features

- **Error Investigation**: Automatically fetch and analyze Sentry issues and events
- **Stack Trace Analysis**: Parse and summarize stack traces to identify culprit files
- **Pattern Detection**: Recognize common error patterns (null pointers, timeouts, etc.)
- **API Integration**: Works with both Sentry CLI and direct API calls
- **Comprehensive Scripts**:
  - `sentry_error_investigator.py` - Main Python script for error analysis
  - `sentry_stack_analyzer.sh` - Bash script for stack trace pattern analysis
- **Examples**: Detailed examples for native crashes, API timeouts, React errors, database issues
- **References**: Complete Sentry CLI and API documentation

## Prerequisites

### Required
- Sentry account with access to the organization
- Authentication token with `project:read` and `event:read` scopes

### Recommended
- **Sentry CLI** installed:
  ```bash
  brew install sentry-cli  # macOS
  ```

  Or:
  ```bash
  curl -sL https://sentry.io/get-cli/ | bash
  ```

- Python 3.8+ with packages:
  ```bash
  pip install sentry-sdk requests rich
  ```

  (The scripts work without these packages but will have limited functionality)

## Setup

1. **Authenticate**:
   ```bash
   sentry-cli login
   ```

   Or set environment variables:
   ```bash
   export SENTRY_AUTH_TOKEN="your_token"
   export SENTRY_ORG="your-org-slug"
   export SENTRY_PROJECT="your-project-slug"
   ```

2. **Verify installation**:
   ```bash
   sentry-cli --version
   sentry-cli auth status
   ```

## Usage

### Automatic (Claude Code Integration)

When you receive a Sentry alert, simply describe the issue to Claude:

> "I got a Sentry alert for issue PROJECT-123. It's a null pointer in UserProfileViewController. Can you debug it?"

Claude will automatically:
1. Fetch the issue details
2. Get recent events
3. Analyze stack traces
4. Provide a summary with root cause hypothesis
5. Suggest fix plan
6. Wait for approval before implementing changes

### Manual Script Usage

You can also run the scripts directly:

```bash
# Investigate a specific issue
python scripts/sentry_error_investigator.py \
  --issue-id PROJECT-123 \
  --limit 10 \
  --output markdown

# Get recent unresolved errors
python scripts/sentry_error_investigator.py \
  --recent-errors \
  --limit 20 \
  --since 24h

# Fetch specific event with full details
python scripts/sentry_error_investigator.py \
  --event-id abc123def456 \
  --verbose

# Export to JSON for further analysis
python scripts/sentry_error_investigator.py \
  --issue-id PROJECT-123 \
  --output json \
  --output-file analysis.json
```

### Stack Trace Analysis

Pipe event data to the analyzer script:

```bash
# Get events and analyze patterns
sentry-cli events list PROJECT-123 --limit 50 --json | \
  bash scripts/sentry_stack_analyzer.sh --limit 10

# Output shows:
# - Top exception types
# - Most frequent culprit files
# - Common error messages
# - Environment distribution
# - Time patterns
```

## Directory Structure

```
sentry-error-handling/
├── SKILL.md                # Skill definition (this file is the core spec)
├── README.md               # This overview
├── scripts/
│   ├── sentry_error_investigator.py   # Main investigation script
│   └── sentry_stack_analyzer.sh       # Stack pattern analyzer
├── examples/
│   ├── debug_native_crash.md          # iOS/macOS crash debugging
│   ├── api_timeout_debug.md           # API timeout investigation
│   ├── react_js_debug.md              # React/JS error debugging
│   └── database_connection_debug.md   # Database pool exhaustion
└── references/
    ├── SENTRY_CLI_REFERENCE.md        # Complete CLI command reference
    ├── SENTRY_API_REFERENCE.md        # API endpoint documentation
    └── ERROR_PATTERNS_GUIDE.md        # Common errors & debugging patterns
```

## Skill Workflow

When invoked, the skill follows this process:

1. **Authentication Check**: Verify `sentry-cli auth status` or API token
2. **Issue Identification**: Extract issue ID from user input or alert URL
3. **Data Fetching**: Retrieve issue details and recent events
4. **Analysis**: Parse stack traces, group by patterns, identify top culprits
5. **Contextualization**: Correlate with codebase, check recent changes
6. **Plan Creation**: Draft fix plan with steps and validation criteria
7. **Approval**: Request explicit user approval before code changes
8. **Implementation**: Apply fixes after approval
9. **Verification**: Monitor post-deployment to confirm resolution

## Examples

### Debugging a Production Error

```
User: "We got a Sentry alert: TypeError in ProductCard component. Can you fix it?"

Claude (using skill):
1. Fetches issue details: `sentry-cli issues get PROJECT-123`
2. Gets 10 recent events
3. Analyzes stack traces showing: ProductCard.js:28, "undefined.map"
4. Summarizes: "5 users affected in last hour. Error: Cannot read property 'map' of undefined at ProductCard.js line 28. Likely product data not loaded before render."
5. Creates plan:
   - Check ProductCard.js for state initialization
   - Add optional chaining or null guard
   - Add loading state
   - Write test case
6. Asks: "Shall I implement this fix?"
7. After approval: edits ProductCard.js, adds test
8. Recommends: "Deploy to staging first, monitor Sentry for 2 hours"
```

### Investigating Spiking Error Rates

```
User: "Sentry error rate doubled in the last hour. What's wrong?"

Claude (using skill):
1. Uses --recent-errors mode to fetch top issues from last hour
2. Identifies one issue with massive spike: Database timeout errors
3. Fetches all events for that issue
4. Analyzes: All timeouts from production, correlation with batch job at 14:00
5. Summarizes: "Database connection pool exhaustion affecting 30% of requests since 14:00"
6. Suggests: "Batch job running long queries holding connections. Check job logs, consider increasing pool size temporarily"
7. Recommends monitoring and creates plan to optimize batch queries
```

## Integration with Other Tools

### GitHub Actions / CI

Use the investigator script in CI to fail builds on new errors:

```yaml
- name: Check Sentry for new errors
  run: |
    python scripts/sentry_error_investigator.py \
      --recent-errors \
      --since 1h \
      --query "firstSeen:-1h" \
      --limit 1 | grep -q "new error" && exit 1 || exit 0
```

### Webhooks

Configure Sentry webhooks to trigger notifications that include trigger phrases for Claude:

- Set up webhook for `issue.created` or `event.created`
- Webhook payload includes issue URL and details
- Forward to Claude with context: "Sentry alert: [issue details]. Investigate please."

### Monitoring Dashboard

Export analysis regularly:

```bash
# Daily report of all new errors
python scripts/sentry_error_investigator.py \
  --query "firstSeen:-24h" \
  --output json \
  --output-file "reports/errors-$(date +%Y-%m-%d).json"
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `sentry-cli: command not found` | Install: https://docs.sentry.io/platforms/cli/ |
| Authentication errors | Run `sentry-cli login` or set `SENTRY_AUTH_TOKEN` |
| "Issue not found" | Verify organization and project slugs with `sentry-cli projects list` |
| No events returned | Issue may be resolved; try `--include-resolved` flag |
| API rate limits | Add delays between calls, cache responses |
| JSON parsing errors | Use `--json` flag only on supported commands |

## Best Practices

1. **Always authenticate** before running investigations
2. **Use explicit project/org** flags if multiple projects exist
3. **Limit event fetching** (10-20 is usually sufficient for patterns)
4. **Export to JSON** for archival or further analysis
5. **Run the analyzer** to quickly see patterns
6. **Get approval** before making any code changes
7. **Monitor after deployment** to verify fix effectiveness
8. **Use Sentry releases** to correlate errors with versions
9. **Add context** in your code (tags, extra data) to make debugging easier
10. **Configure alerts** to notify the right team channels

## References

- **Sentry CLI Docs**: `references/SENTRY_CLI_REFERENCE.md`
- **API Reference**: `references/SENTRY_API_REFERENCE.md`
- **Error Patterns**: `references/ERROR_PATTERNS_GUIDE.md`
- **Examples**: `examples/` directory
- **Official Sentry Docs**: https://docs.sentry.io/

## Version

- Skill Version: 1.0.0
- Compatible with: Sentry CLI 2.0+, Sentry API v0
- Category: Dev Tools / Error Monitoring

---

**Note**: This skill is designed to assist with error investigation, not replace proper monitoring and alerting. Always follow your team's incident response procedures.
