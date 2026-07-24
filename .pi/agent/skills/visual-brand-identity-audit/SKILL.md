---
disable-model-invocation: true
name: visual-brand-identity-audit
description: Comprehensive visual brand identity audit and direction-sett
---

# Visual Brand Identity Audit

## Extended Details



Deliver a forensic, evidence-led visual brand identity audit with clear recommendations, candid tone, and practical next steps.

## Default Behavior

- Use external research by default (website, social profiles, campaign surfaces, app listings, press kits, competitor visuals) unless the user asks otherwise.
- Ask the user to confirm brand disambiguation after first-pass research if only a brand name is provided.
- Ask targeted intake questions in rounds. Do not force a single intake pass.
- Use a candid tone calibrated to 7-8/10 directness: clear, blunt, constructive, never insulting.
- Cite evidence and source links as often as possible.

## Minimum Input Threshold

Proceed when at least one is true:
- The user provides a brand name.
- The user provides a link or asset folder.

If only brand name is provided:
1. Find likely official website and social profiles.
2. Confirm with the user that the brand match is correct.
3. Continue after confirmation or correction.

## Workflow

1. Run `references/agent-system-prompt.md` as the governing prompt for the session.
2. Run intake using `references/intake-question-bank.md`:
   - Ask only high-leverage questions.
   - Group by Strategy, Audience, Category/Competitors, Assets/Touchpoints, Constraints.
   - Use multiple rounds when needed.
3. Build evidence base:
   - Prefer user-provided assets first.
   - Add external evidence by default.
   - Track assumptions explicitly and mark confidence.
4. Audit using all lenses in `references/audit-lenses.md`.
5. Build scorecard:
   - Score each dimension 0-10.
   - Set dynamic `category_importance` and `client_importance` per dimension.
   - Calculate aggregated weighted score via `scripts/weighted_score.py`.
6. Choose output mode:
   - `Market research / competitor scan` context: full audit only.
   - `Client brand improvement` context: full audit + territories (min 3) or quick fixes when structural changes are unnecessary.
7. Produce final output using `references/output-template.md`.
8. End with 5-10 follow-up questions that improve the next iteration.

## Decision Rules

- Output `Audit + Quick Fixes` when identity fundamentals are strong and issues are mainly executional.
- Output `Audit + Territories` when positioning expression, distinctiveness, or system architecture requires meaningful redesign.
- Never claim legal infringement. Use similarity risk language and recommend legal review when needed.
- Always include WCAG 2.1 AA contrast checks and legibility risks when discussing color or type.

## References (Load As Needed)

- `references/agent-system-prompt.md`: standalone agent prompt (part 2 deliverable).
- `references/intake-question-bank.md`: high-leverage intake question bank.
- `references/audit-lenses.md`: complete audit lens criteria.
- `references/output-template.md`: markdown output contract.
- `references/aapter-palette-method.md`: palette method adapted from the provided Opara/Cantwell source.
- `references/harshness-rubric.md`: candor calibration rubric.

## Script

- `scripts/weighted_score.py`: compute normalized weighted aggregate score from per-dimension score + importance values.
