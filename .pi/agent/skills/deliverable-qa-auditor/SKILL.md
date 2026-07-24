---
disable-model-invocation: true
name: deliverable-qa-auditor
description: "Deliverable QA Auditor. Keywords: deliverable qa auditor."
---

# Deliverable QA Auditor

## Overview

A structured quality assurance framework for non-code deliverables — market research, segmentation, positioning, brand strategy, campaign plans, competitive analyses, and business reports.

**Core principle:** Every claim needs evidence. Every recommendation needs logic. Every deliverable needs verification before delivery.

## When to Use

**Apply before delivering:**
- Market research reports or summaries
- Segmentation or positioning documents
- Campaign strategies or media plans
- Competitive analyses
- Customer insight work
- Business cases or investment memos
- Any strategic document going to stakeholders

**Do NOT use for:**
- Code review → use `code-review`
- SEO audits → use `seo-audit`
- Ad creative review → use `creative-analyzer`
- Visual/brand identity audits → use `visual-brand-identity-audit`

## The 8-Dimension Audit

Run every dimension. Score each 1-10. No skipping.

### 1. Instruction Alignment
- Does output directly satisfy the original request?
- Missing requirements? Ignored constraints? Misunderstood objectives?
- Unnecessary additions that weren't asked for?

### 2. Strategic Coherence
- Do argument, structure, recommendations, and conclusions hold together?
- Contradictions between sections?
- Unsupported logical leaps?
- Vague reasoning disconnected from evidence?

### 3. Marketing Quality
- Customer relevance and market realism
- Competitive awareness and differentiation clarity
- Practical actionability of recommendations
- Sound strategic thinking (not just data dumping)

### 4. Evidence and Verifiability
- Which claims are supported? Which are unverifiable?
- Claims presented as facts without citations, data, or examples
- Spot anything that *sounds* factual but lacks a source

### 5. Completeness
- All necessary parts covered?
- Underdeveloped sections? Missing assumptions?
- Incomplete analysis or gaps in logic chain?

### 6. Practical Usefulness
- Can a real team use this to make decisions?
- Actionable enough to brief stakeholders?
- Clear next steps, or just analysis theater?

### 7. Clarity and Presentation
- Easy to understand for intended audience?
- Logically structured and professionally written?
- Appropriate level of detail (not too shallow, not too deep)?

### 8. Risk and Reliability
- Hallucinations or fabricated data?
- Overconfidence in weak claims?
- Generic advice that applies to anyone?
- Bias, questionable assumptions, misleading conclusions?

## Output Format

Every audit produces this structure:

```
## Executive Summary
Overall assessment: Strong / Acceptable / Weak / Not Fit for Use

## QA Scorecard
| Dimension | Score | Justification |
|-----------|-------|---------------|
| Instruction Alignment | X/10 | ... |
| Strategic Coherence | X/10 | ... |
| Marketing Quality | X/10 | ... |
| Evidence & Verifiability | X/10 | ... |
| Completeness | X/10 | ... |
| Practical Usefulness | X/10 | ... |
| Clarity & Presentation | X/10 | ... |
| Risk & Reliability | X/10 | ... |

## Pass/Fail Verdict
- Pass: Ready to use
- Conditional Pass: Usable after specific revisions
- Fail: Needs substantial rework

## What Works Well
Strongest parts and why they're effective.

## Issues Found (priority order)
For each: Issue → Why it matters → Suggested fix

## Verification Check
- Verifiable claims (can be checked)
- Claims needing evidence
- Speculative/unsupported claims
- Sources or validation methods needed

## Improvement Recommendations
Specific, actionable changes to make it decision-ready.

## Final QA Judgment
One paragraph: use as-is, revise, validate with evidence, or redo.
```

## Red Flags — Automatic Fail Triggers

Any of these = maximum urgency fix before delivery:

- **Fabricated data**: Statistics, survey results, or benchmarks invented without source
- **Contradictory recommendations**: Section A recommends X, Section B recommends not-X
- **Straw competitors**: Competitor analysis based on assumptions, not evidence
- **Vague quantification**: "Significant growth", "large segment", "most customers" without numbers
- **Missing methodology**: Research conclusions without explaining how data was gathered
- **Scope creep disguised as thoroughness**: Answering questions that weren't asked while skipping ones that were

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Praising vaguely ("great work!") | Be specific: what exactly works and why |
| Criticizing without explanation | Always explain the impact of the issue |
| Inventing facts to fill gaps | Flag gaps explicitly as "evidence needed" |
| Rewriting the deliverable | Audit, don't rewrite (unless asked) |
| Skipping dimensions to save time | All 8 dimensions, every time |
| Softening verdicts to be nice | Honesty > politeness for decision-makers |

## Evidence Hierarchy

When evaluating claims, use this ranking:

1. **Primary data**: Original research, surveys, interviews, analytics
2. **Authoritative sources**: Government stats, industry body reports, company filings
3. ** credible secondary**: Established research firms, major publications
4. **Expert opinion**: Named experts with relevant credentials
5. **Anecdotal / analogical**: Useful for illustration, never for proof
6. **Unsupported assertions**: Red flag — flag for verification or removal

## Scoring Guide

| Score | Meaning |
|-------|---------|
| 9-10 | Exceptional — publication/delivery ready |
| 7-8 | Strong — minor polishing needed |
| 5-6 | Acceptable — specific revisions required |
| 3-4 | Weak — substantial gaps or errors |
| 1-2 | Not fit for use — fundamental problems |

## The Bottom Line

**If you wouldn't stake your reputation on the deliverable, don't pass it.**

QA is not a courtesy — it's a gate. Every claim must survive scrutiny. Every recommendation must be traceable to evidence. Every deliverable must be decision-ready.
