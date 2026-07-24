# Phonemic Confusions — AI/Developer-Domain Captions

A working table of terms that auto-captions (YouTube ASR, Whisper) routinely mangle. Use as a starting hypothesis list — **always web-verify before applying**. Entries annotated `[verified]` were confirmed against authoritative sources; `[unverified]` is phonemic guess only.

## Single-letter / acronym errors

| Misheard | Correct | Why | Verified? |
|----------|---------|-----|-----------|
| `CRI` | `CLI` | "R" and "L" are adjacent in the acoustic space; "CLI" appears 10x more often in dev talk than "CRI" (Command Runner Interface is rare; Carbon Rod Instrument isn't a dev term) | [verified] |
| `SQL` (when context is non-database) | `cron` / `scheduling` / `queue` | "SQL" over-applied to anything ending in -ul | [verified in this session] |
| `JSON` (when context is non-data) | often correct, sometimes `Jason` | "JSON file" is correct; "JSON this" is usually "Jason" | [observed pattern] |
| `API` ↔ `APE` | `API` | "APE" almost never correct in tech context | [rule of thumb] |
| `GPT` ↔ `JPT` / `GPD` | `GPT` | | [rule of thumb] |

## Compound tool / product names

| Misheard | Correct | Notes | Verified? |
|----------|---------|-------|-----------|
| `claw code` / `Claw Code` | `Claude Code` | The "Cl" digraph is unstable in ASR | [verified — Anthropic's CLI] |
| `open claw` | `OpenClaw` | Garry Tan's agent tool (NOT to be confused with Claude Code) | [verified — github.com/garrytan/gbrain README] |
| `Jbrain` / `Gibbering` / `gibbering` | `GBrain` (Garry Tan's Opinionated OpenClaw/Agent Brain) | Captions see the capitals as new word boundaries | [verified — github.com/garrytan/gbrain] |
| `printing press` (correct as-is) | `Printing Press` | Lucky case — lowercase phrase survived | [verified — printingpress.dev, mvanhorn/cli-printing-press] |
| `Lupini` / `Loop Me` | `Loopany` (superdesigndev/loopany) | "Loopany" has a non-English -any ending that ASR mangles to known words | [verified — github.com/superdesigndev/loopany] |
| `Crewlet` ↔ `cru let` / `cru-latte` | `Crewlet` | The "ew" vowel is unstable | [observed in loopany README] |
| `Stone X` | `Stone` (handle: @stonexer) | Captions sometimes append the GitHub handle letter | [verified — loopany contributors] |

## Human names

| Misheard | Correct | Verified? |
|----------|---------|-----------|
| `Jerry Tan` (when speaker says "Garry") | `Garry Tan` | [verified — YC president, github.com/garrytan] |
| `Andrew Kopsy` / `Andrew Kopey` | `Andrej Karpathy` (when context is "LLM Wiki" or research papers) | [verified — gist by Karpathy linked from loopany README] |
| `Trevor` (when context is "agent-native CLIs") | `Matt Van Horn` | [verified — author of "10 Principles for Agent-Native CLIs", trevinsays.com, mvanhorn] |
| `Diana` (when context is YC control systems) | Could be `Diana Hu` (YC partner) or other — **verify the speaker's claim** before correcting | [unverified — keep + flag] |

## Idioms / multi-word phrases that got mangled

| Misheard | Correct | Why | Verified? |
|----------|---------|-----|-----------|
| `company I Porsche` | `a portfolio company` | "I" is auto-caption "a", "Porsche" is "portfolio" with 2 phonemes off | [verified pattern] |
| `Air B&B Co` | `Airbnb` (or `Airbnb Co`) | "B&B" punctuation confuses ASR | [verified pattern] |
| `SQL` (in "memory and SQL") | `cron` (in "memory and cron jobs" — the next line clarifies) | Caption picked up wrong word for the parallel structure | [verified in this session — context confirms cron] |
| `cloud auto dreaming` | `autonomous dreaming` / `cloud dreaming` / `background dreaming` | The full phrase was likely "autonomous dreaming" — verify against speaker's known terminology | [unverified — flag] |
| `AEO creator` | `AEO grader` | Actual product name (HubSpot's "Free AEO Grader") | [verified — speaker's description link confirmed product name] |

## Verification workflow for new confusions

When you encounter a mishearing not in this table:

1. **Check the speaker's known context.** What tools/people do they reference? Search their GitHub.
2. **Check the video's description / links.** The actual URL often reveals the canonical spelling.
3. **Check adjacent captions.** ASR errors often propagate through multiple lines; fixing one usually fixes the next.
4. **When in doubt, leave it.** A flagged uncertainty is better than a confidently wrong correction.

## Adding to this table

When you find a new verified confusion, append a row. Format:
```
| `<misheard string>` | `<correct string>` | `<why this happens, briefly>` | [verified — <source>] |
```

Keep entries terse — this is a quick-reference table, not a tutorial.