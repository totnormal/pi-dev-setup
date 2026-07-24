# Sentry API Reference for Error Investigation

## Base URL

```
https://sentry.io/api/0/
```

For self-hosted Sentry:
```
https://your-sentry-instance.com/api/0/
```

## Authentication

Include in headers:
```
Authorization: Bearer <auth-token>
Content-Type: application/json
```

Auth token should have scopes:
- `project:read`
- `event:read`
- `issue:read`
- `org:read` (optional)

## Key Endpoints

### Issues

**List issues**
```
GET /organizations/{organization}/issues/
```

Query parameters:
- `query` (string): Search query (same syntax as UI)
- `statsPeriod` (string): `24h`, `14d`, `30d` (default: `24h`)
- `limit` (int): Default 100, max 100
- `cursor` (string): Pagination cursor

Example:
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "https://sentry.io/api/0/organizations/my-org/issues/?query=is%3Aunresolved&limit=20"
```

**Get specific issue**
```
GET /organizations/{organization}/issues/{issue_id}/
```

**Update issue**
```
PUT /organizations/{organization}/issues/{issue_id}/
```

Body:
```json
{
  "status": "resolved",
  "statusDetails": {
    "workflow": "resolved_in_next_release"
  }
}
```

### Events

**List events for an issue**
```
GET /organizations/{organization}/issues/{issue_id}/events/
```

Parameters:
- `limit` (int): Default 10, max 100
- `cursor` (string): Pagination

**Get specific event**
```
GET /organizations/{organization}/events/{event_id}/
```

For full event with stacktrace, this endpoint returns:
```json
{
  "id": "event-id",
  "dateCreated": "2024-01-15T10:30:00Z",
  "exception": {
    "values": [
      {
        "type": "TypeError",
        "value": "Cannot read property 'map' of undefined",
        "stacktrace": {
          "frames": [
            {
              "filename": "src/components/UserList.js",
              "function": "render",
              "lineno": 42,
              "context": ["line41", "line42", "line43"]
            }
          ]
        }
      }
    ]
  },
  "tags": [
    {"key": "browser", "value": "Chrome 120"},
    {"key": "environment", "value": "production"}
  ],
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "ip_address": "192.168.1.1"
  }
}
```

### Event Raw Data

**Get raw event JSON** (unprocessed)
```
GET /organizations/{organization}/events/{event_id}/raw/
```

### Releases

**List releases**
```
GET /organizations/{organization}/releases/
```

Parameters:
- `query` (string): Filter by version
- `environment` (string): Filter by environment

**Get release details**
```
GET /organizations/{organization}/releases/{version}/
```

Response includes:
```json
{
  "version": "my-app@1.2.3",
  "dateCreated": "...",
  "dateReleased": "...",
  "projects": ["my-project"],
  "newGroups": 15,  # New issues in this release
  "totalEvents": 1234
}
```

**Get release file list**
```
GET /organizations/{organization}/releases/{version}/files/
```

### Projects

**List projects**
```
GET /organizations/{organization}/projects/
```

## Query Syntax

Search queries use same syntax as UI:

```
# Status
is:unresolved
is:resolved

# Priority
priority:high
priority:medium

# Issue type
error.type:TypeError
error.type:NetworkError

# Culprit (file/function)
culprit:src/components/UserList.js

# Tags
tag[browser]:Chrome
tag[environment]:production

# Age
firstSeen:-24h
firstSeen:>2024-01-01

# Events count
timesSeen:>100

# User count
user:me@sentry.io

# Combined
is:unresolved error.type:TypeError timesSeen:>10
```

## Using Python Script Example

```python
import requests

def fetch_sentry_issue(issue_id: str, org: str, token: str) -> dict:
    url = f"https://sentry.io/api/0/organizations/{org}/issues/{issue_id}/"
    headers = {"Authorization": f"Bearer {token}"}

    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()

def fetch_recent_events(org: str, project: str, limit: int = 20, token: str = None) -> list:
    token = token or os.environ['SENTRY_AUTH_TOKEN']
    # For events, you need to list issues first, then get events
    # There's no direct "list all recent events" endpoint
    # But you can use the discover endpoint:
    url = f"https://sentry.io/api/0/organizations/{org}/discover/query/"
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "query": f"project:{project}",
        "fields": ["id", "event.id", "message", "stacktrace", "exception", "timestamp"],
        "limit": limit,
        "sort": "-timestamp"
    }

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()

def search_errors(org: str, query: str, token: str) -> list:
    url = f"https://sentry.io/api/0/organizations/{org}/issues/"
    headers = {"Authorization": f"Bearer {token}"}
    params = {"query": query, "limit": 50}

    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()
```

## Discovery Queries (Advanced Analytics)

For aggregated analytics, use the Discover endpoint:

```
POST /organizations/{organization}/discover/query/
```

Body:
```json
{
  "query": "event.type:error",
  "fields": ["title", "count()", "count_unique(user)", "avg(duration)"],
  "conditions": [],
  "orderby": "-count()",
  "limit": 10
}
```

## Rate Limits

- API has rate limits per token
- For bulk operations, add delays (~100ms between calls)
- Use cursors for pagination instead of large offsets
- Cache responses where possible

## Error Responses

- `400`: Bad request (check parameters)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not found (issue/project doesn't exist)
- `429`: Rate limited (retry after `Retry-After` header)

## Python Requests Example

```python
import requests
import os

class SentryClient:
    def __init__(self, org: str, token: str = None, base_url: str = "https://sentry.io"):
        self.org = org
        self.token = token or os.environ.get("SENTRY_AUTH_TOKEN")
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        })

    def get_issue(self, issue_id: str) -> dict:
        url = f"{self.base_url}/api/0/organizations/{self.org}/issues/{issue_id}/"
        resp = self.session.get(url)
        resp.raise_for_status()
        return resp.json()

    def list_events(self, issue_id: str, limit: int = 10) -> list:
        url = f"{self.base_url}/api/0/organizations/{self.org}/issues/{issue_id}/events/"
        params = {"limit": limit}
        resp = self.session.get(url, params=params)
        resp.raise_for_status()
        return resp.json()

    def search_issues(self, query: str, limit: int = 50) -> list:
        url = f"{self.base_url}/api/0/organizations/{self.org}/issues/"
        params = {"query": query, "limit": limit}
        resp = self.session.get(url, params=params)
        resp.raise_for_status()
        return resp.json()
```

## Webhooks

For automated alerts, configure Sentry webhooks:

- `issue.created`
- `issue.resolved`
- `issue.ignored`
- `issue.assigned`
- `event.created`

Webhook payload includes:
```json
{
  "action": "created",
  "data": {
    "id": "12345",
    "title": "TypeError: ...",
    "url": "https://sentry.io/organizations/org/issues/12345/",
    "project": {"slug": "my-project"}
  }
}
```

## Further Reading

- Full API docs: https://docs.sentry.io/api/
- Issue search: https://docs.sentry.io/product/issues/issue-search/
- Discover queries: https://docs.sentry.io/product/discover-queries/
