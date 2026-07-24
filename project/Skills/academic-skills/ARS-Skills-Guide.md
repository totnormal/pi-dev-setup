# Academic Research Skills Suite (ARS) — Quick Reference

> A coordinated set of 4 skills covering the full academic research lifecycle: deep research → paper writing → peer review → pipeline orchestration.
> **Author:** Imbad0202 / Edward Wu (https://github.com/Imbad0202) — License: CC BY-NC 4.0
> Location: `~/.pi/agent/skills/{academic-deep-research,academic-paper,academic-paper-reviewer,academic-pipeline}`

---

## Skill Overview

| Skill | Version | What It Does | Agents |
|-------|---------|-------------|--------|
| **academic-deep-research** | 2.9.3 | 13-agent deep research pipeline | 13 |
| **academic-paper** | 3.1.1 | 12-agent paper writing pipeline | 12 |
| **academic-paper-reviewer** | 1.9.0 | 7-agent multi-perspective peer review | 7 |
| **academic-pipeline** | 3.7.0 | 10-stage end-to-end orchestrator | 4 |
| **ars-shared** | — | Shared references (style calibration, mode spectrum, contracts) | — |

---

## 1. Deep Research — `academic-deep-research`

13-agent pipeline for rigorous academic research on any topic. Produces APA 7.0 reports.

### 7 Modes

| Mode | When to Use |
|------|-------------|
| `full` | Clear research question, need comprehensive report |
| `quick` | 30-min brief on a topic |
| `socratic` | Vague idea, need guided thinking through research direction |
| `review` | Have a paper to evaluate before citing |
| `lit-review` | Literature review for a topic |
| `fact-check` | Verify specific claims |
| `systematic-review` | PRISMA-compliant systematic review / meta-analysis |

**Default when unsure**: Start with `socratic` — it helps figure out what you need.

### 6-Phase Workflow

```
Phase 1: SCOPING (interactive)
  → research_question_agent  → FINER-scored RQ + scope boundaries
  → research_architect_agent → Methodology blueprint
  → devils_advocate_agent    → CHECKPOINT 1 (blocks on critical issues)
  → User confirmation required

Phase 2: INVESTIGATION
  → bibliography_agent        → Systematic search + annotated bibliography (APA 7.0)
  → source_verification_agent → Evidence hierarchy grading, predatory journal detection

Phase 3: ANALYSIS
  → synthesis_agent        → Cross-source synthesis, gap analysis
  → devils_advocate_agent  → CHECKPOINT 2 (cherry-picking, confirmation bias)

Phase 4: COMPOSITION
  → report_compiler_agent → Full APA 7.0 draft

Phase 5: REVIEW (parallel)
  → editor_in_chief_agent  → Editorial verdict (Accept/Revise/Reject)
  → ethics_review_agent    → Ethics clearance
  → devils_advocate_agent  → CHECKPOINT 3 (final vulnerability scan)

Phase 6: REVISION
  → report_compiler_agent → Final report (max 2 revision loops)
```

### 13 Agents

| # | Agent | Role |
|---|-------|------|
| 1 | `research_question_agent` | FINER-scored research questions |
| 2 | `research_architect_agent` | Methodology blueprint |
| 3 | `bibliography_agent` | Systematic literature search |
| 4 | `source_verification_agent` | Fact-checking, evidence grading |
| 5 | `synthesis_agent` | Cross-source integration |
| 6 | `report_compiler_agent` | APA 7.0 report drafting |
| 7 | `editor_in_chief_agent` | Q1 journal editorial review |
| 8 | `devils_advocate_agent` | Logical fallacy detection |
| 9 | `ethics_review_agent` | AI-assisted research ethics |
| 10 | `socratic_mentor_agent` | Socratic guided research thinking |
| 11 | `risk_of_bias_agent` | RoB 2 / ROBINS-I assessment |
| 12 | `meta_analysis_agent` | Meta-analysis + GRADE |
| 13 | `monitoring_agent` | Post-research literature monitoring |

### Quick Commands
```
Research the impact of AI on higher education quality assurance          → full mode
Guide my research on declining birth rates and private universities      → socratic mode
Quick brief on transformer attention mechanisms                          → quick mode
Fact-check: does spaced repetition improve long-term retention by 200%? → fact-check mode
```

---

## 2. Academic Paper — `academic-paper`

12-agent pipeline for writing academic papers. 10 modes, 6 paper types, 5 citation formats, LaTeX/DOCX/PDF output.

### 10 Modes

| Mode | When to Use |
|------|-------------|
| `full` | Complete paper from scratch |
| `plan` | Step-by-step planning guidance (prefer when unsure) |
| `outline` | Just the outline |
| `revision` | Revise based on review comments |
| `revision-coach` | Parse unstructured reviewer comments into Revision Roadmap |
| `abstract` | Just the abstract |
| `lit-review` | Literature review section only |
| `format-convert` | Convert between formats (LaTeX, DOCX, PDF, Markdown) |
| `citation-check` | Verify citation compliance |
| `disclosure` | AI disclosure statement |

### 8-Phase Workflow (full mode)

```
Phase 0: CONFIG        → intake_agent              → Paper config (type, discipline, format)
Phase 1: RESEARCH      → literature_strategist      → Search strategy + sources
Phase 2: ARCHITECTURE  → structure_architect        → Outline + evidence map
Phase 3: ARGUMENTATION → argument_builder           → Claim-evidence chains
Phase 4: DRAFTING      → draft_writer               → Complete draft
Phase 5a: CITATIONS    → citation_compliance ─┐     → Citation audit
Phase 5b: ABSTRACT     → abstract_bilingual  ─┘     → Bilingual abstract (parallel)
Phase 6: PEER REVIEW   → peer_reviewer              → Simulated review (max 2 loops)
Phase 7: FORMAT        → formatter                  → Final output (LaTeX/DOCX/PDF/MD)
```

### Supported Formats
- **Citation**: APA 7.0, Chicago, MLA 9, IEEE, Vancouver
- **Output**: LaTeX (.tex + .bib), DOCX (via Pandoc), PDF, Markdown
- **Figures**: matplotlib/seaborn (Python) or ggplot2 (R) with APA 7.0 formatting

### 12 Agents

| # | Agent | Role |
|---|-------|------|
| 1 | `intake_agent` | Config interview |
| 2 | `literature_strategist_agent` | Search strategy + source screening |
| 3 | `structure_architect_agent` | Paper structure + outline |
| 4 | `argument_builder_agent` | Argument construction |
| 5 | `draft_writer_agent` | Section-by-section drafting |
| 6 | `citation_compliance_agent` | Citation format verification |
| 7 | `abstract_bilingual_agent` | Bilingual abstract (zh-TW + EN) |
| 8 | `peer_reviewer_agent` | Simulated double-blind review |
| 9 | `formatter_agent` | Format conversion |
| 10 | `socratic_mentor_agent` | Plan mode guidance |
| 11 | `visualization_agent` | Publication-quality figures |
| 12 | `revision_coach_agent` | Parse reviewer comments into roadmap |

### Key Features
- **Style Calibration** — Provide 3+ past papers to learn your writing voice
- **Writing Quality Check** — Flags AI-typical terms, em dash overuse, monotonous rhythm
- **Anti-Patterns** with IRON RULE markers

### Quick Commands
```
Write a paper on AI's impact on education quality assurance    → full mode
Help me plan a paper on transformer architectures              → plan mode
Convert my paper to LaTeX                                      → format-convert mode
I received reviewer comments, help me revise                   → revision-coach mode
```

---

## 3. Paper Reviewer — `academic-paper-reviewer`

7-agent multi-perspective peer review. Simulates 5 independent reviewers with field-specific expertise.

### 6 Modes

| Mode | When to Use |
|------|-------------|
| `full` | Comprehensive first-submission review |
| `re-review` | Verify revisions addressed comments |
| `quick` | 15-min quality assessment |
| `methodology-focus` | Methods/statistics only |
| `guided` | Socratic guided review (learn by doing) |
| `calibration` | Measure reviewer accuracy against gold set |

### 3-Phase Workflow (full mode)

```
Phase 0: FIELD ANALYSIS
  → field_analyst_agent → Identifies field, configures 5 reviewer personas
  → User confirms/adjusts personas

Phase 1: PARALLEL REVIEW (5 independent reviewers, no cross-referencing)
  → EIC Reviewer             → Journal fit, originality, significance
  → Methodology Reviewer     → Research design, statistical validity, reproducibility
  → Domain Reviewer          → Literature coverage, theoretical framework
  → Perspective Reviewer     → Cross-disciplinary connections, practical impact
  → Devil's Advocate         → Core argument challenges, logical fallacies

Phase 2: EDITORIAL SYNTHESIS
  → editorial_synthesizer_agent → Consolidates reviews, editorial decision, revision roadmap
  → Decision: Accept / Minor Revision / Major Revision / Reject

Phase 2.5: REVISION COACHING (if not Accept)
  → EIC guides Socratic dialogue on revision strategy
```

### IRON RULES
1. 5 reviewers review independently — no cross-referencing
2. Synthesizer cannot fabricate review comments
3. Devil's Advocate CRITICAL issues → Decision cannot be Accept
4. Reviewers MUST NOT modify the manuscript (read-only)

### Quick Commands
```
Review this paper: [paste or file path]          → full mode
Quick look at this paper                          → quick mode
Check the methodology of this paper               → methodology-focus mode
I revised my paper, verify the changes            → re-review mode
```

---

## 4. Pipeline Orchestrator — `academic-pipeline`

10-stage end-to-end orchestrator coordinating the other 3 skills. Adds integrity verification, two-stage review, and reproducible quality gates.

### 10 Stages

| Stage | Name | Skill Called | Key Output |
|-------|------|-------------|------------|
| 1 | RESEARCH | `academic-deep-research` | RQ Brief, Methodology, Bibliography |
| 2 | WRITE | `academic-paper` | Paper Draft |
| **2.5** | **INTEGRITY** | integrity_verification_agent | Verification report (blocks on fail) |
| 3 | REVIEW | `academic-paper-reviewer` | 5 reviews + Editorial Decision |
| 4 | REVISE | `academic-paper` | Revised Draft + Response to Reviewers |
| **3'** | **RE-REVIEW** | `academic-paper-reviewer` | Verification of revisions |
| **4'** | **RE-REVISE** | `academic-paper` | Second revision (if needed) |
| **4.5** | **FINAL INTEGRITY** | integrity_verification_agent | Must achieve 100% pass |
| 5 | FINALIZE | `academic-paper` | Final paper (MD → DOCX → LaTeX → PDF) |
| 6 | PROCESS SUMMARY | orchestrator | Paper creation process record |

### State Machine
```
RESEARCH → WRITE → INTEGRITY (pass required) → REVIEW
  ↓ (Reject)                                    ↓ (Accept)
  WRITE (restart)                   FINAL INTEGRITY (100% pass) → FINALIZE → PROCESS SUMMARY
  ↓ (Minor/Major)
  REVISE → RE-REVIEW → RE-REVISE → FINAL INTEGRITY → FINALIZE
```

### Adaptive Checkpoints
- **FULL** — Full deliverables list + decision dashboard (first checkpoint, integrity boundaries)
- **SLIM** — One-line status (after 2+ consecutive "continue")
- **MANDATORY** — Cannot skip (integrity fails, review decisions, finalization)

### Mid-Entry Points
```
"I want to write a research paper on [topic]"           → Stage 1 (RESEARCH)
"I already have a paper, help me review it"              → Stage 2.5 (INTEGRITY)
"I received reviewer comments, help me revise"           → Stage 4 (REVISE)
```

### Cross-Session Resume (opt-in)
```bash
# In emitting session:
ARS_PASSPORT_RESET=1    # enables boundary checkpoints in passport

# In fresh session:
resume_from_passport=<hash> [stage=<n>] [mode=<m>]
```

---

## Cross-Skill Feature Matrix

| Feature | deep-research | paper | reviewer | pipeline |
|---------|:---:|:---:|:---:|:---:|
| Devil's Advocate checkpoints | ✅ 3 | — | ✅ (dedicated reviewer) | — |
| Integrity verification | — | — | — | ✅ (2x mandatory) |
| Socratic mode | ✅ | ✅ (plan) | ✅ (guided) | — |
| Bilingual output (zh-TW + EN) | — | ✅ | — | ✅ (process record) |
| Style Calibration | ✅ (consumes) | ✅ (produces) | — | — |
| Writing Quality Check | ✅ | ✅ | — | — |
| APA 7.0 | ✅ | ✅ | — | — |
| Multiple citation formats | — | ✅ (5 formats) | — | — |
| LaTeX/DOCX/PDF output | — | ✅ | — | ✅ |
| Figure generation | — | ✅ (matplotlib/ggplot2) | — | — |
| Meta-analysis | ✅ | — | — | — |
| Calibration mode | — | — | ✅ | — |
| Revision coaching | — | ✅ | ✅ | — |

---

## Shared Components (`ars-shared/`)

- `style_calibration_protocol.md` — Voice learning from past papers
- `mode_spectrum.md` — Fidelity ↔ Balanced ↔ Originality spectrum across skills
- `writing_quality_check.md` — AI pattern detection checklist
- `raise_framework.md` — RAISE principles compliance
- `collaboration_depth_rubric.md` — Human-AI collaboration scoring
- `sprint_contract.schema.json` — Generator-evaluator contract schema (v3.6.6)

---

## Typical Workflows

### Full Pipeline (research → publication)
```
"Write a research paper on [topic]"
→ academic-pipeline handles everything: research → write → integrity → review → revise → finalize
```

### Just Research
```
"Research [topic]"                    → academic-deep-research (full mode)
"Guide my research on [topic]"        → academic-deep-research (socratic mode)
```

### Just Writing
```
"Write a paper on [topic]"            → academic-paper (full mode)
"Help me plan a paper about [topic]"  → academic-paper (plan mode)
"Convert my paper to LaTeX"           → academic-paper (format-convert mode)
```

### Just Review
```
"Review this paper"                   → academic-paper-reviewer (full mode)
"Quick assessment of this paper"      → academic-paper-reviewer (quick mode)
```

### Revision Cycle
```
"Help me revise based on these comments" → academic-paper (revision-coach → revision)
"I revised my paper, check it again"     → academic-paper-reviewer (re-review mode)
```
