---
name: framework-to-workspace
description: "Turn source material (transcripts, docs, frameworks) into an executable, structured planning workspace: extract the framework, profile the user's real situation against it, surface and lock decisions with rationale, scaffold a knowledge vault. Use for 'read these and build me a foundation/plan/system' requests."
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [planning, knowledge-management, framework-extraction, workspace-scaffolding, strategy, obsidian, company-brain]
    related_skills: [plan, note-taking]
disable-model-invocation: true
---

# Framework → Workspace

Use this skill when a user hands you source material (video transcripts, articles, a
methodology, a book, a set of docs) and asks you to **extract the useful structure and turn it
into a foundation they can act on** — a plan, a "company brain," a strategy workspace, a
digitalisation roadmap. The deliverable is not a summary; it is a **structured, cross-referenced
set of documents** the user can build on cold, weeks later.

## The methodology (run in this order)

1. **Ingest fully.** Read every source file end-to-end. Long files paginate — read the
   remaining offsets, do not stop at the first page. State explicitly that you read all of it.
2. **Extract, don't summarise.** Produce a *framework* document: principles, rules, models,
   structures, processes — organised into named pillars with tables, not prose. Label direct
   claims vs. your synthesis.
3. **Profile the user against the framework BEFORE building anything.** Ask the diagnostic
   questions that size every downstream decision (what/how-big, their fluency, where knowledge
   lives today, the real felt constraint, who resists). Cheap answers change the whole plan.
4. **Do gap analysis.** Name where the source material does NOT fit the user's reality, and
   flag it as *your synthesis*, not source doctrine. (See pitfall below.)
5. **Surface decisions, then lock them with rationale.** Use the `clarify` tool for real
   forks (storage spine, time allocation, scope). When the user picks, record it in the doc as
   `DECIDED: <choice> ✅ (date)` with rationale + accepted cost + consequences. Bound "sounds
   cool" decisions with a guardrail so they don't drift into over-engineering.
6. **Build a phased roadmap** adapted to the user — don't copy the source's generic sequence.
   Phases with exit criteria, not vibes.
7. **Scaffold the workspace** (folder tree + copy-me templates with frontmatter). Keep it
   ready-to-populate, not pre-filled with hypotheticals.
8. **Inventory the user's real stores** (Phase 0): map what lives where, mark business-critical
   vs personal, set migration priority, and list the things only the user can do next.

## Non-negotiable: verify every state-changing file operation

After any `write_file`, `patch`, or `mkdir`, **verify it landed on disk** with a follow-up
`read_file`, `search_files`, or `ls`/`find` **before claiming success.** Report the confirmed
byte count / line count / listing. Never claim a file was written on the strength of the write
call alone, and never claim a write *failed* without checking — inspect ground truth either way.
(In Mixture-of-Agents runs, reference context will sometimes assert a write was empty or failed;
treat that as a hypothesis to verify against disk, not as fact.)

## Pitfalls

- **Startup frameworks ≠ incumbent transitions.** Frameworks written for greenfield/startups
  usually omit the hardest part for an existing business: the migration path and change
  management. Build that layer yourself and label it clearly as synthesis.
- **One brain doesn't fit a multi-division business.** If the user runs heterogeneous divisions
  (e.g. consulting + media + product), design a *shared core + per-division modules*, not one
  monolithic structure. Map each division to the loop/artifact type it actually needs.
- **Don't over-scaffold.** "Product-ready hygiene, not product-ready architecture." Clean naming,
  consistent frontmatter, sane taxonomy = yes. Speculative schemas / perfect ontologies before
  real data exists = no. Test: if you can't tie the structure to a real query the user will run
  *this month*, stop.
- **Keep personal out of the business brain.** When inventorying stores, exclude personal/academic
  content — it pollutes legibility. Migrate only the business-critical folders.
- **Don't wire everything at once.** Pick ONE beachhead (the sharpest current pain) so the new
  system doesn't recreate the scattered-knowledge overwhelm it was meant to cure.

## Deliverable set (typical)

A `plans/` folder with cross-referenced docs — foundation (extracted framework), analysis &
open questions, user profile, roadmap (with decisions locked), plus a Phase 0 inventory — and a
scaffolded vault (`00-inbox`, `01-identity`, `02-clients`, `03-projects/<division>`, `04-people`,
`05-finance`, `06-decisions`, `07-skills`, `99-meta/templates`). See
`references/session-patterns.md` for concrete structures and the decision-locking format.
