# Basic Usage Examples

## Quick Start

```bash
# 1. Test your authentication
skill: gh-address-comments test-auth

# 2. Interactive addressing of PR comments
skill: gh-address-comments interactive --pr=123

# 3. Or use specific commands
skill: gh-address-comments analyze --pr=123
skill: gh-address-comments plan --pr=123 --output=fix-plan.md
```

## Common Workflows

### New reviewer feedback

When you receive review comments and want to address them systematically:

```bash
# See what needs to be done
skill: gh-address-comments analyze --pr=123

# Generate a plan to share with your team
skill: gh-address-comments plan --pr=123 > pr-123-fixes.md

# After implementing the fixes, create a commit
skill: gh-address-comments fix --pr=123 --type=suggestion --message="fix: implement reviewer suggestions"

# Push your changes
git push origin HEAD
```

### Addressing specific comments

When you need to target specific comments:

```bash
# List all comments with their IDs
skill: gh-address-comments analyze --pr=123

# Address comment ID 456789
skill: gh-address-comments fix --pr=123 --comment-id=456789
```

### Team workflow

For teams that want to distribute review feedback:

```bash
# Export comment analysis for team discussion
skill: gh-address-comments analyze --pr=123 --format=json > comments.json

# Generate fix plan to assign tasks
skill: gh-address-comments plan --pr=123 --output=plan.md

# Each team member can address their assigned comments
skill: gh-address-comments fix --pr=123 --type=suggestion
```

## CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
name: Comment Analysis
on:
  pull_request:
    types: [opened, reopened, ready_for_review]

jobs:
  analyze-comments:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install gh CLI
        run: sudo apt-get install gh
      - name: Authenticate gh
        run: gh auth login --with-token <<< "${{ secrets.GITHUB_TOKEN }}"
      - name: Analyze PR comments
        run: |
          PR_NUMBER=${{ github.event.pull_request.number }}
          skill: gh-address-comments analyze --pr=$PR_NUMBER --format=markdown > comments-analysis.md
          cat comments-analysis.md
```

## Advanced Patterns

### Multiple fix commits by category

```bash
# First, create commit for all suggestions
skill: gh-address-comments fix --pr=123 --type=suggestion --message="fix: address code suggestions"
git push origin HEAD

# Then, create commit for all issues
skill: gh-address-comments fix --pr=123 --type=issue --message="fix: resolve reported issues"
git push origin HEAD
```

### Dry-run mode (see what would happen)

```bash
skill: gh-address-comments fix --pr=123 --type=suggestion --dry-run
```

This shows what comments would be addressed without creating any commit.

### Using with different repositories

```bash
# Set repository explicitly
skill: gh-address-comments analyze --pr=123 --repo=owner/repo

# Or set environment variable
export GITHUB_REPOSITORY=owner/repo
skill: gh-address-comments analyze --pr=123
```

## Troubleshooting Common Scenarios

### No comments found

- Verify PR number is correct
- Check you're in the right repository
- Ensure PR has review comments (not just review summaries)

### Authentication errors

```bash
# Re-authenticate
gh auth logout
gh auth login
```

### Branch issues

```bash
# If branch not found, fetch it
git fetch origin target-branch:target-branch
```

## Shell Integration

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
# Alias for quick access
alias pr-analyze='skill: gh-address-comments analyze --pr=${1}'
alias pr-fix='skill: gh-address-comments fix --pr=${1} --type=${2}'
```

Usage:

```bash
pr-analyze 123
pr-fix 123 suggestion
```

## Scripting Examples

### Bulk address all open PRs

```bash
#!/bin/bash
# Find all open PRs and analyze their comments

repo="owner/repo"
pr_list=$(gh pr list --repo "$repo" --json number --jq '.[].number')

for pr in $pr_list; do
    echo "=== PR #$pr ==="
    skill: gh-address-comments analyze --pr="$pr" --repo="$repo" | head -20
    echo ""
done
```

### Generate weekly report

```bash
#!/bin/bash
# Generate a weekly report of PR comment activity

repo="owner/repo"
week_ago=$(date -v-7d +%Y-%m-%d)

# Get all PRs from last week
prs=$(gh pr list --repo "$repo" --json number,createdAt --jq --arg date "$week_ago" '.[] | select(.createdAt >= $date) | .number')

for pr in $prs; do
    echo "PR #$pr:"
    skill: gh-address-comments analyze --pr="$pr" --repo="$repo"
    echo ""
done > weekly-pr-comment-report.md
```
