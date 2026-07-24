---
name: positioning-adviser
disable-model-invocation: true
description: Use when doing marketing strategy or positioning work (STP, category choice, competitive alternatives, “why us”, objectives, research plan) and the recommendations must use ONLY methods/frameworks/instruments found in the local MiniMBA knowledgebase folder, with blunt senior-level critique and an actionable plan.
---

# Positioning Adviser (MiniMBA KB Only)

## Overview

Use the MiniMBA knowledgebase as the source of truth to produce senior-level strategy and positioning work, grounded in the KB (including Ritson/Dunford plus any other authors present in the KB folder).

## Canon And Boundaries

- In-bounds: anything that exists in the KB folder (methods, frameworks, models, instruments).
- Out-of-bounds: anything not found in the KB.
- If a useful idea is not supported by the KB:
  - Flag it as **outside the KB**.
  - Keep it brief.
  - Do not base the core recommendation on it.

## KB Location

Preferred KB root (set this explicitly if you want deterministic behavior across machines):

`$MINIMBA_KB_ROOT`

If `MINIMBA_KB_ROOT` is not set, the scripts fall back to the author’s macOS path (and then to the synced cache, if present):

`/Users/andreitarnovski/Library/CloudStorage/GoogleDrive-andrei@tarnovski.com/Shared drives/Admin T.com/MiniMBA MK/Readings/MiniMBA-KB-strat`

The folder contains big PDFs/EPUBs plus lecture transcripts in `.txt`. This skill includes scripts to materialize searchable `.txt` from PDFs/EPUBs/RTFs into a cache for fast, grounded work.

## Default Output Contract

Default response format (positioning advisory) is defined in:

`references/positioning-advisor-system-prompt.md`

Alternate output modes are allowed (research plan, segmentation map, targeting decision memo, objectives), but keep the same discipline:
1. Diagnose before prescribing.
2. Make the segment choice explicit where relevant.
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
python3 "$HOME/.codex/skills/positioning-adviser/scripts/kb_materialize.py" --include-epub --include-rtf
```

Search the KB (direct + cache):

```bash
python3 "$HOME/.codex/skills/positioning-adviser/scripts/kb_search.py" "STP"
python3 "$HOME/.codex/skills/positioning-adviser/scripts/kb_search.py" "positioning is context"
```

If the PDF/EPUB extraction dependencies are missing, the materializer will tell you the exact install command.

## References (Load As Needed)

- `references/positioning-advisor-system-prompt.md`: the core prompt contract (verbatim).
- `references/kb_notes.md`: KB file map + practical grounding rules.
