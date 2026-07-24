# GitHub CLI Reference for PR Comment Operations

This document provides a comprehensive reference for the GitHub CLI (`gh`) commands used in the `gh-address-comments` skill.

## Authentication

```bash
# Login interactively
gh auth login

# Login with token
gh auth login --with-token < token.txt

# Check authentication status
gh auth status

# Logout
gh auth logout
```

## Repository Operations

```bash
# Set default repository
gh repo set-cli-remote owner/repo

# View repository
gh repo view [owner/repo]

# Clone repository
gh repo clone owner/repo

# List repositories
gh repo list [owner] --limit 10
```

## Pull Request Operations

### Viewing PRs

```bash
# View specific PR
gh pr view 123 --json number,title,state,user,body,baseRefName,headRefName,url

# View with comments
gh pr view 123 --comments

# List PRs
gh pr list --limit 20 --json number,title,state,url

# List PRs by state
gh pr list --state open
gh pr list --state closed
gh pr list --state merged

# List PRs for current repository
gh pr list

# List PRs for specific repository
gh pr list --repo owner/repo
```

### PR Details JSON Fields

Common fields available via `--json`:

```bash
gh pr view 123 --json \
  number,title,body,state,user,url,html_url,created_at,updated_at,\
  baseRefName,headRefName,headRepository,commits,reviewDecision,\
  additions,deletions,changed_files
```

## Comment Operations

### PR Comments (Review Comments)

```bash
# Get PR comments (all review comments on a PR)
gh api repos/owner/repo/pulls/123/comments

# Get comment threads
gh api repos/owner/repo/pulls/123/comments --paginate

# Get a specific comment
gh api repos/owner/repo/pulls/comments/456789

# Create a comment
gh pr comment 123 --body "This looks good to me!"

# Create a comment on specific line
gh pr comment 123 --body "Consider this change" \
  --path src/file.ts \
  --line 42

# Reply to a comment thread
gh pr comment 123 --body "Fixed in latest commit" \
  --reply-to 456789

# Delete a comment
gh api -X DELETE repos/owner/repo/pulls/comments/456789
```

### Issue Comments (Conversational)

```bash
# Get issue comments (conversational, not tied to code)
gh api repos/owner/repo/issues/123/comments

# Create issue comment
gh issue comment 123 --body "Nice work!"
```

## Review Operations

```bash
# Create a review
gh pr review 123 --approve
gh pr review 123 --request-changes
gh pr review 123 --comment

# Submit a review with body
gh pr review 123 --approve --body "LGTM!"

# Dismiss a review
gh api -X POST repos/owner/repo/pulls/123/reviews/456/dismissals \
  -f message="Review outdated after changes"
```

## Git Operations

```bash
# Checkout PR branch
gh pr checkout 123

# Create a new branch from PR
gh pr checkout 123 --branch my-branch

# Merge PR
gh pr merge 123

# Merge options
gh pr merge 123 --merge      # Create merge commit
gh pr merge 123 --squash     # Squash and merge
gh pr merge 123 --rebase     # Rebase and merge
gh pr merge 123 --delete-branch  # Delete branch after merge

# Close PR
gh pr close 123

# Reopen PR
gh pr reopoen 123
```

## API Operations

### Raw API calls

```bash
# Get PR with specific fields
gh api repos/owner/repo/pulls/123 \
  -q '{number, title, state, user: .user.login}'

# Paginated requests
gh api --paginate repos/owner/repo/pulls

# POST request
gh api -X POST repos/owner/repo/pulls/123/reviews \
  -f body="Looks good" \
  -f event="APPROVE"

# With custom headers
gh api -H "X-Custom-Header: value" repos/owner/repo/pulls

# With GraphQL
gh api graphql -f query='{ viewer { login } }'
```

### Rate limiting

```bash
# Check rate limit
gh api rate_limit

# Core API limit
gh api rate_limit --jq '.resources.core'

# Search API limit
gh api rate_limit --jq '.resources.search'
```

## JSON Processing with jq

The `gh` CLI integrates well with `jq`:

```bash
# Extract specific field
gh pr view 123 --json title --jq '.title'

# Extract multiple fields
gh pr view 123 --json number,title,state --jq '{num: .number, title: .title, state: .state}'

# Filter array
gh pr list --json number,title --jq '.[] | select(.state == "OPEN")'

# Count items
gh pr list --json number --jq 'length'

# Map transformation
gh api repos/owner/repo/pulls/123/comments --jq '.[] | {id: .id, user: .user.login}'
```

## Filtering and Querying

```bash
# By author
gh pr list --author username

# By assignee
gh pr list --assignee username

# By label
gh pr list --label "bug,enhancement"

# By base branch
gh pr list --base main

# By head branch
gh pr list --head feature-branch

# By state
gh pr list --state open

# By review decision
gh pr list --review-required

# By search
gh pr search "fix bug" --json number,title
```

## Template Output

```bash
# Use Go template for custom formatting
gh pr view 123 --template '
  {{- .title -}}
  {{- "\n" -}}
  {{- "State: " -}}{{- .state -}}
  {{- "\n" -}}
  {{- "Author: " -}}{{- .user.login -}}
'

# With fields
gh pr list --json number,title,url --template '{{range .}}{{.number}}: {{.title}} ({{.url}})\n{{end}}'
```

## Common Pipeline Patterns

### Get PR number from branch

```bash
# Get PR for current branch
pr_number=$(gh pr view --json headRefName --jq 'select(.headRefName == "'$(git branch --show-current)'") | .number')

# Or if branch tracks PR
gh pr view --json number --jq 'if .headRefName == "'$(git branch --show-current)'" then .number else empty end'
```

### List files changed in PR

```bash
gh pr view 123 --json files --jq '.[].path'
```

### Get commit SHAs

```bash
# All commits in PR
gh pr view 123 --json commits --jq '.[].sha'

# Latest commit
gh pr view 123 --json headRefName --jq '.headRefName' | xargs git log -1 --oneline
```

### Check if PR is mergeable

```bash
gh pr view 123 --json mergeable --jq '.mergeable'
```

## Environment Configuration

```bash
# Set default host (GitHub Enterprise)
export GH_HOST=ghe.example.com

# Set default repository
export GITHUB_REPOSITORY=owner/repo

# Configure editor for gh
gh config set editor vim

# Set git protocol (https or ssh)
gh config set git_protocol ssh

# Disable prompts
export GH_TOKEN=your_token
export GITHUB_TOKEN=your_token
```

## Troubleshooting

```bash
# Debug mode
gh --debug pr view 123

# Verbose
gh -v pr view 123

# Clear cache
gh api_cache_path  # Find cache location
rm -rf ~/.cache/gh

# Reset config
gh config unset editor
```

## API Rate Limits

| Resource | Limit | Window |
|-----------|-------|--------|
| Core API | 5000 | hour |
| GraphQL | 5000 | hour |
| Search | 30 | minute |
| Authentication | 1000 | hour |

## Useful One-liners

```bash
# Count comments per user
gh api repos/owner/repo/pulls/123/comments --paginate |
  jq -r '.[].user.login' | sort | uniq -c | sort -rn

# Get most recent activity
gh api repos/owner/repo/pulls/123/comments --paginate |
  jq -r '.[] | "\(.created_at) \(.user.login)"' | sort -r | head -10

# Extract all code snippets from comments
gh api repos/owner/repo/pulls/123/comments --paginate |
  jq -r '.[].body' | grep -E '```[a-zA-Z]*' -A100 | head -50

# Find comments with @mentions
gh api repos/owner/repo/pulls/120/comments --paginate |
  jq -r 'select(.body | test("@")) | {user: .user.login, body: .body}'
```

## See Also

- `gh help pr`
- `gh help pr-comment`
- `gh help api`
- GitHub CLI docs: https://cli.github.com/manual/
