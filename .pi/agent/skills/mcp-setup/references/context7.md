# Context7 MCP Server

Context7 provides an MCP server for accessing up-to-date documentation and code examples.

## Quick Setup

```bash
hermes mcp add context7 \
  --command npx \
  --args -y @upstash/context7-mcp --api-key CTX7SK...
```

## Tools

- `resolve-library-id`: Resolves a package/product name to a Context7‑compatible library.
- `query-docs`: Retrieves and queries up‑to‑date documentation and code examples.

## Usage Examples

After adding the server, you can ask Hermes to:

- "Use the context7 tool to resolve the library ID for 'lodash'."
- "Query the latest documentation for the 'react' library using context7."

## Notes

- The server requires a valid Context7 API key, obtainable at https://context7.com.
- Tool names are prefixed with `mcp_context7_`.
- Remember to start a new session after adding the server for the tools to become available.