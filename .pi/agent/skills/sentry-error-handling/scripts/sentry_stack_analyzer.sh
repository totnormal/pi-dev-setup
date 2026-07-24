#!/bin/bash
#
# Sentry Stack Analyzer
# Analyzes Sentry event JSON to identify common stack trace patterns
#
# Usage:
#   sentry-cli events list <issue_id> --json | ./sentry_stack_analyzer.sh
#   cat events.json | ./sentry_stack_analyzer.sh --limit 20
#
# Output:
#   - Top exception types
#   - Most frequent culprit files
#   - Common error patterns

set -euo pipefail

LIMIT=10
SHOW_ALL=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --limit)
            LIMIT="$2"
            shift 2
            ;;
        --all)
            SHOW_ALL=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Read JSON input
if [ -t 0 ]; then
    echo "Reading from stdin. Pipe JSON data or pass file path."
    exit 1
fi

INPUT_DATA=$(cat)

# Check if jq is available
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required. Install with: brew install jq"
    exit 1
fi

echo "Analyzing stack traces..."
echo ""

# Extract exception types
echo "=== Top Exception Types ==="
echo "$INPUT_DATA" | jq -r '.exception?.values[]?.type // empty' 2>/dev/null | \
    sort | uniq -c | sort -rn | head - "$LIMIT" | \
    awk '{printf "%d\t%s\n", $1, $2}' | column -t -s $'\t' || echo "No exception types found"

echo ""
echo "=== Top Culprit Files ==="
echo "$INPUT_DATA" | jq -r '.exception?.values[]?.stacktrace?.frames[]?.filename // empty' 2>/dev/null | \
    sort | uniq -c | sort -rn | head - "$LIMIT" | \
    awk '{printf "%d\t%s\n", $1, $2}' | column -t -s $'\t' || echo "No culprit files found"

echo ""
echo "=== Top Functions ==="
echo "$INPUT_DATA" | jq -r '.exception?.values[]?.stacktrace?.frames[]?.function // empty' 2>/dev/null | \
    sort | uniq -c | sort -rn | head - "$LIMIT" | \
    awk '{printf "%d\t%s\n", $1, $2}' | column -t -s $'\t' || echo "No functions found"

echo ""
echo "=== Error Messages (Top occurrences) ==="
echo "$INPUT_DATA" | jq -r '.exception?.values[]?.value // empty' 2>/dev/null | \
    sort | uniq -c | sort -rn | head - "$LIMIT" | \
    awk '{printf "%d\t%s\n", $1, $2}' | column -t -s $'\t' || echo "No error messages found"

echo ""
echo "=== Environment Distribution ==="
echo "$INPUT_DATA" | jq -r '.tags[]? | select(.key=="environment") | .value' 2>/dev/null | \
    sort | uniq -c | sort -rn | \
    awk '{printf "%d\t%s\n", $1, $2}' | column -t -s $'\t' || echo "No environment tags found"

echo ""
echo "=== Time Distribution (Hourly) ==="
echo "$INPUT_DATA" | jq -r '.dateCreated // empty' 2>/dev/null | \
    cut -d'T' -f2 | cut -d':' -f1 | sort | uniq -c | sort -k2 | \
    awk '{printf "%02d:00\t%d\n", $2, $1}' | column -t -s $'\t' || echo "No timestamps found"

echo ""
echo "Analysis complete."

# Additional insights
TOTAL_EVENTS=$(echo "$INPUT_DATA" | jq 'length' 2>/dev/null || echo "0")
echo ""
echo "Total events analyzed: $TOTAL_EVENTS"

if [ "$TOTAL_EVENTS" -gt 0 ]; then
    # Check for common patterns
    NULL_ERRORS=$(echo "$INPUT_DATA" | jq -r '.exception?.values[]?.value // empty' 2>/dev/null | grep -ci "nil\|null\|undefined" || echo "0")
    TIMEOUTS=$(echo "$INPUT_DATA" | jq -r '.exception?.values[]?.value // empty' 2>/dev/null | grep -ci "timeout\|deadline" || echo "0")
    API_ERRORS=$(echo "$INPUT_DATA" | jq -r '.exception?.values[]?.value // empty' 2>/dev/null | grep -ci "5\d\d\|API\|http" || echo "0")

    echo ""
    echo "Pattern detection:"
    [ "$NULL_ERRORS" -gt 0 ] && echo "  ⚠️  Null/Nil errors: possibly $NULL_ERRORS occurrences"
    [ "$TIMEOUTS" -gt 0 ] && echo "  ⏱️  Timeouts: possibly $TIMEOUTS occurrences"
    [ "$API_ERRORS" -gt 0 ] && echo "  🌐 API/HTTP errors: possibly $API_ERRORS occurrences"
fi
