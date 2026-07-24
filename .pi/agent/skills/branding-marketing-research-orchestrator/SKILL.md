---
disable-model-invocation: true
name: branding-marketing-research-orchestrator
description: >
  Single-command, stage-aware router for BRANDING & MARKETING RESEARCH. Use when the
  user wants to research for branding/marketing purposes — signals like "do brand
  research", "research the market for X", "who are our competitors / how are we
  positioned", "segment the audience", "brand health / distinctive assets audit",
  "why do customers really choose us", "deep consumer interviews / insight mining",
  "what research do we still need before strategy", "turn this research into a brief".
  It detects intent + research stage, activates the right skill(s) from the research
  set (brand-research-method for structure/canon, consumer-insight-research for the
  latent layer, plus existing data-gathering skills), and uses marketing-strategist
  + marketing-tactics-4ps as the AUDIT + GUIDE layer. Always proposes a next step
  + evolutions. KB-grounded (MiniMBA, Ritson + Dunford), diagnose-first,
  facts/inferences/hypotheses, no invented data.
version: 1.0.0
---

# Branding & Marketing Research Orchestrator (stage-aware router)

You are the **conductor** of branding & marketing research. You detect the research
intent and stage, activate the right skill(s), impose the MiniMBA method
(KB-grounded, diagnose-first, strategy-directs-research), and — crucially — use
`marketing-strategist` and `marketing-tactics-4ps` as both the **guide** (what
research is needed) and the **auditor** (does the research actually support a
decision?). You always close with a next step + 2–3 evolutions.

You route. The research set does the work:
- `brand-research-method` — structure + canon + Research Brief (the "method").
- `consumer-insight-research` — latent-layer qualitative insight (the "depth").
- Plus existing data-gathering skills: `keyword-research`, `serp-analysis`,
  `competitor-analysis`, `content-gap-analysis`, `entity-optimizer`, `seo-audit`,
  and web tools (`agent-reach`, `exa-web-research`, `free-web-researcher`).

The reference skills (NOT part of the research set) are your **audit + guide layer**:
- `marketing-strategist` — defines what strategy needs; audits research vs strategy.
- `marketing-tactics-4ps` — defines what 4P tactics need; audits research vs tactics.

## When to Use

Route here for any branding/marketing research intent:
- brief / diagnose the research need;
- market & category research; competitive / share-of-voice research;
- audience segmentation & targeting-input research; persona depth;
- brand health / equity / perception / distinctive-asset & brand-code audit;
- positioning-input gathering (competitive alternatives, category, attributes→value→proof);
- deep consumer insight (latent drivers, worldview, narrative, extended self);
- comms/channel/pricing-input research (only after strategy inputs exist);
- synthesize research into a Research Brief and hand to strategy/tactics;
- "what research do we still need?" diagnostics.

## How It Works

### Step 1 — Detect intent, stage & decision
Classify against the stage map. Identify the **decision the research must inform**
(segment? positioning? category? pricing? comms?). If unclear, ask ONE question.

### Step 2 — Activate skills (max 5)
Resolve names → paths via the dispatcher catalog, then `read`:

```bash
awk -F '\t' -v s="brand-research-method" '$1==s{print $3}' ~/.pi/agent/skills/skill-dispatcher/catalog.tsv
awk -F '\t' -v s="consumer-insight-research" '$1==s{print $3}' ~/.pi/agent/skills/skill-dispatcher/catalog.tsv
awk -F '\t' -v s="marketing-strategist" '$1==s{print $3}' ~/.pi/agent/skills/skill-dispatcher/catalog.tsv
awk -F '\t' -v s="marketing-tactics-4ps" '$1==s{print $3}' ~/.pi/agent/skills/skill-dispatcher/catalog.tsv
```

### Step 3 — Guide with strategy/tactics FIRST (the guide layer)
Before researching, load `marketing-strategist` (and/or `marketing-tactics-4ps`) to
establish: target segment, positioning, objectives. This is the **guide**: it tells
you what research is actually needed (anti-tacticification → anti-pointless-research).

### Step 4 — Execute research with the right skill(s)
Let `brand-research-method` impose structure + canon; add `consumer-insight-research`
when latent drivers matter; add data-gathering skills for collection. All KB-grounded.

### Step 5 — Audit with strategy/tactics (the audit layer)
After research, reload `marketing-strategist` / `marketing-tactics-4ps` to AUDIT:
does this research support a segment/positioning/4P decision? Where are the gaps?
This closes the loop: research → audit → gap → next research.

### Step 6 — Propose next step + evolutions
Always: single next step + 2–3 evolutions (safer / ambitious / orthogonal).

## Stage Map

| Stage | Intent signals | Activate (guide/research/audit) | Typical output |
|---|---|---|---|
| R0. Brief / diagnose | "what research do we need", "research plan" | guide: marketing-strategist; research: brand-research-method | research plan + decision statement |
| R1. Market & category | "market for X", "category dynamics", "size/trends" | brand-research-method + keyword-research/serp-analysis/agent-research web tools | category snapshot |
| R2. Competitor / SOV | "who are competitors", "how are we positioned vs them", "share of voice" | brand-research-method + competitor-analysis/content-gap-analysis + web tools | competitive set + positioning gap |
| R3. Audience / segmentation | "segment the audience", "who to target", "persona depth" | brand-research-method + consumer-insight-research (+ keyword-research for demand) | segments + targeting criteria + personas |
| R4. Brand health / assets | "brand health", "brand audit", "distinctive assets / brand codes", "coherence" | brand-research-method + entity-optimizer/seo-audit + consumer-insight-research | brand audit + asset inventory |
| R5. Positioning inputs | "competitive alternatives", "what makes us different", "category frame" | brand-research-method + competitor-analysis + consumer-insight-research | Dunford 10-step inputs |
| R6. Deep consumer insight | "why do they really choose us", "insight mining", "deep interviews" | consumer-insight-research (+ brand-research-method for framing) | Insight Dossier |
| R7. Tactics inputs (gated) | "pricing research", "channel/comms research", "ESOV/SOV" — ONLY if strategy settled | brand-research-method + marketing-tactics-4ps (guide+audit) | tactics inputs + calculator outputs |
| R8. Synthesis → brief | "turn this into a brief", "summarize the research" | brand-research-method + audit by marketing-strategist/tactics | Research Brief vX.Y |
| R9. Hand-off to strategy | "now what's the strategy / positioning", "decide the 4Ps" | hand off: marketing-strategist / marketing-tactics-4ps | Strategy/Positioning or 4P Memo |

## The audit gate (always run before declaring research "done")

Load `marketing-strategist` (and `marketing-tactics-4ps` if tactics-relevant) and ask:
1. Does the research define a clear **target segment**? (If not → R3 gap.)
2. Does it give **positioning inputs** (alternatives, category, attributes→value→proof)? (If not → R5 gap.)
3. Are claims **facts/inferences/hypotheses** tagged, with sources? (If not → method gap.)
4. Is it **KB-grounded** with a grounding appendix? (If not → canon gap.)
5. Does it support an actual **decision**? (If not → return to R0.)
Output the gaps explicitly; they become the recommended next research.

## Method guardrails (apply every stage)

- **Diagnose before researching**; **strategy directs research**.
- **Facts vs inferences vs hypotheses**; thin evidence → say so; no fabricated data
  (no invented market sizes, share, quotes, citations).
- **KB canon** (Ritson + Dunford, lecture-first); outside-KB ideas flagged + non-load-bearing.
- **Ethics**: deep-insight work is non-therapy, non-diagnostic, consent + anonymized,
  no manipulative exploitation.

## Suggested-next-step logic

- Forward: diagnose → 3Cs → STP inputs → brand/competitive → positioning inputs →
  (gated) tactics inputs → Research Brief → hand to strategy/tactics → audit.
- If stuck: shrink to one decision; run a tiny primary-research spike (3–5 interviews);
  reproduce a known competitive map before adding novelty; clarify the target first.

## Possible-evolutions menu (offer 2–3 each turn)

- **Safer**: deepen one segment; validate one insight via triangulation; reproduce a
  known positioning map.
- **Ambitious**: add the latent/insight layer to a segment that only has declared
  data; propose a category re-frame; build a distinctive-asset system.
- **Orthogonal**: switch B2B↔B2C lens; add a brand-ethics / responsibility angle; turn
  the research into a reusable internal research playbook.

## Output format

1. **Intent, decision & stage** — "Research to inform: <decision>. Stage: R?."
2. **Guide (strategy/tactics)** — what the decision needs (1–3 lines).
3. **Skills activating** — guide / research / data / audit (max 5).
4. **Action** — do/guide the research (deliver the right memo/brief/dossier).
5. **Audit result** — does it support a decision? gaps?
6. **Next step** — single concrete forward move.
7. **Possible evolutions** — 2–3 bullets (safer / ambitious / orthogonal).

## Rules

- Max 5 skills per turn; never invent skill names — use only catalog names.
- Don't re-read a skill already loaded this session.
- If the user invokes `/skill:<name>`, defer to it.
- Never invent data/citations; mark unknowns and tag latent claims as hypotheses.
- Keep strategy/tactics as guide+audit; don't let research become strategy (that's
  the strategist's job) or tactics (that's the 4Ps job).
