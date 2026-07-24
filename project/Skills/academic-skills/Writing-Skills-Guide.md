# Writing & Humanization Skills — Quick Reference

> Location: `~/.pi/agent/skills/`

---

## 1. Humanize Writing

**Author:** Community (based on Wikipedia's "Signs of AI writing" by WikiProject AI Cleanup)

General-purpose text humanizer. Removes AI-generated patterns and makes writing sound natural and human.

### When to Use
- Humanize or de-AI text
- Make AI-generated content sound less robotic
- Before publishing AI-assisted writing

### Process
1. **Read pattern catalog** — 29 AI patterns across 6 categories (content, language, grammar, style, communication, filler) in `references/patterns.md`
2. **Identify AI patterns** — Scan for all patterns
3. **Voice sample** (optional) — Analyze user's writing for style matching
4. **Rewrite** — Replace AI-isms with natural alternatives
5. **Final anti-AI pass** — "What makes this obviously AI?" → revise

### Voice Matching
Provide a sample inline or as a file path:
```
Humanize this text. Here's my writing style: [sample]
Humanize this. Use my voice from [file path]
```

### Quick Commands
```
Humanize this text: [paste text]
Make this sound less robotic: [text]
De-AI this paragraph: [text]
```

---

## 2. Humanize Academic (G6)

**Author:** Diverga (Agent ID: G6, v10.3.0)

Academic-specific humanizer. Transforms AI-generated scholarly writing into natural, authentic academic prose. More rigorous than the general humanizer — preserves citations, statistics, and methodology.

### When to Use
- Preparing journal submissions
- De-AI-ing scholarly manuscripts
- Improving AI-assisted academic writing quality

### Three Modes

| Mode | Changes | Best For |
|------|---------|----------|
| **Conservative** | ~10-20% of flagged items | Journal submissions, formal docs |
| **Balanced** (default) | ~40-60% | Most academic writing |
| **Aggressive** | ~80-100% | Blog posts, informal writing |

### NEVER Transforms
- Citations and references
- Statistical values (p < .05, d = 0.8)
- Sample sizes (N = 150)
- Methodology specifics
- Direct quotes
- Technical terms and acronyms

### Pattern Categories Transformed
- **Content (C1-C6):** Significance inflation, notability claims, promotional language, vague attributions
- **Language (L1-L6):** AI vocabulary substitution (tiered maps), hedge stacking, copula avoidance
- **Grammar (G1-G4):** Formulaic structures, over-parallelism
- **Style (S1-S4):** Uniform rhythm, lack of hedging variety

### Input
```yaml
Required: text, analysis (pattern report)
Optional:
  mode: conservative/balanced/aggressive
  preserve_list: ["terms to keep"]
  section_type: abstract/methods/discussion
  target_journal: "Journal style"
  sections: ["abstract", "discussion"]  # section-selective
```

### Quick Commands
```
Humanize this academic text: [paste]
Make this paper section sound more natural: [text]
De-AI my abstract in conservative mode: [text]
```

---

## 3. Marketing Strategist (MiniMBA KB)

**Author:** Custom skill (bundled MiniMBA strategy knowledge base)

Strategy and positioning decisions grounded in a bundled MiniMBA knowledge base. Diagnoses before prescribing, separates facts vs inferences vs hypotheses.

### When to Use
- Developing marketing strategy and positioning
- Segment/target/position analysis
- Competitive positioning decisions
- Go-to-market planning

### KB Sources
- **Lectures** (preferred): `kb/Lectures/*.txt`
- **Readings/books**: `.txt` across `kb/`
- **Perceptual map templates**: `kb_assets/*.xlsx`

### Output Contract
Produces a **Strategy & Positioning Memo** with:
- `## Honest assessment` — 3–7 bullets (flaw + consequence)
- `## Positioning analysis` — framework-by-framework; facts vs inferences vs hypotheses
- `## Action plan` — 0–30 days / 1–3 months / 3–12 months (includes "stop/avoid")
- `## Grounding (KB excerpts)` — 5–12 `file:line:snippet` items

### KB Search
```bash
python3 scripts/kb_search.py "STP"
python3 scripts/kb_search.py "market category"
python3 scripts/kb_search.py "competitive alternatives"
```

### Quick Commands
```
Help me develop a positioning strategy for [product]
Analyze my competitive positioning: [context]
Create a go-to-market strategy for [product]
```

---

## Key Differences: Writing Skills Comparison

| Feature | humanize-writing | humanize-academic-g6 | marketing-strategist |
|---------|:---:|:---:|:---:|
| General text | ✅ | — | — |
| Academic text | — | ✅ | — |
| Marketing/strategy | — | — | ✅ |
| Voice matching | ✅ (sample) | ✅ (style profile) | — |
| Mode selection | — | ✅ (3 modes) | — |
| Knowledge base | — | — | ✅ (MiniMBA) |
| Pattern catalog | 29 patterns | Extended academic | — |
| Preserves citations | ✅ | ✅ (NEVER transforms) | — |
| Preserves stats | — | ✅ (NEVER transforms) | — |
