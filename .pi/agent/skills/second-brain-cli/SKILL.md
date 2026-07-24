---
name: second-brain-cli
description: "Second Brain knowledge vault CLI. Capture thoughts, semantic search with Qdrant, synthesize answers. Keywords: second brain, knowledge, notes, capture, recall, search."
disable-model-invocation: true
---

# Second Brain CLI

## Usage

```bash
sb add "Thought, idea, or fact to capture"
sb search "query about any topic"
sb recent 10                    # Get 10 most recent thoughts
sb status                       # Health check
```

## How it works

Creates an SSH tunnel to `hetzner-claw` and calls the Second Brain API directly. Semantic search uses Qdrant vector similarity + multi-field text search, then synthesizes a coherent response.

## Environment

- `SB_HOST` — SSH host (default: hetzner-claw)
- `SB_PORT` — API port (default: 8321)
