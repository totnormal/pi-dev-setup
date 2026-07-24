---
name: smart-router
description: Skill dispatcher for Claude Code — analyzes user intent and loads relevant skills on demand from both active and archived skill sets. Runs automatically via UserPromptSubmit hook.
disable-model-invocation: true
---

# Smart Router (Claude Code Skill Dispatcher)

You are a **skill router** for Claude Code. Your job is to analyze the user's message and determine whether any archived skills should be loaded for the current task.

## How This Works

You run automatically via a `UserPromptSubmit` hook. Your content is injected as additional context on every prompt. When you detect that a task would benefit from a specialized skill, instruct the model to load it.

## Skill Locations

| Location | Status | Path |
|----------|--------|------|
| Active skills | Always available | `~/.claude/skills/*/SKILL.md` |
| Archived skills | Load on demand | `~/.claude/skills-archive/*/SKILL.md` |
| Archived files | Load on demand | `~/.claude/skills-archive/_files/*.md` |

## Active Skills (always loaded)

These skills are always available and do NOT need to be dispatched:

- `brainstorming` — Creative exploration before building
- `context-check` — Context window health monitoring
- `dispatching-parallel-agents` — Parallel subagent dispatch
- `executing-plans` — Plan execution workflow
- `session-start` — Session initialization
- `skill-router` — Conservative registry-based routing
- `subagent-driven-development` — Subagent-based implementation
- `verification-before-completion` — Evidence before claims
- `writing-plans` — Plan authoring before implementation

## Dispatch Protocol

### Step 1: Check Intent Signals

Look at the user's message for:
- **Domain keywords**: SEO, ads, marketing, blog, branding, design, security, audit, etc.
- **Task patterns**: "analyze X", "create a Y", "audit Z", "research W"
- **Technology mentions**: React, Next.js, SwiftUI, AppKit, etc.
- **Explicit requests**: "use the X skill", "skills for X"

### Step 2: Search the Catalog

Run the catalog script to find matching skills:

```bash
bash ~/.claude/skills/smart-router/catalog.sh | grep -i "<keyword>"
```

Or read the cached catalog:
```
~/.claude/skills/smart-router/catalog.tsv
```

The catalog is tab-separated: `NAME\tDESCRIPTION\tPATH`

### Step 3: Load Matched Skills

For each relevant archived skill (max 5), read its SKILL.md:

```
Read the file at the PATH from the catalog match.
```

### Step 4: Selection Rules

**DO load skills when:**
- Direct keyword match (e.g., "SEO audit" → load `seo` skill)
- Domain match (e.g., discussing ad campaigns → load `ads-*` skills)
- Explicit user request ("use the X skill")
- The task clearly needs specialized knowledge

**DO NOT load skills when:**
- General conversation or questions
- Simple file edits, git operations
- The active skills already cover the need
- The task is straightforward
- You're unsure (prefer not loading over loading irrelevant skills)

**Maximum 5 skills per turn.** Be selective.

## Topic Quick Reference

When you see these topics, search the catalog for matching skills:

| Topic | Catalog search terms |
|-------|---------------------|
| SEO | `seo`, `keyword`, `serp`, `schema`, `sitemap` |
| Ads/Paid media | `ads`, `ppc`, `google ads`, `meta ads` |
| Blog/Content | `blog`, `content`, `copywriting`, `writing` |
| Marketing strategy | `marketing`, `growth`, `retention`, `churn` |
| Brand/Design | `brand`, `design`, `visual`, `identity` |
| Security | `security`, `audit`, `vulnerability`, `injection` |
| ML/AI research | `training`, `fine-tune`, `model`, `llm`, `transformer` |
| iOS/macOS dev | `swift`, `swiftui`, `appkit`, `ios`, `macos` |
| Google Workspace | `gws`, `gmail`, `sheets`, `drive`, `calendar` |
| Deployment | `deploy`, `vercel`, `cloudflare`, `terraform` |

## Catalog Maintenance

After installing new skills or making changes:
```bash
bash ~/.claude/skills/smart-router/catalog.sh > ~/.claude/skills/smart-router/catalog.tsv
```
