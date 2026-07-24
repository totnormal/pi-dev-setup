#!/usr/bin/env python3
"""
Sentry Error Investigator

Comprehensive script to fetch and analyze Sentry errors.
Can work with sentry-cli or directly with Sentry API.

Requirements:
  pip install sentry-sdk requests rich

Or use without dependencies (only requires sentry-cli installed).
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime
from typing import Dict, List, Optional

try:
    from rich.console import Console
    from rich.table import Table
    from rich.panel import Panel
    from rich.markdown import Markdown
    RICH_AVAILABLE = True
    console = Console()
except ImportError:
    RICH_AVAILABLE = False


def run_sentry_cli(args: List[str]) -> Optional[str]:
    """Run sentry-cli command and return output."""
    try:
        result = subprocess.run(
            ["sentry-cli"] + args,
            capture_output=True,
            text=True,
            check=False
        )
        if result.returncode != 0:
            print(f"Error running sentry-cli: {result.stderr}")
            return None
        return result.stdout
    except FileNotFoundError:
        print("sentry-cli not found. Install from https://docs.sentry.io/platforms/cli/")
        return None


def get_auth_headers() -> Dict[str, str]:
    """Get authentication headers for Sentry API."""
    token = os.environ.get("SENTRY_AUTH_TOKEN")
    if not token:
        return {}

    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }


def fetch_issue_via_api(issue_id: str, org: str) -> Optional[Dict]:
    """Fetch issue details via Sentry API."""
    import requests

    base_url = "https://sentry.io"
    headers = get_auth_headers()

    if not headers:
        print("Error: SENTRY_AUTH_TOKEN environment variable required")
        return None

    url = f"{base_url}/api/0/organizations/{org}/issues/{issue_id}/"
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print(f"API error: {response.status_code} - {response.text}")
        return None

    return response.json()


def fetch_events_via_api(issue_id: str, org: str, limit: int = 10) -> List[Dict]:
    """Fetch recent events for an issue via API."""
    import requests

    base_url = "https://sentry.io"
    headers = get_auth_headers()

    if not headers:
        return []

    url = f"{base_url}/api/0/organizations/{org}/issues/{issue_id}/events/"
    params = {"limit": limit}
    response = requests.get(url, headers=headers, params=params)

    if response.status_code != 200:
        print(f"API error: {response.status_code}")
        return []

    return response.json()


def fetch_events_via_cli(issue_id: str, org: str, project: str, limit: int) -> List[Dict]:
    """Fetch events using sentry-cli."""
    events = []
    output = run_sentry_cli([
        "events", "list", issue_id,
        "--org", org,
        "--project", project,
        "--limit", str(limit),
        "--json"
    ])

    if output:
        try:
            events = json.loads(output)
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")

    return events


def get_event_details(event_id: str, org: str, project: str) -> Optional[Dict]:
    """Get detailed event with stacktrace using sentry-cli."""
    output = run_sentry_cli([
        "events", "get", event_id,
        "--org", org,
        "--project", project,
        "--json"
    ])

    if output:
        try:
            return json.loads(output)
        except json.JSONDecodeError:
            # Try without JSON for raw output
            return {"raw": output}

    return None


def extract_stacktrace_summary(event: Dict) -> Dict:
    """Extract key information from event stacktrace."""
    summary = {
        "event_id": event.get("id", "unknown"),
        "timestamp": event.get("dateCreated", "unknown"),
        "exception_type": None,
        "message": None,
        "culprit": None,
        "stackframes": [],
        "tags": {}
    }

    # Get exception data
    if "exception" in event and "values" in event["exception"] and event["exception"]["values"]:
        exc = event["exception"]["values"][0]
        summary["exception_type"] = exc.get("type")
        summary["message"] = exc.get("value")

        if "stacktrace" in exc and "frames" in exc["stacktrace"]:
            frames = exc["stacktrace"]["frames"]
            # Get top 5 frames (most relevant, excluding sentry internal)
            for frame in frames[:10]:
                if not frame.get("in_app", True):  # Skip non-app frames
                    continue
                summary["stackframes"].append({
                    "filename": frame.get("filename", "unknown"),
                    "function": frame.get("function", "unknown"),
                    "lineno": frame.get("lineno"),
                    "context": frame.get("context", [])
                })

    # Get culprit
    if "culprit" in event:
        summary["culprit"] = event["culprit"]

    # Get tags
    if "tags" in event:
        for tag in event["tags"]:
            summary["tags"][tag.get("key")] = tag.get("value")

    return summary


def print_summary_markdown(issue_data: Dict, events_data: List[Dict], limit: int = 5):
    """Print error analysis summary in Markdown format."""
    print(f"# Sentry Error Analysis\n")

    print(f"**Issue**: {issue_data.get('title', 'Unknown')}")
    print(f"**ID**: {issue_data.get('shortId', issue_data.get('id', 'Unknown'))}")
    print(f"**Status**: {issue_data.get('status', 'unknown')}")
    print(f"**Level**: {issue_data.get('level', 'unknown')}")
    print(f"**First Seen**: {issue_data.get('firstSeen', 'unknown')}")
    print(f"**Last Seen**: {issue_data.get('lastSeen', 'unknown')}")
    print(f"**Events**: {issue_data.get('count', 0)} total\n")

    # Print trends
    if "stats" in issue_data and "24h" in issue_data["stats"]:
        print("**24h Events by Time**:")
        for period, count in issue_data["stats"]["24h"].items():
            print(f"- {period}: {count} events")

    print("\n## Recent Events Sample\n")

    if not events_data:
        print("No recent events found.")
        return

    for i, event in enumerate(events_data[:limit], 1):
        summary = extract_stacktrace_summary(event)
        print(f"### Event {i}: {summary['event_id']}")
        print(f"- **When**: {summary['timestamp']}")
        print(f"- **Type**: {summary['exception_type'] or 'N/A'}")
        print(f"- **Message**: {summary['message'] or 'N/A'}")
        print(f"- **Culprit**: {summary['culprit'] or 'N/A'}")

        if summary["tags"]:
            print("- **Tags**:")
            for key, value in summary["tags"].items():
                print(f"  - `{key}`: {value}")

        if summary["stackframes"]:
            print("- **Top Stack Frame**:")
            frame = summary["stackframes"][0]
            print(f"  - `{frame['filename']}:{frame['lineno']}` in `{frame['function']}`")

        print("")


def print_summary_rich(issue_data: Dict, events_data: List[Dict], limit: int = 5):
    """Print error analysis summary using rich formatting."""
    if not RICH_AVAILABLE:
        print_summary_markdown(issue_data, events_data, limit)
        return

    # Issue panel
    console.print(Panel.fit(
        f"[bold cyan]Issue:[/] {issue_data.get('title', 'Unknown')}\n"
        f"[bold]ID:[/] {issue_data.get('shortId', issue_data.get('id', 'Unknown'))}  "
        f"[bold]Status:[/] {issue_data.get('status', 'unknown')}  "
        f"[bold]Level:[/] {issue_data.get('level', 'unknown')}\n"
        f"[bold]Events:[/] {issue_data.get('count', 0)} total  "
        f"[bold]First Seen:[/] {issue_data.get('firstSeen', 'unknown')}\n"
        f"[bold]Last Seen:[/] {issue_data.get('lastSeen', 'unknown')}",
        title="Sentry Error Analysis",
        border_style="cyan"
    ))

    # Events table
    if events_data:
        table = Table(title="Recent Events Sample")
        table.add_column("Event ID", style="dim", width=12)
        table.add_column("Timestamp", width=20)
        table.add_column("Exception Type", style="red")
        table.add_column("Message", style="yellow")
        table.add_column("Culprit", style="cyan")
        table.add_column("Environment", style="green")

        for event in events_data[:limit]:
            summary = extract_stacktrace_summary(event)
            table.add_row(
                summary["event_id"][:8],
                summary["timestamp"][:19].replace("T", " "),
                summary["exception_type"] or "N/A",
                (summary["message"] or "N/A")[:50],
                summary["culprit"] or "N/A",
                summary["tags"].get("environment", "-")
            )

        console.print(table)

        # Detailed stack traces
        console.print("\n[bold]Top Stack Traces:[/]\n")
        for i, event in enumerate(events_data[:min(3, len(events_data))], 1):
            summary = extract_stacktrace_summary(event)
            console.print(f"[bold blue]Event {i}: {summary['event_id'][:8]}[/]")
            for frame in summary["stackframes"][:3]:
                console.print(f"  [cyan]{frame['filename']}:{frame['lineno']}[/] in [yellow]{frame['function']}[/]")
            console.print("")


def export_to_json(issue_data: Dict, events_data: List[Dict], output_path: str):
    """Export analysis to JSON file."""
    export_data = {
        "issue": issue_data,
        "events": events_data,
        "analysis_timestamp": datetime.utcnow().isoformat() + "Z"
    }

    with open(output_path, 'w') as f:
        json.dump(export_data, f, indent=2)

    print(f"Analysis exported to {output_path}")


def get_recent_errors(org: str, project: str, limit: int = 20, since: str = "24h"):
    """Get recent errors across all issues."""
    output = run_sentry_cli([
        "issues", "list",
        "--org", org,
        "--project", project,
        "--query", f"is:unresolved -is:for_review -status:unresolved",
        "--limit", str(limit),
        "--json"
    ])

    if not output:
        print("Failed to fetch issues")
        return None, []

    try:
        issues = json.loads(output)
        return issues, []
    except json.JSONDecodeError:
        print("Error parsing issues list")
        return None, []


def main():
    parser = argparse.ArgumentParser(
        description="Investigate Sentry errors and issues"
    )
    parser.add_argument("--issue-id", help="Sentry issue ID")
    parser.add_argument("--event-id", help="Specific event ID")
    parser.add_argument("--org", default=os.environ.get("SENTRY_ORG", ""), help="Organization slug")
    parser.add_argument("--project", default=os.environ.get("SENTRY_PROJECT", ""), help="Project slug")
    parser.add_argument("--limit", type=int, default=10, help="Number of events to fetch")
    parser.add_argument("--environment", help="Filter by environment")
    parser.add_argument("--since", default="24h", help="Time filter (e.g., 24h, 7d)")
    parser.add_argument("--output", choices=["json", "markdown", "summary"], default="summary", help="Output format")
    parser.add_argument("--output-file", help="Export to file (JSON format)")
    parser.add_argument("--recent-errors", action="store_true", help="Fetch recent unresolved errors")
    parser.add_argument("--verbose", action="store_true", help="Show full stack traces")

    args = parser.parse_args()

    # Check if sentry-cli is available
    if not run_sentry_cli(["--version"]):
        print("Warning: sentry-cli not found. Limited functionality available.")
        print("Install sentry-cli for full capabilities.")

    # Get org and project from environment if not provided
    if not args.org:
        print("Error: Organization slug required. Set SENTRY_ORG or use --org flag.")
        sys.exit(1)

    if not args.project and not args.recent_errors:
        print("Error: Project slug required. Set SENTRY_PROJECT or use --project flag.")
        sys.exit(1)

    issue_data = None
    events_data = []

    try:
        # Recent errors mode
        if args.recent_errors:
            print(f"Fetching recent unresolved errors in {args.org}...")
            issues, _ = get_recent_errors(args.org, args.project, args.limit, args.since)
            if issues:
                print("\nTop Issues:")
                for idx, issue in enumerate(issues, 1):
                    print(f"{idx}. {issue.get('shortId', issue.get('id'))}: {issue.get('title')}")
                    print(f"   Status: {issue.get('status')}, Level: {issue.get('level')}, Events: {issue.get('count')}")
                    print()
            return

        # Fetch specific issue
        if args.issue_id:
            print(f"Fetching issue {args.issue_id}...")

            # Try sentry-cli first
            issue_json = run_sentry_cli([
                "issues", "get", args.issue_id,
                "--org", args.org,
                "--project", args.project,
                "--json"
            ])

            if issue_json:
                try:
                    issue_data = json.loads(issue_json)
                except json.JSONDecodeError:
                    issue_data = {"raw": issue_json}
            else:
                # Fallback to API
                print("Attempting API fetch...")
                issue_data = fetch_issue_via_api(args.issue_id, args.org)

            if not issue_data:
                print(f"Could not fetch issue {args.issue_id}")
                sys.exit(1)

        # Fetch specific event
        if args.event_id:
            print(f"Fetching event {args.event_id}...")
            event_data = get_event_details(args.event_id, args.org, args.project)
            if event_data:
                events_data = [event_data]
            else:
                print(f"Could not fetch event {args.event_id}")
                sys.exit(1)
        elif args.issue_id:
            # Fetch events for the issue
            print(f"Fetching recent events for {args.issue_id} (limit: {args.limit})...")
            events_data = fetch_events_via_cli(args.issue_id, args.org, args.project, args.limit)

            if not events_data:
                print("No events found or sentry-cli unavailable")
                # Try API fallback
                events_data = fetch_events_via_api(args.issue_id, args.org, args.limit)

        # Output results
        if args.output == "json":
            output_json = {
                "issue": issue_data,
                "events": events_data,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
            if args.output_file:
                with open(args.output_file, 'w') as f:
                    json.dump(output_json, f, indent=2)
                print(f"Exported to {args.output_file}")
            else:
                print(json.dumps(output_json, indent=2))
        else:
            print_summary_markdown(issue_data, events_data, args.limit)
            if RICH_AVAILABLE:
                print("\n")
                print_summary_rich(issue_data, events_data, args.limit)

        # Additional guidance
        print("\n" + "="*60)
        print("NEXT STEPS:")
        print("1. Review the stack traces to identify the root cause")
        print("2. Check the affected files in your codebase")
        print("3. Consider recent changes that might have introduced the bug")
        print("4. Create a fix plan and test before deploying")
        print("5. Monitor Sentry after deployment to verify resolution")
        print("="*60)

    except KeyboardInterrupt:
        print("\nInterrupted.")
        sys.exit(130)
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
