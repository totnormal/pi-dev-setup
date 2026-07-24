---
name: neon-db-cli
description: "Neon serverless Postgres CLI. Manage projects, branches, databases, connection strings via HTTP API. Keywords: neon, postgres, database, sql, serverless."
disable-model-invocation: true
---

# Neon DB CLI

## Usage

```bash
neon-db projects                           # List projects
neon-db project <id>                       # Project details
neon-db branches <project_id>              # List branches
neon-db databases <project_id> [branch]    # List databases
neon-db connection-string <project_id>     # Get connection string
neon-db create-project --name NAME         # Create project
```

## Auth

Set `NEON_API_KEY` or save to `~/.config/neon-api-key`.
Get one at: https://console.neon.tech/account/settings#api-keys
