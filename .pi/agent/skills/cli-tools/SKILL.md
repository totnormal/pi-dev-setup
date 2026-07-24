---
name: cli-tools
description: "CLI alternatives to MCP tools. Use when you need: context search/index/doctor (context-mode), browser screenshots/PDFs (playwright), or any tool that was previously an MCP server. These are bash commands, not MCP tools."
disable-model-invocation: false
---

# CLI Tools (MCP Alternatives)

Use these bash commands instead of MCP tools. They produce the same results but cost 0 extra tokens in tool schemas.

## context-mode (was 11 MCP tools)

```bash
# Search the knowledge base
context-mode search "query terms"

# Index files into the knowledge base
context-mode index ./src/
context-mode index ./docs/ --source "docs" --ext .md,.mdx

# Diagnose issues
context-mode doctor

# Upgrade hooks/permissions
context-mode upgrade
```

## playwright (was 21 MCP tools)

```bash
# Screenshot a page
npx playwright screenshot --url "http://example.com" output.png

# Generate PDF
npx playwright pdf --url "http://example.com" output.pdf

# Record browser interactions
npx playwright codegen --url "http://example.com"

# Run Playwright tests
npx playwright test
```

## stitch (Google Stitch — remote API, no CLI)

No CLI equivalent. Add back to mcpServers config when needed:
```json
"stitch": { "type": "http", "url": "https://stitch.googleapis.com/mcp", "headers": { "X-Goog-Api-Key": "..." } }
```

## revenuecat (RevenueCat — remote API, no CLI)

No CLI equivalent. Add back to mcpServers config when needed:
```json
"revenuecat": { "type": "http", "url": "https://mcp.revenuecat.ai/mcp", "headers": { "Authorization": "Bearer ..." } }
```
