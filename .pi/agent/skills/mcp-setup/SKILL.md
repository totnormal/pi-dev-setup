---
name: mcp-setup
disable-model-invocation: true
description: "Set up and configure MCP (Model Context Protocol) servers in Hermes Agent."
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [mcp, setup, configuration, tools]
---

# MCP Server Setup

Hermes Agent includes a built-in MCP client that can connect to local stdio or remote HTTP MCP servers, automatically discovering their tools and making them available as first-class tools.

## When to Use

Use this skill when you need to:
- Add an MCP server to extend Hermes with external capabilities (e.g., filesystem, GitHub, documentation).
- Configure MCP servers for use in your local or profile-specific Hermes instance.
- Troubleshoot MCP server connections.

## Quick Start

```bash
# Add an MCP server (example: Context7)
hermes mcp add <name> --command <cmd> --args <arg1> <arg2> ... [--api-key <key>]

# Example for Context7 (requires API key)
hermes mcp add context7 --command npx --args -y @upstash/context7-mcp --api-key YOUR_CTX7_KEY

# List configured MCP servers
hermes mcp list

# Test connection
hermes mcp test <name>

# Remove an MCP server
hermes mcp remove <name>
```

## Configuration Details

MCP servers are configured under the `mcp_servers` key in `~/.hermes/config.yaml`.

### Stdio Transport (command-based)

```yaml
mcp_servers:
  server_name:
    command: "npx"               # executable
    args: ["-y", "package-name"] # arguments
    env:                         # optional environment variables
      SOME_KEY: "value"
    timeout: 120                 # per-tool-call timeout (seconds)
    connect_timeout: 60          # connection timeout (seconds)
    enabled: true
```

### HTTP Transport (url-based)

```yaml
mcp_servers:
  server_name:
    url: "https://example.com/mcp"
    headers:
      Authorization: "Bearer sk-..."
    timeout: 180
    connect_timeout: 60
    enabled: true
```

## Common MCP Servers

| Server | Purpose | Install Command |
|--------|---------|-----------------|
| `@modelcontextprotocol/server-filesystem` | Local file system access | `npx -y @modelcontextprotocol/server-filesystem /path/to/dir` |
| `@modelcontextprotocol/server-github` | GitHub API | `npx -y @modelcontextprotocol/server-github` (requires `GITHUB_PERSONAL_ACCESS_TOKEN` in `env`) |
| `@upstash/context7-mcp` | Context7 documentation and library resolution | `npx -y @upstash/context7-mcp` (requires `CONTEXT7_API_KEY` in `args` or `env`) |
| `mcp-server-time` | Current time | `uvx mcp-server-time` |

## Tool Naming

MCP tools are prefixed with `mcp_<server>_<tool>` (hyphens/dots replaced with underscores).

Example: Server `context7`, tool `resolve-library-id` → `mcp_context7_resolve_library_id`.

## Pitfalls & Troubleshooting

- **Missing MCP SDK**: Install with `pip install mcp` (or `uv pip install mcp`).
- **Command not found**: Ensure `npx`, `uvx`, or the specified command is in PATH.
- **Package not found**: For npx servers, verify the npm package name; add `-y` to auto-install if needed.
- **Timeouts**: Increase `connect_timeout` if server takes long to start.
- **Authentication**: For stdio servers, pass secrets via `env` (not inherited automatically). For HTTP servers, use `headers`.
- **Tool not appearing**: Check Hermes startup logs for connection messages; ensure server is listed under `mcp_servers` with correct indentation.
- **Sampling**: MCP servers can request LLM completions; disable per server with `sampling: { enabled: false }` if untrusted.

## Verification

After adding a server, start a new Hermes session and ask the agent to list tools or use a specific MCP tool, e.g.:

```
/tool mcp_context7_resolve_library_id
```

## References

- See `references/context7.md` for Context7‑specific details and examples.
- Official Hermes MCP documentation: https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp/