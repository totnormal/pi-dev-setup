---
disable-model-invocation: true
name: idealist
description: "Idealist Idea Generator. Transform raw concepts into refined, scored ideas through systematic generation and evaluation. Keywords: idealist."
---

# Idealist Idea Generator

## Extended Details

## Overview

Transform raw concepts into refined, scored ideas through systematic generation and evaluation. Inspired by Yohei Nakajima's idealist project.

**Core principle:** Generate many variations, ask clarifying questions, score against criteria, iterate on the best.

**Announce at start:** "I'm using the Idealist skill to generate and refine ideas."

## When to Use This Skill

Invoke Idealist when:
- Brainstorming features, products, or solutions
- Exploring multiple approaches to a problem
- Need structured creativity with evaluation
- Want to escape "first idea" bias
- Generating alternatives before committing to a direction

**Use the brainstorming skill first for:** Understanding requirements and context before idea generation.

## The Process

### Phase 1: Input Capture
1. **Accept the concept** from your human partner
2. **Identify the domain** (product, feature, solution, strategy, etc.)
3. **Ask clarifying questions** about:
   - Core problem being solved
   - Target audience or users
   - Key constraints (time, resources, technical)
   - Success criteria

**Ask ONE question per message.**

### Phase 2: Divergent Generation

Generate **6-10 distinct ideas** covering:
- **Conservative approaches** - proven, low-risk iterations
- **Moderate innovations** - balanced risk/reward
- **Ambitious concepts** - breakthrough potential
- **Wild cards** - unexpected angles

For each idea, provide:
```
## [Idea Name]

**Concept:** [Brief description]

**How it works:** [Mechanism/approach]

**Why it could work:** [Rationale]

**Potential challenges:** [Key risks]
```

### Phase 3: Scoring Matrix

Score each idea on **custom criteria** relevant to the domain:

**Standard criteria (adapt as needed):**
- **Novelty** (1-10): How unique/original
- **Feasibility** (1-10): How achievable given constraints
- **Impact** (1-10): Potential value if successful
- **Clarity** (1-10): How well-defined and understood

**Calculate total score** and rank ideas.

Present as:
```
| Rank | Idea | Novelty | Feasibility | Impact | Clarity | Total |
|------|------|---------|-------------|--------|---------|-------|
```

### Phase 4: Convergent Refinement

**Ask your partner:** "Which ideas resonate most? I'll refine the top 2-3."

For each selected idea:
1. **Expand on key details**
2. **Identify next questions** to explore
3. **Suggest improvements** or combinations
4. **Flag potential issues** to investigate

### Phase 5: Iteration Loop (Optional)

If partner wants deeper exploration:
1. **Generate variations** of selected ideas
2. **Apply constraints** to filter further
3. **Test assumptions** through targeted questions
4. **Combine elements** from multiple ideas

## Example Execution

**Input:** "I want to build a better note-taking app"

**Clarifying questions:**
- "Who is the primary user?"
- "What problem with existing notes apps bothers you most?"
- "What's your core constraint: time, budget, or technical complexity?"

**Ideas might include:**
- AI-powered automatic organization
- Voice-first capture with transcription
- Collaborative mind-mapping interface
- [and 6 more diverse concepts]

**Scoring** leads to refining the top 2-3 with deeper exploration.

## Key Principles

1. **Quantity first, quality second** - Generate many before filtering
2. **Divergent before convergent** - Explore broadly before narrowing
3. **Score transparently** - Make evaluation criteria explicit
4. **Iterate on signal** - Refine what shows promise, discard what doesn't
5. **One question per turn** - Don't overwhelm with multiple questions
6. **Avoid judgment during generation** - Ideas flow better when uncriticized initially

## Related Skills

**Before Idealist:**
- `brainstorming` - For understanding requirements and context

**After Idealist:**
- Implementation planning skills when ready to build
- Architecture skills when approaches have genuine trade-offs

## Remember

- Announce the skill at start
- Generate 6-10 ideas minimum
- Score with transparent criteria
- Refine only what shows promise
- One question per message during clarification
