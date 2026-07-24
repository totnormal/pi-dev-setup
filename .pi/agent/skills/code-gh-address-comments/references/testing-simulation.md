# Testing and Simulation Guide

This document outlines strategies for testing the `gh-address-comments` skill in environments without access to real GitHub repositories.

## Test Fixtures

Create test fixtures by capturing real API responses:

```bash
# Authenticate with GitHub
gh auth login

# Fetch PR data
gh pr view 123 --json number,title,state,user,baseRefName,headRefName,url > tests/fixtures/pr-123-detail.json

# Fetch comments
gh api repos/owner/repo/pulls/123/comments --paginate > tests/fixtures/pr-123-comments.json

# Fetch review threads
gh api repos/owner/repo/pulls/123/comments > tests/fixtures/pr-123-review-threads.json
```

Example fixture structure:

```json
[
  {
    "id": 456789,
    "user": {
      "login": "reviewer1",
      "id": 12345
    },
    "body": "Consider using a more descriptive variable name here.",
    "path": "src/auth.ts",
    "position": 24,
    "line": 42,
    "created_at": "2025-02-15T10:30:00Z",
    "html_url": "https://github.com/owner/repo/pull/123#discussion_r456789"
  }
]
```

## Mock Mode

Add mock mode support to the skill:

```bash
# In gh-address-comments script
FIXTURE_DIR="${GH_ADDRESS_COMMENTS_FIXTURES:-$HOME/.cache/gh-address-comments/fixtures}"

fetch_pr_comments() {
    local pr_number="$1"
    local fixture="$FIXTURE_DIR/pr-${pr_number}-comments.json"

    if [ -f "$fixture" ]; then
        cat "$fixture"
    else
        # Fallback to real API
        gh api --paginate "repos/$repo/pulls/$pr_number/comments"
    fi
}
```

Enable mock mode:

```bash
export GH_ADDRESS_COMMENTS_FIXTURES=~/test-fixtures
skill: gh-address-comments analyze --pr=123  # Uses fixture if exists
```

## Test Commands

### Test suite

Create a test script:

```bash
#!/bin/bash
# tests/run-tests.sh

set -e

TEST_DIR="$(cd "$(dirname "$0")" && pwd)"
FIXTURES_DIR="$TEST_DIR/fixtures"
PASSED=0
FAILED=0

# Test 1: Authentication
echo "Test 1: Authentication"
if skill: gh-address-comments test-auth 2>/dev/null; then
    echo "✓ PASSED"
    PASSED=$((PASSED + 1))
else
    echo "✗ FAILED"
    FAILED=$((FAILED + 1))
fi

# Test 2: Analyze with fixture
echo "Test 2: Analyze with fixture"
export GH_ADDRESS_COMMENTS_FIXTURES="$FIXTURES_DIR"
output=$(skill: gh-address-comments analyze --pr=123 2>/dev/null)
if echo "$output" | grep -q "PR Comment Analysis"; then
    echo "✓ PASSED"
    PASSED=$((PASSED + 1))
else
    echo "✗ FAILED"
    FAILED=$((FAILED + 1))
fi

# Test 3: Categorization
echo "Test 3: Comment categorization"
test_comment="This is a suggestion: use const instead of let"
category=$(echo "$test_comment" | categorize_comment)
if [ "$category" = "suggestion" ]; then
    echo "✓ PASSED"
    PASSED=$((PASSED + 1))
else
    echo "✗ FAILED (expected 'suggestion', got '$category')"
    FAILED=$((FAILED + 1))
fi

# Summary
echo ""
echo "=================="
echo "Results: $PASSED passed, $FAILED failed"
echo "=================="

exit $FAILED
```

Run tests:

```bash
bash tests/run-tests.sh
```

## Simulation Scenarios

### Simulate different comment types

Create fixture files with various comment patterns:

```json
// tests/fixtures/scenario-suggestions.json
[
  {
    "id": 1,
    "user": {"login": "senior-dev"},
    "body": "Suggestion: extract this into a helper function",
    "path": "src/index.ts",
    "line": 10
  },
  {
    "id": 2,
    "user": {"login": "senior-dev"},
    "body": "You could also use optional chaining here:\n\n`obj?.prop`",
    "path": "src/utils.ts",
    "line": 25,
    "body": "```suggestion\nif (obj?.prop) {\n  return obj.prop;\n}\n```"
  }
]
```

### Simulate large PRs

Create fixture with many comments:

```bash
# Generate 100 test comments
for i in {1..100}; do
    cat >> tests/fixtures/pr-large.json <<EOF
{
  "id": $i,
  "user": {"login": "reviewer$(( (i % 5) + 1 ))"},
  "body": "Test comment #$i",
  "path": "src/file$(( (i % 10) + 1 )).ts",
  "line": $(( (i % 50) + 1 ))
},
EOF
done
```

### Simulate real PR structure

Create a complete PR fixture:

```bash
cat > tests/fixtures/pr-complete.json <<'EOF'
{
  "number": 123,
  "title": "Add user authentication",
  "state": "OPEN",
  "user": {"login": "developer"},
  "baseRefName": "main",
  "headRefName": "feature/auth",
  "url": "https://github.com/owner/repo/pull/123"
}
EOF

cat > tests/fixtures/pr-123-comments.json <<'EOF'
[
  {
    "id": 456,
    "user": {"login": "reviewer"},
    "body": "LGTM!",
    "path": null,
    "line": null,
    "created_at": "2025-02-20T10:00:00Z"
  },
  {
    "id": 457,
    "user": {"login": "reviewer"},
    "body": "Consider using a for...of loop here instead.",
    "path": "src/auth.ts",
    "line": 42
  }
]
EOF
```

## Integration Testing

Test the full workflow with local git repository:

```bash
#!/bin/bash
# tests/integration-test.sh

set -e

# Create temp git repo
tmpdir=$(mktemp -d)
cd "$tmpdir"

git init
git config user.email "test@test.com"
git config user.name "Test User"

# Create fake remote
git init --bare remote.git
git remote add origin "$(pwd)/remote.git"

# Create PR branch
git checkout -b feature/test
echo "test content" > file.txt
git add file.txt
git commit -m "test commit"

# Create mock PR fixture
export GH_ADDRESS_COMMENTS_FIXTURES="$OLDPWD/tests/fixtures"

# Run analyze
output=$(skill: gh-address-comments analyze --pr=123 2>&1)
echo "$output"

# Check output
if echo "$output" | grep -q "PR Comment Analysis"; then
    echo "✓ Integration test passed"
else
    echo "✗ Integration test failed"
    exit 1
fi

# Cleanup
cd "$OLDPWD"
rm -rf "$tmpdir"
```

## Unit Testing Individual Functions

Extract functions to testable library:

```bash
# scripts/lib.sh
categorize_comment() {
    # ... existing function
}

format_markdown() {
    # ... formatting logic
}

parse_comment() {
    # ... parsing logic
}
```

Then test:

```bash
#!/bin/bash
# tests/unit-test.sh

source ../scripts/lib.sh

# Test categorize_comment
result=$(categorize_comment "This is a suggestion: do this")
if [ "$result" != "suggestion" ]; then
    echo "FAIL: categorize_comment"
    exit 1
fi

# Test format_markdown
output=$(format_markdown "test" "## Summary")
if echo "$output" | grep -q "## Summary"; then
    echo "PASS: format_markdown"
else
    echo "FAIL: format_markdown"
    exit 1
fi
```

## CI/CD Testing

GitHub Actions workflow:

```yaml
name: Skill Tests

on:
  push:
    paths:
      - 'skills/gh-address-comments/**'
  pull_request:
    paths:
      - 'skills/gh-address-comments/**'

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Install dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y jq gh

      - name: Run syntax check
        run: bash -n skills/gh-address-comments/scripts/gh-address-comments

      - name: Run unit tests
        run: |
          chmod +x skills/gh-address-comments/scripts/gh-address-comments
          skills/gh-address-comments/scripts/gh-address-comments test-auth || true

      - name: Test with fixtures
        run: |
          export GH_ADDRESS_COMMENTS_FIXTURES=$PWD/tests/fixtures
          skills/gh-address-comments/scripts/gh-address-comments analyze --pr=123
```

## Performance Testing

```bash
#!/bin/bash
# tests/performance-test.sh

# Time operations on fixture with 100 comments
export GH_ADDRESS_COMMENTS_FIXTURES=tests/fixtures

time skill: gh-address-comments analyze --pr=123 > /dev/null

# Should complete in < 1 second for typical PRs
```

## Edge Cases to Test

1. **Empty PR** (no comments)
2. **PR with only praise** (no action needed)
3. **PR with deleted files** (path is null)
4. **PR with very long comment bodies** (>10KB)
5. **PR with special characters** in comments (emojis, code blocks)
6. **PR with comment threads** (multiple replies)
7. **PR from fork** (different permissions)
8. **Rate limit simulation** (API returns 403)
9. **Network timeout** (simulate with sleep)

Example edge case test:

```bash
#!/bin/bash
# tests/edge-cases.sh

test_empty_pr() {
    export GH_ADDRESS_COMMENTS_FIXTURES="$PWD/fixtures/empty.json"
    output=$(skill: gh-address-comments analyze --pr=999 2>&1)
    if echo "$output" | grep -q "No comments"; then
        echo "✓ Empty PR handled correctly"
    else
        echo "✗ Empty PR test failed"
    fi
}

test_special_chars() {
    export GH_ADDRESS_COMMENTS_FIXTURES="$PWD/fixtures/special-chars.json"
    output=$(skill: gh-address-comments analyze --pr=999 2>&1)
    if echo "$output" | grep -q "✓"; then
        echo "✓ Special characters handled"
    else
        echo "✗ Special characters test failed"
    fi
}

test_empty_pr
test_special_chars
```

## Manual Testing Checklist

- [ ] Authentication works
- [ ] Can fetch PR details
- [ ] Can fetch comments
- [ ] Comments are categorized correctly
- [ ] Markdown output renders properly
- [ ] JSON output is valid
- [ ] Dry-run mode shows actions without executing
- [ ] Comment selection filters by type
- [ ] Interactive mode navigates correctly
- [ ] Error messages are clear
- [ ] Handles missing PR gracefully
- [ ] Handles network errors
- [ ] Respects rate limits
- [ ] Honor repository flag
- [ ] Git branch operations work

## Coverage Goals

Aim for:
- 80%+ unit test coverage for pure functions
- 100% coverage of error handling paths
- Integration tests for all command paths

Use `bash-unit` or similar:

```bash
# Install bash-unit
git clone https://github.com/pforret/bash-unit.git
source bash-unit/tests/unit.bash

# Write tests
test_categorize_suggestion() {
    assert_eq "suggestion" "$(categorize_comment 'Suggestion: use const')"
}

test_categorize_question() {
    assert_eq "question" "$(categorize_comment 'Why did you do this?')"
}

run_tests test_categorize_suggestion test_categorize_question
```

## Testing Documentation

When adding new features:

1. Add unit tests for new functions
2. Add fixtures for new PR patterns
3. Update this document with new test scenarios
4. Update the test checklist
5. Verify CI passes

## Simulating Different Environments

Test on multiple platforms:

```bash
# macOS
brew install gh jq
tests/run-tests.sh

# Ubuntu
sudo apt-get install gh jq
tests/run-tests.sh

# Without jq (fallback mode)
unset JQ
tests/run-tests.sh  # Should still work with grep/sed fallbacks
```
