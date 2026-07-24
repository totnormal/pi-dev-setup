# Positioning Advisor Plugin

A Claude Code plugin that provides world-class strategic marketing advice using the methodologies of **Mark Ritson** (MiniMBA) and **April Dunford** (Obviously Awesome, Sales Pitch).

## Overview

This plugin creates an autonomous agent that acts as a senior marketing strategist, combining:

- **Mark Ritson's MiniMBA frameworks**: Market Orientation, Research, Segmentation, Targeting, Positioning, and Objectives
- **April Dunford's positioning methodology**: 10-step positioning process, alternative analysis, sales pitch structure
- **Brutally honest advisory tone**: Challenges assumptions, exposes blind spots, prioritizes truth over politeness

## Key Capabilities

The agent can help with:

1. **Positioning Strategy**
   - Competitive positioning analysis
   - Category selection and framing
   - Differentiation vs distinctiveness evaluation
   - Positioning statement development

2. **Segmentation & Targeting**
   - Segment identification (demographic, behavioral, needs-based, JTBD)
   - Target market selection using STAGE criteria
   - Market attractiveness analysis

3. **Strategic Objectives**
   - Funnel analysis and objective setting
   - SMART objective formulation
   - KPI selection aligned to strategy

4. **Brand Strategy**
   - Brand codes (distinctive assets) identification
   - Brand positioning vs brand belief hierarchy
   - Perceptual mapping

## Knowledge Base

The agent references materials from the MiniMBA Knowledge Base:
```
/Users/andreitarnovski/Library/CloudStorage/GoogleDrive-andrei@tarnovski.com/Shared drives/Admin T.com/MiniMBA MK/Readings/MiniMBA-KB-strat/
```

This includes lecture transcripts from Ritson's Modules 1-6 and Dunford's books.

## Usage

### Automatic Triggering
The agent triggers automatically when you describe positioning or strategic marketing challenges:

> "I need help positioning our product against competitors"
> "How should we segment this market?"
> "Review this positioning statement"
> "What marketing objectives should we set?"

### Framework-Specific Requests
You can request specific frameworks:

> "Use Ritson's STP framework to analyze our segmentation"
> "Apply Dunford's 10-step positioning process"
> "Build a perceptual map for our competitive positioning"

## Agent Configuration

- **Name**: `positioning-advisor`
- **Color**: Magenta (distinctive visual identifier)
- **Model**: Inherits from parent (use Opus for complex analysis)
- **Tools**: Read, Grep, Glob, Bash, Agent

## Core Principles

### From Ritson (MiniMBA)
- Diagnosis → Strategy → Tactics (never skip)
- The Two D's: Differentiation vs Distinctiveness
- Brand Codes as sensual identifiers
- Funnel-based objective setting
- Market orientation (you are not the customer)

### From Dunford (Obviously Awesome)
- "Positioning is context"
- "Competitors are what customers would do without you"
- 10-step positioning process
- Sales Pitch structure (8 steps)
- Best-fit customer identification

## Output Structure

The agent provides structured responses:

1. **Honest Assessment** - Unfiltered diagnosis of flaws (3-7 bullets)
2. **Positioning Analysis** - Framework-by-framework application
3. **Action Plan** - Prioritized 0-30 days / 1-3 months / 3-12 months

## Versioning

When iterating on deliverables, the agent uses version headers:
```
## Positioning Statement v1.2 – 28.02.2026
```

## External Framework Rule

If non-Ritson/Dunford concepts are relevant, they are:
1. Explicitly flagged as external
2. Briefly explained
3. Not used as core recommendations

---

**Note**: This agent prioritizes strategic effectiveness over politeness. Expect direct, sometimes harsh feedback designed to improve your positioning strategy.
