---
disable-model-invocation: true
name: google-workspace
description: "Google Workspace `gws` CLI. Complete reference for the Google Workspace CLI (`gws`). Keywords: google workspace."
---

# Google Workspace — `gws` CLI

## Extended Details



Complete reference for the Google Workspace CLI (`gws`).
Covers all services, commands, helper recipes, and cross-service workflows.

## Prerequisites

> The `gws` binary must be on `$PATH`. If missing, run `gws generate-skills` or
> see the project README for install options.

```bash
gws generate-skills   # Create/update local skill files
```

## Authentication

```bash
# Browser-based OAuth (interactive)
gws auth login

# Service Account
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
```

## Global Flags

| Flag | Description |
|------|-------------|
| `--format <FORMAT>` | Output format: `json` (default), `table`, `yaml`, `csv` |
| `--dry-run` | Validate locally without calling the API |
| `--sanitize <TEMPLATE>` | Screen responses through Model Armor |

## CLI Syntax

```bash
gws <service> <resource> [sub-resource] <method> [flags]
```

### Method Flags

| Flag | Description |
|------|-------------|
| `--params '{"key": "val"}'` | URL/query parameters |
| `--json '{"key": "val"}'` | Request body |
| `-o, --output <PATH>` | Save binary responses to file |
| `--upload <PATH>` | Upload file content (multipart) |
| `--page-all` | Auto-paginate (NDJSON output) |
| `--page-limit <N>` | Max pages when using `--page-all` (default: 10) |
| `--page-delay <MS>` | Delay between pages in ms (default: 100) |

## Security Rules

- **Never** output secrets (API keys, tokens) directly
- **Always** confirm with user before executing write/delete commands
- Prefer `--dry-run` for destructive operations
- Use `--sanitize` for PII/content safety screening

## Shell Tips

- **zsh `!` expansion:** Sheet ranges like `Sheet1!A1` contain `!` which zsh
  interprets as history expansion. Use double quotes with escaped inner quotes
  instead of single quotes:
  ```bash
  # WRONG (zsh will mangle the !)
  gws sheets +read --spreadsheet ID --range 'Sheet1!A1:D10'

  # CORRECT
  gws sheets +read --spreadsheet ID --range "Sheet1!A1:D10"
  ```
- **JSON with double quotes:** Wrap `--params` and `--json` values in single quotes:
  ```bash
  gws drive files list --params '{"pageSize": 5}'
  ```

## Discovering Commands

Before calling any API method, inspect it:

```bash
# Browse services
gws --help

# Browse resources and methods for a service
gws gmail --help

# Inspect a method's required params, types, and defaults
gws schema gmail.<resource>.<method>
```

Use `gws schema` output to build your `--params` and `--json` flags.

---

# Service Reference

## Gmail — Send, Read, and Manage Email

```bash
gws gmail <resource> <method> [flags]
```

### Helper Commands

| Command | Description |
|---------|-------------|
| `+send` | Send an email (`--to`, `--subject`, `--body`, `--cc`, `--bcc`, `--attach`, `--html`) |
| `+triage` | Show unread inbox summary (`--max`, `--query`, `--labels`) |
| `+reply` | Reply to a message (`--message-id`, `--body`, `--html`) |
| `+reply-all` | Reply-all (`--message-id`, `--body`, `--remove`) |
| `+forward` | Forward a message (`--message-id`, `--to`, `--body`) |
| `+read` | Read a message (`--id`, `--headers`, `--format`, `--html`) |
| `+watch` | Watch for new emails as NDJSON (`--project`, `--once`) |

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `users` | `getProfile`, `stop`, `watch` |
| `users.drafts` | `create`, `delete`, `get`, `list`, `send`, `update` |
| `users.history` | `list` |
| `users.labels` | `create`, `delete`, `get`, `list`, `patch`, `update` |
| `users.messages` | `batchModify`, `delete`, `get`, `import`, `insert`, `list`, `modify`, `send`, `trash`, `untrash` |
| `users.settings` | `get`, `updateAutoForwarding`, `getAutoForwarding`, `updateImap`, `getImap`, `updateLanguage`, `getLanguage`, `updatePop`, `getPop`, `updateVacation`, `getVacation` |
| `users.settings.filters` | `create`, `delete`, `get`, `list`, `update` |
| `users.settings.forwardingAddresses` | `create`, `delete`, `get`, `list` |
| `users.settings.sendAs` | `create`, `delete`, `get`, `list`, `patch`, `update`, `verify` |
| `users.threads` | `delete`, `get`, `list`, `modify`, `trash`, `untrash` |

### Examples

```bash
# Send email
gws gmail +send --to alice@example.com --subject 'Hello' --body 'Hi Alice!'

# Send with attachment and CC
gws gmail +send --to alice@example.com --subject 'Report' --body 'See attached' \
  --cc bob@example.com -a report.pdf

# Send HTML
gws gmail +send --to alice@example.com --subject 'Hello' \
  --body '<b>Bold</b> text' --html

# Reply to message
gws gmail +reply --message-id 18f1a2b3c4d --body 'Thanks, got it!'

# Reply-all with extra recipient
gws gmail +reply-all --message-id 18f1a2b3c4d --body 'Adding Dave' --to dave@example.com

# Forward with note
gws gmail +forward --message-id 18f1a2b3c4d --to dave@example.com --body 'FYI see below'

# Triage inbox
gws gmail +triage
gws gmail +triage --max 5 --query 'from:boss@company.com'
gws gmail +triage --labels

# Read message
gws gmail +read --id 18f1a2b3c4d
gws gmail +read --id 18f1a2b3c4d --headers
gws gmail +read --id 18f1a2b3c4d --format json

# Watch for new emails
gws gmail +watch --project my-gcp-project --once
```

> [!CAUTION]
> Write commands (`+send`, `+reply`, `+forward`, `+draft send`) require user confirmation.

---

## Calendar — Manage Calendars and Events

```bash
gws calendar <resource> <method> [flags]
```

### Helper Commands

| Command | Description |
|---------|-------------|
| `+insert` | Create a calendar event (`--calendar-id`, `--summary`, `--start`, `--end`, `--attendees`) |
| `+agenda` | Show upcoming events (`--max`, `--calendar-id`) |

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `calendars` | `clear`, `delete`, `get`, `insert` |
| `events` | `delete`, `get`, `insert`, `list`, `move`, `patch`, `quickAdd`, `update`, `instances` |
| `calendarList` | `get`, `list`, `insert`, `update` |
| `freebusy` | `query` — Check free/busy for multiple time ranges |
| `acl` | `delete`, `get`, `insert`, `list`, `update` |
| `settings` | `get`, `list` |

### Examples

```bash
# Show upcoming events
gws calendar +agenda
gws calendar +agenda --max 5

# Create event
gws calendar events insert \
  --json '{"summary":"Team Meeting","start":{"dateTime":"2026-04-05T10:00:00-05:00"},"end":{"dateTime":"2026-04-05T11:00:00-05:00"},"attendees":[{"email":"alice@example.com"}]}'
```

---

## Drive — Files, Folders, and Shared Drives

```bash
gws drive <resource> <method> [flags]
```

### Helper Commands

| Command | Description |
|---------|-------------|
| `+upload` | Upload file with automatic metadata (`--file`, `--mimeType`, `--parents`) |

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `files` | `create`, `delete`, `get`, `list`, `update`, `copy`, `move`, `trash`, `untrash`, `watch`, `export` |
| `comments` | `create`, `delete`, `get`, `list`, `update` |
| `replies` | `create`, `delete`, `get`, `list`, `update` |
| `permissions` | `create`, `delete`, `get`, `list`, `update`, `batchDelete`, `batchGet`, `batchUpdate` |
| `revisions` | `delete`, `get`, `list`, `update` |
| `changes` | `getStartPageToken`, `list`, `watch` |
| `drives` | `create`, `delete`, `get`, `hide`, `list`, `unhide`, `update` |

### Examples

```bash
# Upload file
gws drive +upload --file ./report.pdf --parents "0ABCdefGHI"

# List files
gws drive files list --params '{"pageSize": 20}'

# Get file metadata
gws drive files get --params '{"fileId":"ABC123"}'

# Search
gws drive files list --params '{"q":"mimeType=\"application/pdf\""}'
```

---

## Docs — Read and Write Google Docs

```bash
gws docs <resource> <method> [flags]
```

### Helper Commands

| Command | Description |
|---------|-------------|
| `+write-append` | Append text to a document (`--document-id`, `--text`) |

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `documents` | `create`, `get`, `batchUpdate` |

### Examples

```bash
# Create doc
gws docs documents create --json '{"title":"Project Brief"}'

# Get doc
gws docs documents get --params '{"documentId":"DOC_ID"}'

# Append text
gws docs +write-append --document-id DOC_ID --text 'New section content here...'
```

> [!CAUTION]
> Write commands (`+write-append`, `batchUpdate`) require confirmation.

---

## Sheets — Read and Write Spreadsheets

```bash
gws sheets <resource> <method> [flags]
```

### Helper Commands

| Command | Description |
|---------|-------------|
| `+read` | Read values (`--spreadsheet`, `--range`) |
| `+append` | Append rows (`--spreadsheet`, `--values`, `--json-values`) |

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `spreadsheets` | `create`, `get`, `batchUpdate`, `getByDataFilter` |
| `spreadsheets.values` | `get`, `update`, `batchGet`, `batchUpdate`, `append` |
| `spreadsheets.developerMetadata` | `create`, `delete`, `get`, `search`, `update` |

### Examples

```bash
# Read range
gws sheets +read --spreadsheet ID --range "Sheet1!A1:D10"

# Append single row
gws sheets +append --spreadsheet ID --values 'Alice,100,true'

# Append multiple rows
gws sheets +append --spreadsheet ID --json-values '[["a","b"],["c","d"]]'

# Create spreadsheet
gws sheets spreadsheets create --json '{"properties":{"title":"New Sheet"}}'
```

> [!CAUTION]
> `+append`, `update`, `batchUpdate` are write operations.

---

## Slides — Presentations

```bash
gws slides <resource> <method> [flags]
```

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `presentations` | `create`, `get`, `batchUpdate` |
| `presentations.pages` | `get` |

### Examples

```bash
# Create presentation
gws slides presentations create --json '{"title":"Q2 Review"}'

# Get existing
gws slides presentations get --params '{"presentationId":"PRES_ID"}'

# Update slides
gws slides presentations batchUpdate --params '{"presentationId":"PRES_ID"}' \
  --json '{"requests":[{"createSlide":{}}]}'
```

> [!CAUTION]
> `create` and `batchUpdate` are write operations.

---

## Chat — Spaces and Messages

```bash
gws chat <resource> <method> [flags]
```

### Helper Commands

| Command | Description |
|---------|-------------|
| `+send` | Send message to space (`--parent`, `--text`) |

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `spaces` | `get`, `list`, `create` |
| `spaces.messages` | `create`, `delete`, `get`, `list`, `update` |
| `spaces.members` | `create`, `delete`, `get`, `list` |

### Examples

```bash
# Send chat message
gws chat spaces.messages create \
  --params '{"parent":"spaces/ABC123"}' \
  --json '{"text":"Project update: all green."}'
```

---

## Meet — Conferences

```bash
gws meet <resource> <method> [flags]
```

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `spaces` | `create`, `endActiveConference`, `get`, `patch` |
| `conferenceRecords` | `get`, `list` |
| `conferenceRecords.participants` | `get`, `list` |
| `conferenceRecords.recordings` | `get`, `list` |
| `conferenceRecords.transcripts` | `get`, `list` |

### Examples

```bash
# Create meeting space
gws meet spaces create --params '{"conferenceSolutionKey":{"type":"hangoutsMeet"}}'
```

---

## Tasks — Task Lists and Tasks

```bash
gws tasks <resource> <method> [flags]
```

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `tasklists` | `insert`, `list`, `get`, `update`, `delete` |
| `tasks` | `insert`, `list`, `get`, `update`, `delete`, `move`, `clear` |

### Examples

```bash
# List task lists
gws tasks tasklists list

# Add task
gws tasks tasks insert --params '{"tasklist":"DEFAULT"}' \
  --json '{"title":"Review proposal","due":"2026-04-06T12:00:00.000Z"}'

# List tasks
gws tasks tasks list --params '{"tasklist":"DEFAULT"}'
```

---

## People — Contacts and Profiles

```bash
gws people <resource> <method> [flags]
```

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `people` | `get`, `getBatchGet`, `createContact`, `updateContact`, `deleteContactPhoto`, `searchContacts`, `listDirectoryPeople`, `batchCreateContacts`, `batchUpdateContacts` |
| `contactGroups` | `create`, `delete`, `get`, `list`, `update`, `batchGet` |
| `otherContacts` | `list`, `search`, `copyOtherContactToMyContactsGroup` |

### Examples

```bash
# Get your own profile
gws people people get --params '{"resourceName":"people/me","personFields":"names,emailAddresses"}'

# Search contacts
gws people people searchContacts --params '{"query":"Alice","readMask":"names,emailAddresses"}'
```

---

## Keep — Notes

```bash
gws keep <resource> <method> [flags]
```

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `notes` | `create`, `delete`, `get`, `list` |
| `media` | `download` |

---

## Classroom — Classes and Rosters

```bash
gws classroom <resource> <method> [flags]
```

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `courses` | `create`, `delete`, `get`, `list`, `patch`, `update` |
| `courses.students` | `create`, `delete`, `get`, `list` |
| `courses.teachers` | `create`, `delete`, `get`, `list` |
| `courses.courseWork` | `create`, `get`, `list`, `patch` |
| `courses.announcements` | `create`, `get`, `list`, `patch` |

---

## Admin Reports — Audit Logs and Usage

```bash
gws admin-reports <resource> <method> [flags]
```

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `activities` | `list` — Get audit logs for admin activities |
| `usage` | `get` / `date` / `user` — Get usage reports for Workspace services |

---

## Forms — Survey and Feedback Forms

```bash
gws forms <resource> <method> [flags]
```

### API Resources

| Resource | Key Methods |
|----------|-------------|
| `forms` | `create`, `get`, `batchUpdate` |
| `responses` | `get`, `list`, `watch` |

### Examples

```bash
# Create form
gws forms create --json '{"info":{"title":"Survey"}}'
```

---

## Events — Workspace Event Subscriptions

```bash
gws events <resource> <method> [flags]
```

### Helper Commands

| Command | Description |
|---------|-------------|
| `+subscribe` | Subscribe to events as NDJSON (`--resource`, `--event-types`, `--project`) |
| `+renew` | Renew/rename existing subscription |

### Examples

```bash
gws events subscriptions create \
  --json '{"target_uri":"https://hooks.example.com/webhook","resource_uri":"https://people.googleapis.com/v1/people/me"}'
```

---

## Model Armor — Content Safety Filtering

```bash
gws modelarmor <resource> <method> [flags]
```

### Helper Commands

| Command | Description |
|---------|-------------|
| `+sanitize-prompt` | Sanitize user prompt through template (`--template`, `--text`) |
| `+sanitize-response` | Sanitize model response through template (`--template`, `--text`) |
| `+create-template` | Create template (`--project`, `--location`, `--template-id`, `--preset`) |

### Examples

```bash
# Create jailbreak template
gws modelarmor +create-template --project P --location us-central1 \
  --template-id my-tmpl --preset jailbreak

# Sanitize prompt
gws modelarmor +sanitize-prompt \
  --template projects/P/locations/L/templates/my-tmpl --text 'user input'

# Sanitize response
echo 'model output' | gws modelarmor +sanitize-response --template projects/P/locations/L/templates/my-tmpl
```

---

# Cross-Service Workflows

Multi-service patterns that chain `gws` commands together.

## +email-to-task — Convert Gmail Message to Task

```bash
gws workflow +email-to-task --message-id MSG_ID [--tasklist LIST_ID]
```
Reads email subject as task title, snippet as notes.

## +file-announce — Announce Drive File in Chat

```bash
gws workflow +file-announce --file-id FILE_ID --space spaces/SPACE_ID [--message 'text']
```
Upload file first with `gws drive +upload`, then announce.

## +meeting-prep — Next Meeting Prep

```bash
gws workflow +meeting-prep [--calendar primary]
```
Read-only. Shows next event with attendees and description.

## +standup-report — Today's Standup

```bash
gws workflow +standup-report
```
Combines today's calendar with open tasks.

## +weekly-digest — Weekly Summary

```bash
gws workflow +weekly-digest
```
This week's meetings + unread email count.

---

# Common Recipes

Frequently-requested multi-step workflows.

## Gmail Recipes

| Recipe | Steps |
|--------|-------|
| **Triage inbox, label, archive** | 1. `gws gmail +triage` 2. `gws gmail messages modify` to add label 3. `gws gmail threads trash` |
| **Watch labeled emails** | 1. `gws gmail +watch --label-ids INBOX` 2. Filter by label in output |
| **Create Gmail filter** | 1. `gws gmail users.settings.filters create` with JSON filter criteria |
| **Draft email from Doc** | 1. `gws docs documents get --params '{"documentId":"DOC_ID"}'` 2. Extract body 3. `gws gmail +send --to ...` |
| **Forward labeled emails** | 1. `gws gmail messages list` with label query 2. `gws gmail +forward` for each |
| **Save email attachments to Drive** | 1. `gws gmail messages get` with `format=raw` 2. Extract attachment 3. `gws drive +upload` |
| **Save email body to Doc** | 1. `gws gmail +read` 2. `gws docs +write-append` to new doc |
| **Send Drive link via email** | 1. `gws drive +upload` or `gws drive files create` 2. `gws gmail +send` with link |
| **Vacation responder** | 1. `gws gmail users.settings.updateVacation` with enabled=true and message |
| **Create meetup** | 1. `gws meet spaces create` 2. Share link via `gws gmail +send` or `gws chat spaces.messages create` |

## Calendar Recipes

| Recipe | Steps |
|--------|-------|
| **Find free time** | 1. `gws calendar freebusy query` with time ranges 2. Find gaps in response |
| **Batch invite to event** | 1. `gws calendar events patch` with added attendees 2. Set `sendUpdates=all` |
| **Schedule recurring event** | 1. `gws calendar events insert` with recurrence field |
| **Reschedule meeting** | 1. `gws calendar events patch` with new times 2. Set `sendUpdates=all` |
| **Plan weekly schedule** | 1. `gws calendar events list` for week 2. Find gaps 3. Insert focus blocks |

## Drive Recipes

| Recipe | Steps |
|--------|-------|
| **Bulk download folder** | 1. `gws drive files list --params '{"q":"'\''FOLDER_ID'\'' in parents"}'` 2. For each, `gws drive files get` and download media |
| **Find large files** | 1. `gws drive files list` with quota filter or sort by quotaBytesUsed |
| **Organize folder** | 1. List files 2. `gws drive files update` with new parents |
| **Share folder with team** | 1. `gws drive permissions create` for each collaborator with desired role |
| **Share event materials** | 1. Get event attendees 2. `gws drive permissions create` for each |
| **Watch Drive changes** | 1. `gws drive files watch` on file or folder for push notifications |
| **Create shared drive** | 1. `gws drive drives create --json '{"name":"Team Drive"}'` |
| **Create doc from template** | 1. `gws drive files copy` template 2. Share with collaborators 3. Edit via Docs API |

## Sheets Recipes

| Recipe | Steps |
|--------|-------|
| **Create events from sheet** | 1. `gws sheets +read` event data 2. For each row, `gws calendar events insert` |
| **Compare sheet tabs** | 1. `gws sheets +read` tab1 2. `gws sheets +read` tab2 3. Compare locally |
| **Copy sheet for new month** | 1. `gws sheets spreadsheets.batchUpdate` with duplicate sheet request |
| **Create expense tracker** | 1. `gws sheets spreadsheets create` 2. `gws sheets +append` headers |
| **Generate report from sheet** | 1. `gws sheets +read` data 2. `gws docs documents create` 3. Write report |
| **Backup sheet as CSV** | 1. `gws sheets +read` all rows 2. Format as CSV 3. Write to local file |
| **Log deal update** | 1. `gws sheets +append --spreadsheet SALES_ID --values 'deal,status,date'` |

## Classroom Recipes

| Recipe | Steps |
|--------|-------|
| **Create classroom course** | 1. `gws classroom courses create --json '{"name":"CS101","section":"A","ownerProfile":{"name":"Teacher"}}'` 2. Invite students via `courses.students.create` |

## Forms Recipes

| Recipe | Steps |
|--------|-------|
| **Create feedback form** | 1. `gws forms create` 2. Share via `gws gmail +send` or `gws chat +send` |
| **Collect form responses** | 1. `gws forms responses list --params '{"formId":"FORM_ID"}'` |

## Cross-Service Recipes

| Recipe | Steps |
|--------|-------|
| **Send team announcement** | 1. `gws gmail +send` to team list 2. `gws chat +send --parent spaces/TEAM` |
| **Share doc and notify** | 1. `gws drive permissions create` on doc 2. `gws gmail +send` with link |
| **Post-mortem setup** | 1. `gws docs documents create` post-mortem template 2. `gws calendar events insert` review meeting 3. `gws chat +send` to space |
| **Sync contacts to sheet** | 1. `gws people people listDirectoryPeople` 2. `gws sheets +append` rows |

## Community & Feedback

- Star the repo: `https://github.com/googleworkspace/cli`
- Bugs/features: Search issues first at `https://github.com/googleworkspace/cli/issues` before creating new ones.
