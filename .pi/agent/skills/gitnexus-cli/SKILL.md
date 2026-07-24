---
name: gitnexus-cli
description: "Use when the user needs to run GitNexus CLI commands like analyze/index a repo, check status, clean the index, generate a wiki, or list indexed repos"
disable-model-invocation: true
---

# GitNexus CLI

Commands for the GitNexus codebase knowledge graph.

## Commands

```bash
gitnexus index [path]         # Index a repository
gitnexus reanalyze [path]     # Re-analyze an indexed repo
gitnexus status               # Check index health
gitnexus clean                # Remove stale index data
gitnexus wiki                 # Generate project wiki from graph
gitnexus list                 # Show all indexed repositories
```

## Usage

1. Ensure GitNexus is installed and available
2. Run `gitnexus index` from the repo root
3. Query via MCP tools or the CLI
4. Use `gitnexus status` to verify indexing is current
