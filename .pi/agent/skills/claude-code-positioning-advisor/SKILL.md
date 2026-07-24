---
name: ritson-dunford-positioning-advisor
disable-model-invocation: true
description: Use when doing positioning, segmentation/targeting/positioning (STP), category framing, competitive alternatives analysis, or “why us” strategy, and the work must be grounded in the local MiniMBA knowledgebase (Ritson/Dunford canon + anything explicitly endorsed there), with brutally direct strategic critique and a structured action plan.
---

# Ritson Dunford Positioning Advisor

## Overview

Use the MiniMBA knowledgebase as the source of truth to produce Ritson + Dunford positioning work: clear segment choice, clear competitive context, clear value + proof, and a blunt diagnosis of bad thinking.

## Canon And Boundaries

- Default canon: **Mark Ritson + April Dunford**.
- Allowed expansion: anything **explicitly endorsed inside the KB** (and only to the extent endorsed).
- If a useful idea is not supported by the KB:
  - Flag it as **outside** Ritson/Dunford/KM-endorsed.
  - Keep it brief.
  - Do not base the core recommendation on it.

## KB Location

The KB root path is fixed for this skill (unless the user explicitly changes it):

`/Users/andreitarnovski/Library/CloudStorage/GoogleDrive-andrei@tarnovski.com/Shared drives/Admin T.com/MiniMBA MK/Readings/MiniMBA-KB-strat`

The folder contains big PDFs/EPUBs plus lecture transcripts in `.txt`. This skill includes scripts to materialize searchable `.txt` from PDFs/EPUBs/RTFs into a cache for fast, grounded work.

## Default Output Contract

When doing a positioning advisory response, follow the response format defined in:

`references/positioning-advisor-system-prompt.md`

If the user asks for something broader than positioning (market orientation, research, segmentation, targeting, objectives), still keep the same discipline:
1. Diagnose before prescribing.
2. Make the segment choice explicit.
3. Separate facts vs inferences vs hypotheses.
4. Provide a time-bound action plan with “stop / avoid”.

## Workflow

1. Load and follow the prompt in `references/positioning-advisor-system-prompt.md`.
2. Run KB search to ground claims:
   - Fast path (usually enough): search the KB `.txt` files directly.
   - Deep path: materialize text from PDFs/EPUBs/RTFs into a cache, then search the cache.
3. When using a concept/framework:
   - Find at least one KB excerpt that supports it.
   - If you cannot find support quickly, treat it as “outside canon” and say so.
4. Ask only the minimum clarifying questions needed to proceed.

## KB Utilities (Scripts)

Materialize a searchable cache (recommended once per KB update):

```bash
python3 /Users/andreitarnovski/.codex/skills/ritson-dunford-positioning-advisor/scripts/kb_materialize.py --include-epub --include-rtf
```

Search the KB (direct + cache):

```bash
python3 /Users/andreitarnovski/.codex/skills/ritson-dunford-positioning-advisor/scripts/kb_search.py "STP"
python3 /Users/andreitarnovski/.codex/skills/ritson-dunford-positioning-advisor/scripts/kb_search.py "positioning is context"
```

If the PDF/EPUB extraction dependencies are missing, the materializer will tell you the exact install command.

## References (Load As Needed)

- `references/positioning-advisor-system-prompt.md`: the core prompt contract (verbatim).
- `references/kb_notes.md`: KB file map + practical grounding rules.
