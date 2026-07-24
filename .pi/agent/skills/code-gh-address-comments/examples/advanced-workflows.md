# Advanced Workflows

## Comment Categorization Logic

The skill categorizes comments using these heuristics:

| Category | Indicators |
|----------|------------|
| `suggestion` | Contains "suggest", "recommend", "should be", "could be", or uses GitHub's code suggestion syntax (\`\`\`suggestion) |
| `issue` | Default category - reports bugs, problems, or concerns |
| `question` | Contains question words (what, why, how) and ends with ? |
| `praise` | Contains positive words like "great", "nice", "lgtm", "looks good" |

### Customizing Categorization

You can override categorization with custom logic:

```bash
# In the main script, modify categorize_comment() function
# Add your team's specific patterns

# Example: Your team uses "nit:" for nitpicks
if echo "$lower_body" | grep -q "^nit:"; then
    category="nitpick"
fi

# Example: Your team uses "todo:" for items to address later
if echo "$lower_body" | grep -q "^todo:"; then
    category="todo"
fi
```

## Automated Comment Resolution

### Auto-reply with commit reference

Instead of manual replies, automatically include commit SHAs:

```bash
# After creating fix commit
commit_sha=$(git rev-parse HEAD)

# Reply to comments with commit reference
gh pr comment "$pr_number" \
  --body "Fixed in commit $commit_sha. Thanks for the review!" \
  --repo="$REPO"
```

### Batch resolution with status checks

Integrate with GitHub checks:

```bash
# Create a check run
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  "/repos/$REPO/check-runs" \
  -f name='Review Comment Resolution' \
  -f head_sha="$(git rev-parse HEAD)" \
  -f status='completed' \
  -f conclusion='success' \
  -f output.title='All review comments addressed' \
  -f output.summary='Fixed all review suggestions and issues'
```

## Multi-file Comment Handling

When comments span multiple files, the skill can create separate commits:

```bash
# Analyze to see distribution
skill: gh-address-comments analyze --pr=123 --output=analysis.json

# Process analysis to group by file
jq -r '.comments[] | "\(.path) \(.category)"' analysis.json | sort | uniq -c

# Create commits per file group
while read -r file; do
    # Make changes to that file
    # Commit with message referencing the file
    git add "$file"
    git commit -m "fix: address comments in $file"
done < <(jq -r '.comments[].path' analysis.json | sort -u)
```

## Integration with PR Templates

### Adding resolution checklist to PR description

```bash
# Add a "Review Feedback" section to PR
skill: gh-address-comments plan --pr=123 > feedback-todo.md

# Update PR description
pr_body=$(gh pr view 123 --json body --jq '.body')
new_body="$pr_body\n\n## Review Feedback\n\n$(cat feedback-todo.md)"
gh pr edit 123 --body "$new_body"
```

## Rate Limiting Considerations

GitHub API has rate limits:

- Unauthenticated: 60 requests/hour
- Authenticated: 5000 requests/hour

The skill uses `--paginate` for fetching all comments, which can consume many requests.

### Optimizing API usage

```bash
# Cache results
skill: gh-address-comments analyze --pr=123 > analysis.json

# Reuse cached data for multiple operations
skill: gh-address-comments fix --pr=123 --type=suggestion --cache=analysis.json
```

### Error handling for rate limits

```bash
# Check rate limit status
gh api rate_limit

# If near limit, wait
remaining=$(gh api rate_limit --jq '.resources.core.remaining')
if [ "$remaining" -lt 10 ]; then
    reset=$(gh api rate_limit --jq '.resources.core.reset')
    sleep $((reset - $(date +%s) + 10))
fi
```

## Using with GitHub Apps

For automated workflows, consider using a GitHub App with:

1. **Comment resolution permission**
2. **Pull request write permission**
3. **Contents write permission** (for committing)

### Example: Fully automated fix deployment

```bash
#!/bin/bash
# Automated fix application for simple, pattern-based comments

pr_number=$1
repo=$2

# Fetch comments with known patterns
comments=$(gh api "repos/$repo/pulls/$pr_number/comments" --paginate)

# Apply automated fixes
echo "$comments" | jq -r 'select(.body | test("add type annotation"))' | while read -r comment; do
    file=$(echo "$comment" | jq -r '.path')
    line=$(echo "$comment" | jq -r '.line')

    # Apply fix (example: add type to TypeScript)
    # Your custom logic here
    add_type_annotation "$file" "$line"
done

# Commit and push
git add .
git commit -m "fix: automated resolution of common review comments"
git push origin HEAD
```

## Security Best Practices

1. **Never commit secrets** - Review all changes before staging
2. **Use read-only tokens** for analysis operations
3. **Limit scope** - Use fine-grained PATs with only PR/comment permissions
4. **Audit logs** - Keep track of who resolved what comments

### Using fine-grained PATs

Create a GitHub token with only:
- Pull requests: Read & write
- Contents: Read & write (if creating commits)
- Metadata: Read only

Then export it:

```bash
export GITHUB_TOKEN=ghp_your_fine_grained_token
gh auth login --with-token <<< "$GITHUB_TOKEN"
```

## Testing Strategies

### Mock GitHub API responses

Create test fixtures:

```bash
# Save real API response
gh api "repos/owner/repo/pulls/123/comments" > tests/fixtures/pr-123-comments.json

# Test script against fixture
skill: gh-address-comments analyze --pr=123 --fixture=tests/fixtures/pr-123-comments.json
```

### Add --fixture flag support

Modify the script:

```bash
# In fetch_pr_comments():
if [ -n "${FIXTURE:-}" ] && [ -f "$FIXTURE" ]; then
    cat "$FIXTURE"
else
    gh api "repos/$repo/pulls/$pr_number/comments" --paginate
fi
```

## Performance Optimization

For PRs with hundreds of comments:

1. **Filter early**: Use jq filtering before processing
2. **Parallel processing**: Split work by file
3. **Progress indicators**: Show status for long operations

Example parallel processing:

```bash
# Get unique files with comments
files=$(skill: gh-address-comments analyze --pr=123 --format=json | jq -r '.comments[].path' | sort -u)

# Process each file in parallel
echo "$files" | parallel --jobs 4 '
    echo "Processing {}..."
    # Analyze comments in file {}
    # Create targeted changes
'
```

## Monitoring and Logging

Add structured logging:

```bash
# JSON logging for machine consumption
log_json() {
    local level="$1"
    local message="$2"
    echo "{\"timestamp\":\"$(date -Iseconds)\",\"level\":\"$level\",\"message\":$message}" >&2
}

# Usage
log_json "info" "{\"pr\":$pr_number,\"action\":\"analyze\"}"
```

## Conclusion

These advanced patterns enable sophisticated PR comment management workflows. Adapt the skill to your team's specific needs by:

- Customizing categorization logic
- Adding your organization's review patterns
- Integrating with your project management tools
- Implementing automated fix application for common issues
