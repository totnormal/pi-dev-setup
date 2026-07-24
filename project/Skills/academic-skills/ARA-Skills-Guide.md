# Agent-Native Research Artifact (ARA) — Skills Guide

> **Author:** Orchestra Research (https://github.com/Orchestra-Research)
> Source: https://github.com/Orchestra-Research/Agent-Native-Research-Artifact
> Paper: arXiv:2604.24658 | npm: `@orchestra-research/ara-skills@0.2.0`
> Installed: 2026-05-13

---

## What is ARA?

ARA is a protocol that recasts research from narrative documents into **machine-executable knowledge packages** so AI agents can navigate, reproduce, and extend published research without re-discovering every dead end.

### Artifact Structure

```
artifact/
  PAPER.md                    # Root manifest + layer index (~200 tokens)
  logic/                      # Cognitive layer — What & Why
    problem.md                #   Observations → gaps → key insight
    claims.md                 #   Falsifiable assertions with proof refs
    concepts.md               #   Formal definitions
    experiments.md            #   Declarative experiment plans
    solution/
      architecture.md         #   System design + component graph
      algorithm.md            #   Math + pseudocode
      constraints.md          #   Boundary conditions
      heuristics.md           #   Implementation tricks + rationale
    related_work.md           #   Typed dependency graph
  src/                        # Physical layer — How
    configs/                  #   Hyperparameters with rationale
    environment.md            #   Dependencies, hardware, seeds
  trace/                      # Exploration graph — Journey
    exploration_tree.yaml     #   Research DAG with typed nodes + dead ends
  evidence/                   # Raw proof
    tables/                   #   Exact result tables
    figures/                  #   Extracted data points
```

### Key Design Principles

- **Progressive disclosure** — `PAPER.md` (~200 tokens) tells agents whether the artifact is relevant
- **Cross-layer binding** — Claims ↔ Experiments ↔ Evidence ↔ Code refs all resolve
- **Dead ends preserved** — Failed approaches are first-class nodes in the exploration graph
- **Provenance tracking** — Every entry tagged as `user`, `ai-suggested`, `ai-executed`, or `user-revised`

---

## Three Skills

### 1. Compiler — `/compiler <path>`

Converts ANY research input into a complete ARA artifact. Accepts PDFs, GitHub repos, experiment logs, code directories, raw notes, or combinations.

**4-Stage Epistemic Protocol:**
1. **Semantic Deconstruction** — Extract raw knowledge atoms (math, configs, results, citations, negative results)
2. **Cognitive Mapping** — Map to claims, concepts, experiments in `/logic/`
3. **Physical Stubbing** — Generate configs and code stubs in `/src/`
4. **Exploration Graph Extraction** — Reconstruct the research DAG in `/trace/`

**Commands:**
```
/compiler path/to/paper.pdf
/compiler https://github.com/org/repo
/compiler path/to/paper.pdf path/to/code/ --output ./my-artifact/
```

**Key Rules:**
- Exact numbers — never round or approximate
- No hallucination — don't invent claims not in source
- `experiments.md` has NO exact numbers (directional only) — exact values go in `evidence/`
- Every claim must have proof referencing experiment IDs (E01, E02...)
- Dead ends matter — include failed approaches and rejected alternatives
- Run coverage check loop (max 3 rounds) then Seal Level 1 validation

---

### 2. Research Manager — `/research-manager`

End-of-turn recorder that captures research-significant events into `ara/`. Uses **progressive crystallization**: trace events go direct, knowledge events stage until closure.

**When it runs:** At the END of every turn, after the user's request is fully addressed. Never mid-turn.

**Three-Stage Pipeline:**

| Stage | Purpose |
|-------|---------|
| **Context Harvester** | Scan this turn for research-significant activity |
| **Event Router** | Classify, tag provenance, route: direct (decisions, experiments, dead ends) vs staged (claims, heuristics, concepts) |
| **Maturity Tracker** | Crystallize staged observations only when closure signals appear |

**Closure Signals** (required for crystallization — no counters, no LM judgment):
1. **Topic abandonment** — No events in last 5 turns AND not in `open_threads`
2. **Verbal affirmation** — User explicitly endorsed ("yes", "confirmed", "ship it")
3. **Empirical resolution** — Experiment produced a result and researcher commented
4. **Artifact commitment** — Downstream artifact now depends on the observation

**Provenance Tags:** `user` | `ai-suggested` | `ai-executed` | `user-revised`

**ARA directory for live research:**
```
ara/
  PAPER.md, logic/, src/, evidence/     # Same structure as compiled ARA
  trace/
    exploration_tree.yaml                # Research DAG
    pm_reasoning_log.yaml                # Manager's organizational decisions
    sessions/session_index.yaml          # Master session index
    sessions/YYYY-MM-DD_NNN.yaml         # Per-day session records
  staging/
    observations.yaml                    # Crystallization buffer
```

**Rules:**
- Never run mid-turn
- Stage by default for interpretive events (claims, heuristics)
- Never crystallize without a closure signal
- Never auto-upgrade provenance
- Never silently overwrite contradictions — flag both and defer
- Skip empty turns (greetings, acks)

---

### 3. Rigor Reviewer — `/rigor-reviewer <artifact_dir>`

Semantic epistemic review (ARA Seal Level 2). Assumes Level 1 structural validation passed. Scores 6 dimensions, produces `level2_report.json`.

**Six Review Dimensions:**

| Dim | Evaluates |
|-----|-----------|
| **D1. Evidence Relevance** | Does cited evidence substantively support each claim? |
| **D2. Falsifiability Quality** | Are falsification criteria meaningful, actionable, independently testable? |
| **D3. Scope Calibration** | Do claims assert exactly what evidence supports (no over/under-claiming)? |
| **D4. Argument Coherence** | Does the narrative follow a logical arc problem→solution→evidence? |
| **D5. Exploration Integrity** | Does the exploration tree document genuine process including failures? |
| **D6. Methodological Rigor** | Are experiments well-designed with baselines, ablations, statistics? |

**Scoring:** Each dimension 1–5. Grade by mean:

| Grade | Condition |
|-------|-----------|
| **Strong Accept** | mean ≥ 4.5 AND no dimension < 3 |
| **Accept** | mean ≥ 3.8 AND no dimension < 2 |
| **Weak Accept** | mean ≥ 3.0 AND no dimension < 2 |
| **Weak Reject** | mean ≥ 2.0 AND (mean < 3.0 OR any dimension < 2) |
| **Reject** | mean < 2.0 OR any dimension = 1 |

**Findings:** Severity-ranked (critical → major → minor → suggestion), each with exact evidence span, reasoning, and actionable suggestion.

**Command:**
```
/rigor-reviewer path/to/artifact/
```

---

## Install Locations

| Agent | Skills Directory |
|-------|-----------------|
| **pi** | `~/.pi/agent/skills/{compiler,research-manager,rigor-reviewer}` |
| **Claude Code** | `~/.claude/skills/` |
| **Cursor** | `~/.cursor/skills/` |
| **Gemini CLI** | `~/.gemini/skills/` |
| **Codex** | `~/.codex/skills/` |

**Reinstall/update:**
```bash
npx @orchestra-research/ara-skills install --all
npx @orchestra-research/ara-skills update
npx @orchestra-research/ara-skills uninstall --skill rigor-reviewer
```

**For pi specifically** (since the installer doesn't detect pi):
```bash
cp -R /tmp/pi-github-repos/Orchestra-Research/Agent-Native-Research-Artifact/skills/{compiler,research-manager,rigor-reviewer} ~/.pi/agent/skills/
```
