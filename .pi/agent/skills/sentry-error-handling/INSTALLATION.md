# Sentry Error Handling Skill - Installation & Verification

## Installation Complete

The `sentry-error-handling` skill has been successfully installed in two locations:

1. **Primary location**: `~/.claude/skills/sentry-error-handling/`
2. **Plugin location**: `~/.claude/plugins/dev-tools/skills/sentry-error-handling/`

## Files Created

### Core Skill Definition
- `SKILL.md` - Complete skill specification with triggers and workflow (335 lines)
- `README.md` - Overview and quick start guide

### Scripts
- `scripts/sentry_error_investigator.py` - Main Python investigation tool (454 lines, executable)
  - Fetches issues and events from Sentry
  - Analyzes stack traces and patterns
  - Supports JSON, Markdown, and summary output
  - Rich terminal formatting when available

- `scripts/sentry_stack_analyzer.sh` - Bash pattern analyzer (110 lines, executable)
  - Parses JSON event data
  - Identifies top exception types, culprit files, functions
  - Detects common error patterns (null errors, timeouts, API errors)
  - Time distribution analysis

### Examples (4 comprehensive guides)
- `examples/debug_native_crash.md` - iOS/macOS crash debugging (EXC_BAD_ACCESS)
- `examples/api_timeout_debug.md` - API timeouts and rate limits (429)
- `examples/react_js_debug.md` - React/JavaScript TypeError debugging
- `examples/database_connection_debug.md` - Database connection pool exhaustion

### References (3 comprehensive documents)
- `references/SENTRY_CLI_REFERENCE.md` - Complete CLI command reference (301 lines)
- `references/SENTRY_API_REFERENCE.md` - API endpoints and usage (345 lines)
- `references/ERROR_PATTERNS_GUIDE.md` - Common errors and solutions (538 lines)

**Total**: 2,763 lines of documentation and code

## Prerequisites Setup

### 1. Install Sentry CLI

```bash
# macOS
brew install sentry-cli

# Or via curl
curl -sL https://sentry.io/get-cli/ | bash

# Verify
sentry-cli --version
```

### 2. Install Python Dependencies (Optional but recommended)

```bash
pip3 install sentry-sdk requests rich
```

### 3. Authenticate

```bash
# Interactive login
sentry-cli login

# Or set environment variables
export SENTRY_AUTH_TOKEN="your_token"
export SENTRY_ORG="your-org-slug"
export SENTRY_PROJECT="your-project-slug"
```

Verify authentication:
```bash
sentry-cli auth status
```

## Verification

### Test the skill script

```bash
# List your projects
sentry-cli projects list

# Fetch a recent issue (replace with actual issue ID)
python3 ~/.claude/skills/sentry-error-handling/scripts/sentry_error_investigator.py \
  --issue-id YOUR_ISSUE_ID \
  --limit 5
```

### Test the analyzer

```bash
# Pipe events to analyzer
sentry-cli events list YOUR_ISSE_ID --limit 20 --json | \
  bash ~/.claude/skills/sentry-error-handling/scripts/sentry_stack_analyzer.sh
```

### Test Claude Code Integration

Restart Claude Code, then try a query like:

> "I got a Sentry alert for issue PROJECT-123. Can you debug it?"

Claude should:
1. Recognize the Sentry context
2. Use the skill to fetch error details
3. Provide analysis and fix suggestions

## Usage Examples

### Quick Investigation
```bash
python3 ~/.claude/skills/sentry-error-handling/scripts/sentry_error_investigator.py \
  --issue-id ABC-123 \
  --limit 10 \
  --output markdown
```

### Recent Errors Report
```bash
python3 ~/.claude/skills/sentry-error-handling/scripts/sentry_error_investigator.py \
  --recent-errors \
  --limit 50 \
  --since 24h > recent_errors.json
```

### Pattern Analysis
```bash
python3 ~/.claude/skills/sentry-error-handling/scripts/sentry_error_investigator.py \
  --issue-id ABC-123 \
  --output json > event_data.json

bash ~/.claude/skills/sentry-error-handling/scripts/sentry_stack_analyzer.sh < event_data.json
```

## Integration Points

### 1. Claude Code Automatic Activation
The skill activates automatically when user queries contain trigger phrases:
- "Sentry alert"
- "Fix error from Sentry"
- "Debug Sentry error"
- "Investigate Sentry issue"

### 2. Direct Script Execution
Run scripts directly from terminal for manual investigations or automation.

### 3. CI/CD Integration
Add to GitHub Actions to prevent deploying with new errors:
```yaml
- name: Check for new Sentry errors
  run: |
    python ~/.claude/skills/sentry-error-handling/scripts/sentry_error_investigator.py \
      --recent-errors \
      --since 1h \
      --query "firstSeen:-1h" | \
      grep -q "new error" && exit 1
```

### 4. Webhooks
Configure Sentry to send alerts to a webhook that forwards to Claude with appropriate context.

## Troubleshooting

### "sentry-cli: command not found"
→ Install Sentry CLI: https://docs.sentry.io/platforms/cli/

### Python import errors
```bash
pip3 install sentry-sdk requests rich
```

### Permission denied on scripts
```bash
chmod +x ~/.claude/skills/sentry-error-handling/scripts/*
```

### "No default project set"
→ Set `SENTRY_PROJECT` environment variable or use `--project` flag

### Authentication failures
→ Verify token scopes in Sentry settings (need project:read, event:read)
→ Regenerate token if necessary

## Next Steps

1. **Set up environment variables** for convenient access:
   ```bash
   echo 'export SENTRY_ORG="your-org"' >> ~/.zshrc
   echo 'export SENTRY_AUTH_TOKEN="your-token"' >> ~/.zshrc
   source ~/.zshrc
   ```

2. **Restart Claude Code** to load the new skill

3. **Test with a real alert**: Next time you get a Sentry notification, ask Claude to investigate

4. **Customize examples**: Review the example guides for your specific stack (iOS, React, Python, etc.)

5. **Integrate into your workflow**:
   - Add to incident response runbooks
   - Use scripts for daily error reviews
   - Incorporate into pre-deploy checks

## Support

For issues with the skill itself, check:
- `README.md` for general usage
- `references/` for detailed documentation
- `examples/` for scenario-specific guidance

For Sentry platform issues, consult:
- Official Sentry docs: https://docs.sentry.io/
- Sentry support: https://sentry.io/support/

---

**Skill Version**: 1.0.0
**Created**: 2025-02-27
**Location**: `~/.claude/skills/sentry-error-handling/`
**Plugin Location**: `~/.claude/plugins/dev-tools/skills/sentry-error-handling/`
