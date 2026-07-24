# Sentry CLI Quick Reference

## Installation

### macOS
```bash
brew install sentry-cli
```

### Linux/macOS (curl)
```bash
curl -sL https://sentry.io/get-cli/ | bash
```

### Windows (PowerShell)
```powershell
iwr https://sentry.io/get-cli/ | iex
```

### Verify installation
```bash
sentry-cli --version
```

## Authentication

### Interactive login
```bash
sentry-cli login
```

### Environment variables (CI/CD)
```bash
export SENTRY_AUTH_TOKEN=your_token_here
export SENTRY_ORG=your-org-slug
export SENTRY_PROJECT=your-project-slug
```

### Check authentication status
```bash
sentry-cli auth status
```

## Issues Management

### List issues
```bash
# All issues
sentry-cli issues list

# Filter by status
sentry-cli issues list --status=unresolved
sentry-cli issues list --status=resolved

# Filter by query
sentry-cli issues list --query "is:unresolved issue.priority:[high,medium]"
sentry-cli issues list --query "error.type:TypeError"

# Limit results
sentry-cli issues list --limit 20

# JSON output
sentry-cli issues list --json
```

### Get specific issue
```bash
sentry-cli issues get <issue-id>
sentry-cli issues get <issue-id> --json
```

### Update issue
```bash
# Resolve
sentry-cli issues resolve <issue-id>

# Ignore
sentry-cli issues ignore <issue-id> --comment "Won't fix"

# Set priority
sentry-cli issues set <issue-id> --priority=high

# Assign
sentry-cli issues assign <issue-id> --owner="user@example.com"
```

## Events (Error Instances)

### List events for an issue
```bash
sentry-cli events list <issue-id> --limit 10
sentry-cli events list <issue-id> --limit 50 --json
sentry-cli events list <issue-id> --environment production
```

### Get specific event
```bash
sentry-cli events get <event-id>
sentry-cli events get <event-id> --json  # Structured data
sentry-cli events get <event-id> --log   # Just the log
```

### Get raw event data
```bash
sentry-cli events raw <event-id>
```

## Releases

### List releases
```bash
sentry-cli releases list
sentry-cli releases list --project=<project>
```

### Describe release
```bash
sentry-cli releases describe <version>
sentry-cli releases describe <version> --json
```

### Create new release
```bash
sentry-cli releases new <version>
sentry-cli releases new <version> --project=<project>
```

### Upload sourcemaps (JavaScript)
```bash
# Create release first
sentry-cli releases new my-app@1.2.3

# Upload sourcemaps
sentry-cli releases files my-app@1.2.3 upload-sourcemaps ./dist/ \
  --url-prefix '~/static/js'

# Finalize (makes release active)
sentry-cli releases finalize my-app@1.2.3
```

### Upload debug info (Native symbols)
```bash
# For iOS/macOS dSYMs
sentry-cli upload-dif ./dSYMs/

# For Windows PDBs
sentry-cli upload-dif ./pdb/
```

### Deploy release
```bash
sentry-cli releases deploys <version> new --env production
sentry-cli releases deploys <version> list
```

## Projects

### List projects
```bash
sentry-cli projects list
sentry-cli projects list --org <org>
```

### Get project details
```bash
sentry-cli projects describe <project>
```

## Organizations

### List orgs
```bash
sentry-cli organizations list
```

## Profiles (Performance)

### List profiles
```bash
sentry-cli profiles list <transaction-id>
```

## Common Workflows

### Investigate a Sentry alert
```bash
# 1. Extract issue ID from alert URL
ISSUE_ID=$(echo "$SENTRY_ALERT_URL" | grep -o '[0-9]*$')

# 2. Get issue details
sentry-cli issues get $ISSUE_ID

# 3. Get recent events
sentry-cli events list $ISSUE_ID --limit 10

# 4. Get full event with stacktrace
sentry-cli events get <event-id>
```

### Find all errors from a specific file
```bash
sentry-cli issues list --query "culprit:UserProfileViewController.swift" --limit 20
```

### Correlate errors with release
```bash
# Check which release introduced the error
sentry-cli releases list --limit 10

# Get stats per release
for release in $(sentry-cli releases list --json | jq -r '.[].version'); do
  echo "Release: $release"
  sentry-cli issues list --query "release:$release" --limit 5
done
```

### Monitor new errors in last hour
```bash
sentry-cli issues list --query "firstSeen:-1h" --limit 50
```

### Bulk resolve old resolved issues
```bash
sentry-cli issues list --status=resolved --query "firstSeen:-30d" --json | \
  jq -r '.[].shortId' | xargs -I {} sentry-cli issues resolve {}
```

## Tips & Tricks

### Use jq for JSON processing
```bash
# Extract all exception types
sentry-cli events list <issue-id> --json | jq -r '.[].exception.values[0].type'

# Get unique user count
sentry-cli events list <issue-id> --json | jq -r '.[].user.id' | sort -u | wc -l

# Filter by environment
sentry-cli events list <issue-id> --json | jq -r '.[] | select(.tags[]?.key=="environment" and .tags[].value=="production")'
```

### Pipe to pager for long outputs
```bash
sentry-cli issues list | less -R
```

### Time formatting
```bash
# Human readable timestamps
sentry-cli events get <event-id> --json | jq '.dateCreated'
```

## Troubleshooting

### "Command failed: HTTP 403"
- Token doesn't have required scopes
- Generate new token with `project:read`, `event:read`, `issue:read`

### "No default project set"
- Set `SENTRY_PROJECT` environment variable
- Or use `--project` flag on every command

### "Rate limit exceeded"
- Backoff and retry
- Reduce number of API calls
- Cache responses

### JSON output parsing errors
- Some commands might not support `--json` flag
- Check command help: `sentry-cli <command> --help`

## Configuration

### Set defaults
```bash
# Set default organization
sentry-cli config set default-org my-org

# Set default project
sentry-cli config set default-project my-project
```

### Config file location
```
~/.sentryclirc (Linux/macOS)
%APPDATA%\sentry-cli\config (Windows)
```

## Getting Help

```bash
sentry-cli --help
sentry-cli <command> --help
sentry-cli doctors  # Diagnose common issues
```

## Official Documentation

- Full CLI docs: https://docs.sentry.io/platforms/cli/
- API reference: https://docs.sentry.io/api/
- Query syntax: https://docs.sentry.io/product/issues/issue-search/
