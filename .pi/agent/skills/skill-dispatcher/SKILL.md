---
name: "skill-dispatcher"
description: "Pi's internal skill dispatching and cataloging system. Provides commands to rebuild the skill catalog (catalog.sh), search skills (/skills), and manage skill loading. This is an internal Pi skill that always stays active."
disable-model-invocation: true
---

# Skill Dispatcher

Internal Pi skill that indexes and dispatches skills in the conversation.

## Commands

- `/skills` — interactive skill browser
- `/skills <query>` — search and load a skill

## Catalog

The catalog at `catalog.tsv` is regenerated via `catalog.sh` and indexes all skill directories.

## For Recipe Developers

- Skill frontmatter `name:` is the key used for dispatch
- Add `disable-model-invocation: true` to prevent auto-loading
- The catalog respects Pi's skill filter settings

