# Session Patterns — concrete structures & formats

Distilled from a real run: user handed three video transcripts on "AI-first company
transition" and asked for extracted principles as a foundation for digitalising a
creative/consulting studio. Below are the reusable shapes.

## The plans/ document set (cross-referenced)

| File | Role |
|------|------|
| `<topic>-foundation.md` | The extracted framework — named pillars, tables not prose, direct-claim vs synthesis labelled |
| `<topic>-analysis-and-questions.md` | Where the framework's blind spots are + the diagnostic questions to ask the user |
| `<topic>-company-profile.md` | The user's answers + how each answer re-reads the framework (which principles are free wins, which need adapting, which don't apply) |
| `<topic>-roadmap.md` | Phased plan adapted to the user; carries a "Decisions" section |
| `phase0-inventory.md` | "What lives where" map of the user's real data stores |

Each doc opens with a `> Companion to …` header linking the others, so the set is navigable cold.

## Decision-locking format (in the roadmap)

Surface real forks with the `clarify` tool. When the user chooses, rewrite the decision block:

```markdown
### A. <Decision name> — DECIDED: <choice> ✅ (YYYY-MM-DD)
<Rationale: why this over alternatives.> **Cost accepted:** <the tradeoff.>
- **Consequence:** <what this forces downstream.>
- **Runtime/impl note:** <how it changes the build.>
```

For a "sounds cool" decision, add a **BOUNDING RULE** so it can't drift into gold-plating —
e.g. "Product-ready *hygiene*, not product-ready *architecture*. Test: if you can't tie the
structure to a real query the user will run *this month*, stop."

## Company-brain vault skeleton (Obsidian / plain markdown)

```
company-brain/
  00-inbox/            # unsorted capture
  01-identity/         # who we are, brand, tone, pricing logic
  02-clients/          # one note per client (history, positioning, proposal/pricing memory)
  03-projects/
    <division-a>/      # e.g. consulting
    <division-b>/      # e.g. media-production
    <division-c>/      # e.g. news-outlet
    <division-d>/      # e.g. ai-products
  04-people/
  05-finance/
  06-decisions/        # decision records (date-titled)
  07-skills/           # "SOPs for AI" — repeatable processes
  99-meta/templates/   # copy-me starters
```

Template frontmatter should carry: `status`, `division`/`type`, dates, `dri` (directly
responsible individual), `tags`, and a `## Related` section with `[[wikilinks]]` to client,
project, people, and the source Drive/Dropbox path. Keep templates empty with `{{placeholders}}`,
not pre-filled with hypotheticals.

## Phase 0 inventory pattern

- Probe the filesystem for cloud mounts: `~/Library/CloudStorage/*` (Google Drive shows as
  `GoogleDrive-<account>`, Dropbox as `Dropbox`), `~/Library/Mobile Documents/com~apple~CloudDocs`
  (iCloud). Gmail is generally NOT filesystem-mounted → recommend Google Takeout (mbox) or
  OAuth for later.
- Filter noise aggressively: exclude `.tmp`, `.shortcut-targets-by-id`, `.Trash`, dotfiles when
  listing Google Drive trees.
- Business core usually concentrates in **Shared drives**, not personal My Drive. Personal My
  Drive often holds academic/personal content that must stay OUT of the business brain.
- Output a table: store | what's there | business relevance (⭐ mark migrate-first).
- End with a "what only the user can do next" checklist (unzip a large Notion export, choose a
  Gmail strategy) and a numbered migration priority list.

## Sequencing verdict that recurred

- If the user is already tool-fluent (e.g. vibecodes), **compress/skip the LEARN phase** — the
  "founder conviction" prerequisite is already met.
- Lead with **WIRE (the knowledge/legibility layer)** when the user's #1 pain is "no full
  picture / can't find past work" — that pain *is* the company-brain problem.
- Pick the beachhead by sharpest pain (e.g. "can't find past proposals" → migrate the
  proposals/tenders drive first), not by convenience.
