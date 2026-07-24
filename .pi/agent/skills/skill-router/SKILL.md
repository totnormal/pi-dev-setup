---
disable-model-invocation: false
name: skill-router
description: "Recommends and activates skills. Use when the user mentions 'skill', asks 'is there a skill for X', or when a task clearly matches a known skill domain (SEO, Cloudflare, GitHub, transcription, research, etc). Searches the catalog, recommends 0-3 skills, and loads them via /skill:name."
---

# Skill Router

Proactively recommend and activate skills based on user intent. All other skills have `disable-model-invocation: true` — they are NOT in the system prompt. This skill is the bridge between the user's request and the right skill.

## When to Activate

Trigger this skill when ANY of these are true:
- User explicitly mentions "skill", "skills", or asks "is there a skill for…"
- User asks to do something that a specialized skill handles (see Domain Quick Reference below)
- User types `/skills` or `/skill:name`

## How to Route

### Step 1: Search the catalog
```bash
# Option A: use the slash command
/skills <user's domain keywords>

# Option B: search catalog.tsv directly
grep -i "<keywords>" ~/.pi/agent/skills/skill-dispatcher/catalog.tsv
```

### Step 2: Recommend
Present 0-3 matching skills with a one-line reason:
```
Found: <skill-name> — <why it matches>
```

### Step 3: Activate
Load the skill so its full instructions enter context:
```
/skill:<skill-name>
```
Or read the SKILL.md directly if `/skill:` is unavailable.

## Domain Quick Reference

| User says / task is about | Likely skill |
|---|---|
| SEO, audit, Core Web Vitals, schema | `seo` |
| Cloudflare Workers, KV, D1, R2 | `cloudflare` |
| Cloudflare CLI, deploy, wrangler | `wrangler` |
| GitHub PR, issue, repo, auth | `github-pr-workflow`, `github-issues`, `github-auth` |
| Transcribe audio/video, whisper | `audio-transcription-diarization` |
| YouTube transcript extraction | `youtube-transcript` |
| arXiv papers, research | `arxiv`, `research-paper-writing` |
| Create a new skill (SKILL.md) | `skill-creator`, `open-knowledge-write-skill` |
| GDPR compliance | `gdpr-data-handling` |
| Web performance, Lighthouse | `web-perf` |
| Email sending via Cloudflare | `cloudflare-email-service` |
| Browser automation, QA | `gstack-gstack` |
| Translation, localization | `translation-reframing-audience-shift-2` |
| Polymarket | `polymarket` |

This table is NOT exhaustive — always search the catalog for anything not listed.

## Guardrails
- Prefer 0-3 skills. Maximum 5 for multi-domain tasks.
- Do not guess skill names — verify via catalog search first.
- If no skill matches, say so and proceed without one.
- Do not activate a skill just because one keyword matches — read the description first.
