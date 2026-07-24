# KB Notes (MiniMBA-KB-strat)

KB root:

Preferred (set explicitly):

`$MINIMBA_KB_ROOT`

macOS default path (historical):

`/Users/andreitarnovski/Library/CloudStorage/GoogleDrive-andrei@tarnovski.com/Shared drives/Admin T.com/MiniMBA MK/Readings/MiniMBA-KB-strat`

Synced cache location (works well on Linux/VPS):

`$HOME/.codex/kb_cache/minimba-kb-strat`

What’s in there (observed):

- Ritson MiniMBA modules as large PDFs (ex: `1.  Market Orientation —  ALL MR.pdf`, `3.  Segmentation — ALL MR.pdf`, `5.  Positioning — ALL MR.pdf`)
- Lecture transcripts as `.txt` (good for fast grounding)
- Dunford books as `.epub` plus at least one `.txt` (`Sales Pitch` is already `.txt`; `Obviously Awesome` is `.epub`)
- “readings-main/” includes other strategy/marketing readings (Sharp, Rumelt, Binet/Field, etc.)

Practical grounding rules:

- Prefer grounding in `.txt` first (fast, searchable).
- When you need more coverage, materialize PDFs/EPUBs/RTFs into a text cache via `scripts/kb_materialize.py`.
- When you rely on a framework/instrument:
  - Find at least one excerpt in the KB that supports it.
  - If you can’t find it quickly, treat it as outside the KB and explicitly flag it.

File naming gotchas:

- Some filenames contain non-breaking spaces and/or leading spaces (example: `␠ALL Modules.txt` is actually named with a leading space: ` ALL Modules.txt`).
