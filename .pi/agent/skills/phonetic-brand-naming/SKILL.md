---
disable-model-invocation: true
name: phonetic-brand-naming
description: "Phonetic Brand Naming (Strategy + Sound First). Create strategy-aligned, confidently sayable brand names and rank them with a rigorous phonetic + marketing rubric"
---

# Phonetic Brand Naming (Strategy + Sound-First)

## Extended Details



## Overview

Create strategy-aligned, confidently sayable brand names and rank them with a rigorous phonetic + marketing rubric. Enforce practical constraints (real-world pronounceability, hearability, spellability) while still delivering high creative quality.

## Non-Negotiables

- Do not claim trademark/domain availability.
- Do not imply web research. Treat all checks as heuristic unless the user provides data.
- Do not produce generic "brand fluff". Make specific, testable claims (and flag uncertainty).
- Prefer names a stranger can say correctly after seeing once.
- Treat "positioning as context": a name only makes sense inside a category/alternative set. If category/alternatives are unclear, fix that first.

## Before Asking Questions

1. If `.claude/product-marketing-context.md` exists, read it first and reuse it. Ask only for missing/ambiguous info.
2. If the user already provided everything needed to write a Strategy Spine + Naming Brief, proceed without follow-up questions.

## Step 0 - Confirm Inputs (Ask Only What's Missing)

If any critical info is missing, ask a compact set of questions (max 8) and then stop (wait).

Critical inputs (minimum viable):

- Offering: what is being named, what it does, one-sentence explanation.
- Audience: who it's for (buyer/user), context of use.
- Positioning: strongest alternative, key differentiators, any proof points.
- Brand personality: 3-5 adjectives + 1 "we are / we are not" pair.
- Competitive set: 3-8 competitor/adjacent names (plus status quo).
- Constraints: must-have/must-avoid, length/syllables, name styles, spelling rules.
- Geography/languages: target regions + languages to risk-scan, accent to optimize for.

Question style rules:

- Ask only what you truly need to proceed.
- Prefer short, multiple-choice prompts for constraints (but do not force the user into them).
- If the user is vague, propose 1-2 reasonable assumptions and ask for confirmation.

If the user hasn't provided a naming problem at all (e.g., "help me with naming"), reply with:
`Please enter your phonetic brand naming request and I will start the process.`
Then wait.

## Execution Workflow (Use This Every Time)

Follow the user's requested deliverable; otherwise default to the full workflow below.

### Step 1 - Build the Strategy Spine (No Fluff)

Create a concise Strategy Spine from the inputs:

- One-sentence positioning statement (audience, category context, competitive alternative, differentiated value).
- Primary audience + context of use.
- Key differentiators (3 max, written as "capability -> value").
- Brand personality: 3-5 adjectives + "we are / we are not".
- Desired emotional response (1-2 words).
- Naming direction (e.g., "warm & human", "sharp & premium", "playful & modern").

### Step 2 - Define the Naming Brief (Make Constraints Explicit)

Translate strategy into a Naming Brief:

- Choose 2-4 allowed name styles: Descriptive, Suggestive, Metaphoric, Arbitrary, Coined, Portmanteau, Acronym/Initialism, Founder/Place-based.
- Length targets: characters + syllables (include a "hard max").
- Sound targets: 3-5 descriptors (e.g., crisp/gentle/energetic/luxury/trustworthy).
- Must-have / must-avoid letters, sounds, words, and themes.
- Pronunciation rules: "obvious in English", "avoid silent letters", "avoid ambiguous vowels", etc.
- Regions and languages to scan (based on user inputs).
- Extension plan: future product/tier naming system (Brand + Descriptor, Brand + Model, etc).

Use `references/name_generation_playbook.md` for name-style selection heuristics and how to carve out distinct "phonetic territory" vs competitors.

### Step 3 - Generate Name Candidates (Quantity + Variety)

Generate 30 candidates total across 5 buckets (6 each):

- Suggestive strategy-fit names
- Metaphor/imagery names
- Coined names (phonotactically natural; not random strings)
- Compound/portmanteau names (clean; non-clunky)
- Premium minimal short names (2-6 letters or 1-2 syllables)

For each candidate, include:

- Name
- "Sounds like" (simple phonetic cue, e.g., KAH-ree-oh)
- IPA (where feasible; if unsure, state uncertainty)
- Syllable count + primary stress
- Sound profile tags (2-4): soft/hard, warm/cool, playful/serious, fast/steady, natural/technical, classic/modern
- One-sentence strategy-fit note

Use `references/phonetics_toolkit.md` for IPA/stress guidance and "spoken-word performance" heuristics.

### Step 4 - Phonetic & Marketing Scoring (Rank Rigorously)

Before assigning scores, give brief justifications (one line per criterion for the name set or top set).

Score each candidate 0-10 across:

- Strategy alignment
- Pronounceability (first-read accuracy)
- Hearability (easy to catch in conversation)
- Spellability (over-the-phone)
- Memorability (rhythm, distinctiveness, imagery)
- Distinctiveness (not generic; not easily confused)
- Sonic appropriateness (sound symbolism matches desired feeling)
- Extensibility (product lines, verbs, community name, tagline)
- Risk flags (reverse score: fewer risks = higher score)

Then:

- Select Top 10.
- Identify 2-3 "dark horse" picks (unusual but high potential).

Use `references/scoring_rubric.md` for scoring definitions and common failure modes.

### Step 5 - Stress Tests (Simulate Real Life)

For Top 10, run:

- Radio test: "Hi, this is ___" (mishearing risk?)
- Phone test: "It's spelled ___" (awkward or easy?)
- Noisy room test: confusion with common words/brands?
- Searchability heuristic: too generic/common-looking? (no web browsing)
- Accent tolerance: what breaks under the user's region/accent
- Visual test: how it looks in lowercase/uppercase/wordmark

Produce pass/fail notes and spelling/pronunciation tweaks when helpful.

For multilingual markets, run a cautious risk scan and flag uncertainty clearly. Use `references/risk_scan.md`.

### Step 6 - Shortlist & Final Recommendations

Deliver:

- Final Top 5 ranked
- For each finalist: 1-line brand promise fit + phonetic advantage + one drawback + mitigation
- 3 tagline directions per finalist (direction lines only; no campaigns)
- Naming architecture suggestion for future products/tiers
- A recommended: winner + runner-up + safe choice + bold choice
- Next legal steps checklist (trademark search, domain checks, linguistic review, counsel)

### Step 7 - Iteration Mode (Only If Asked)

If the user asks for more rounds, first ask which direction to iterate:

- More premium vs more friendly vs more disruptive
- Shorter vs more evocative
- More literal vs more abstract

Then generate 15 additional names in the chosen direction and re-run a lightweight version of Steps 4-6.

## Output Contract (Must Follow Exactly)

Output must be structured exactly as in `references/output_format.md`:

- Use the same tag names and ordering.
- Put all content inside `<Deliverable>...</Deliverable>`.
- For lists, repeat the provided child tags (e.g., multiple `<Name>...</Name>`).
- Do not wrap the deliverable in a code fence.
- Do not add extra top-level sections outside the template.
