---
name: gitnexus-guide
description: "Use when the user asks about GitNexus itself — available tools, how to query the knowledge graph, MCP resources, graph schema, or workflow reference. Examples: \"What GitNexus tools are available?\", \"How do I use GitNexus?\""
disable-model-invocation: true
---

# GitNexus Guide

Reference for GitNexus — the codebase knowledge graph tool.

## Available Tools

- **Index/Reanalyze**: Build or refresh the knowledge graph
- **Status**: Check index health
- **Query**: Search the graph for symbols, dependencies, callers
- **Clean**: Remove stale data
- **Wiki**: Generate project wiki from graph
- **List**: Show indexed repos

## MCP Resources

GitNexus exposes resources via `gitnexus://` URIs for repository metadata, symbol definitions, dependency chains, and call graphs.

## Workflow

1. `gitnexus index` to build the graph
2. `gitnexus query "symbol X"` to find its definition and references
3. Use `gitnexus analyze` for impact analysis before refactoring
