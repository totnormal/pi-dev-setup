---
name: codegraph-cli
description: "CodeGraph CLI for code intelligence. Semantic search, context building, symbol lookup, dependency graphs. Keywords: codegraph, code search, symbols, context, graph."
disable-model-invocation: true
---

# CodeGraph CLI

## Usage

```bash
codegraph init [path]                      # Initialize in project
codegraph index [path]                     # Index all files
codegraph sync [path]                      # Sync changes
codegraph status [path]                    # Show index status
codegraph query <search>                   # Search for symbols
codegraph context <task>                   # Build context for a task
codegraph files [path]                     # Show file structure from index
codegraph visualize [path]                 # Open graph visualization
codegraph affected [files...]              # Find test files affected by changes
```

## Already installed

CodeGraph is available as `codegraph` on PATH. No MCP server needed — the CLI is the native interface.
