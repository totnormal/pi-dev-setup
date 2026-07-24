---
name: explore
description: Turns vague ideas into structured discovery briefs through guided questioning, brainstorming, and research. Use when exploring a new idea, investigating a problem, or brainstorming before planning.
disable-model-invocation: true
---

# Explore Skill

Structured exploration that turns vague ideas into actionable discovery briefs. Combines questioning rigor (grill-me style) with brainstorming breadth and research depth.

## When to Use

Trigger when:
- User says "I have an idea...", "What if we...", "I'm thinking about..."
- User has a vague problem that needs structuring
- Starting research on a topic, market, or technology
- Before jumping to planning or implementation
- User asks "help me think through...", "let's explore...", "brainstorm..."

Do NOT trigger when:
- User already has a clear PRD or plan → use `plan` skill
- User is ready to code → use `execute` skill
- User is asking a quick factual question → just answer

## Process

### Phase 1: Understand (5 min)

Ask targeted questions to surface the core:

1. **Problem framing** — What pain exists? Who feels it? How do they solve it now?
2. **Constraints** — Time, budget, tech stack, team, existing systems?
3. **Success vision** — What does "done" look like in the best case?
4. **Scope guardrails** — What's explicitly out of scope?

Present your assumptions. If multiple interpretations exist, present them all — don't pick silently. If something is unclear, stop and ask.

### Phase 2: Stress-Test (5 min)

Challenge the idea like a ruthless investor:

1. **What's the simplest version?** (Can this be a script instead of an app?)
2. **What's the hardest part?** (What will actually kill this?)
3. **Who's already doing this?** (Quick competitive check)
4. **What would make you abandon this?** (Kill conditions)
5. **What's the one thing that must be true?** (Core assumption to validate)

Push back when warranted. If a simpler approach exists, say so.

### Phase 3: Research (10 min)

Use available tools to gather evidence:

- `free_web_search` — Market research, competitors, similar tools
- `ctx_fetch_and_index` — Deep-dive into relevant pages/docs
- `memory_search` — Check for prior work on this topic
- Read existing files — Check if similar work exists in the codebase

Cite sources. Flag conflicting information. Note gaps where evidence is missing.

### Phase 4: Synthesize

Produce a **Discovery Brief** with:

```markdown
# Discovery Brief: [Topic]

## Problem Statement
[1-2 sentences: what pain, for whom, why now]

## Key Findings
1. [Finding with evidence]
2. [Finding with evidence]
3. [Finding with evidence]

## Assumptions & Risks
- **Assumption**: [what you're assuming] → **Validation**: [how to check]
- **Risk**: [what could go wrong] → **Mitigation**: [how to handle]

## Recommended Approach
[1-2 paragraphs: what to do next and why]

## Open Questions
1. [Question that needs answering before proceeding]
2. [Question]

## Competitive Landscape
[If applicable: who else is doing this, how they do it, gaps]

## Decision
- [ ] Ready to plan → proceed to `plan` skill
- [ ] Need more research → specify what's missing
- [ ] Kill / deprioritize → explain why
```

## Quality Gates

Before delivering the brief:
- [ ] Every claim has evidence or is flagged as an assumption
- [ ] The simplest viable approach is identified
- [ ] At least one "kill condition" has been tested
- [ ] Open questions are specific enough to be answerable
- [ ] The brief is useful without the conversation context

## Pitfalls

- Don't let the user skip to implementation. Exploration saves time.
- Don't produce a generic brief — tailor it to the specific idea.
- Don't ask more than 5 questions at once. 2-3 focused questions beat 10 broad ones.
- Don't research forever. Timebox and synthesize what you have.
