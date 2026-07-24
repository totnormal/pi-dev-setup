---
name: gh-address-comments
disable-model-invocation: true
description: Analyze and address GitHub PR review comments. Use for "address PR comments", "fix review feedback", "resolve PR comments", and "respond to review". Integrates with gh CLI to fetch comments, categorize feedback, and create targeted commits.
tools: Read, Grep, Bash, Glob
---

# GitHub PR Comment Addressing Skill

A comprehensive skill for analyzing, categorizing, and addressing GitHub pull request review comments. Automates the workflow of reviewing feedback, creating fixes, and updating PRs with resolved changes.

## Authentication & Setup

### Prerequisites

1. **GitHub CLI (gh)**:
   ```bash
   # Install GitHub CLI
   # macOS
   brew install gh

   # Ubuntu/Debian
   sudo apt-get install gh

   # Verify installation
   gh --version
   ```

2. **Authenticate with GitHub**:
   ```bash
   gh auth login
   ```
   - Choose GitHub.com or Enterprise
   - Select HTTPS
   - Follow authentication prompts

3. **Verify Setup**:
   ```bash
   skill: gh-address-comments test-auth
   ```

   This will verify your `gh` CLI authentication and repository access.

## Capabilities

### Analyze PR Comments

Fetch and categorize all comments on a PR by type (suggestions, issues, questions):

```
skill: gh-address-comments analyze --pr=123
```

This creates a structured summary of all comments, grouped by file and comment type.

### List Unresolved Comments

Show only comments that still need addressing:

```
skill: gh-address-comments list-unresolved --pr=123
```

### Generate Fix Plan

Automatically analyze comments and suggest a plan for addressing them:

```
skill: gh-address-comments plan --pr=123 --output=plan.md
```

### Create Fix Commits

Address specific comments or all comments in a category:

```
skill: gh-address-comments fix --pr=123 --type=suggestion
skill: gh-address-comments fix --pr=123 --comment-id=456789
```

### Mark Comments as Resolved

After creating fixes, mark comments as resolved (via reply or thread resolution):

```
skill: gh-address-comments resolve --pr=123 --all
skill: gh-address-comments resolve --pr=123 --comment-id=456789
```

### Interactive Mode

Guided interactive workflow for addressing PR comments:

```
skill: gh-address-comments interactive --pr=123
```

This walks through:
1. Fetching and displaying comments
2. Selecting which comments to address
3. Creating commits with appropriate changes
4. Optionally marking comments as resolved

## Usage Examples

### Example 1: Analyze a PR's review comments

```bash
skill: gh-address-comments analyze --pr=123 --format=json > comments-analysis.json
```

### Example 2: Interactive addressing workflow

```bash
skill: gh-address-comments interactive --pr=123
```

### Example 3: Address only code suggestions

```bash
skill: gh-address-comments fix --pr=123 --type=suggestion --message="Addressing review suggestions"
```

### Example 4: Generate a fix plan for team review

```bash
skill: gh-address-comments plan --pr=123 --output=pr-123-fix-plan.md
```

You can then share this plan with your team before implementing.

## Command Reference

| Command | Description | Required Args | Optional Args |
|---------|-------------|---------------|---------------|
| `analyze` | Fetch and categorize all comments | `--pr` | `--format`, `--output` |
| `list-unresolved` | List comments needing attention | `--pr` | `--format` |
| `plan` | Generate fix plan | `--pr` | `--output`, `--format` |
| `fix` | Create commits addressing comments | `--pr` | `--type`, `--comment-id`, `--message`, `--dry-run` |
| `resolve` | Mark comments as resolved | `--pr` | `--all`, `--comment-id` |
| `interactive` | Guided workflow | `--pr` | `--step` |
| `test-auth` | Verify gh CLI authentication | None | None |

## Configuration

The skill supports these environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_REPOSITORY` | Default repository (owner/name) | No (must provide if not in git repo) |
| `GH_HOST` | GitHub Enterprise hostname | No |
| `PR_DEFAULT_BRANCH` | Branch to commit fixes to (default: main) | No |
| `PR_FIX_PREFIX` | Prefix for fix commit messages (default: "fix:") | No |

## Implementation Notes

- Uses `gh api` and `gh pr view` commands for all GitHub interactions
- Comments are categorized by type: `suggestion`, `issue`, `question`, `praise`
- Supports Markdown output with syntax highlighting
- Dry-run mode available for all fix operations
- Can detect and group related comments by file/location
- Handles pagination for PRs with many comments

## Troubleshooting

### "gh: command not found"
Install GitHub CLI as described in Prerequisites.

### "Not authenticated"
Run `gh auth login` to authenticate with GitHub.

### "Could not resolve to a Repository"
Ensure you're in a git repository with a GitHub remote, or set `GITHUB_REPOSITORY` environment variable.

### "No comments found"
The PR may have no review comments, or you may need to specify the correct PR number.

### Rate limiting errors
GitHub API rate limits may be hit. Wait a few minutes before retrying.

## Advanced: Custom Comment Categorization

The skill uses heuristics to categorize comments. You can customize this by:
1. Using custom patterns in comment bodies
2. Training on your team's review style
3. Overriding categories with `--force-type` flag

## Integration with Workflows

### Pre-commit Hook
Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
if [ -n "$PR" ]; then
  skill: gh-address-comments resolve --pr=$PR --all
fi
```

### CI/CD Pipeline
In your GitHub Actions workflow:
```yaml
- name: Address PR comments
  if: github.event_name == 'pull_request'
  run: |
    PR_NUMBER=${{ github.event.pull_request.number }}
    skill: gh-address-comments analyze --pr=$PR_NUMBER --format=markdown
```

---

**Notes**:
- This skill is user-invocable and requires explicit confirmation before making changes
- All destructive operations (commits, comment resolution) have `--dry-run` options
- For bulk operations, use `--format=json` and process programmatically
- Consider using GitHub's built-in "Resolve conversation" feature for manual workflows
- The skill does not automatically push commits; use `git push` after commit creation
