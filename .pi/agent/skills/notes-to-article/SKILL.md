---
name: notes-to-article
disable-model-invocation: true
description: Convert rough notes, transcripts, conference/event notes, interview notes, or DOCX documents with source notes and style-reference output into a publishable analytical article. Use when the user wants fragmented notes turned into a structured editorial column with critical interpretation, subtle industry/brand/future implications, and a sardonic, witty but credible voice rather than a simple summary or rewrite.
---

# Notes To Article

## Workflow

1. Extract the source material.
   - For DOCX files, use `scripts/extract_docx_tabs.py`.
   - Use `--section tab_1 --output <file.txt>` or `--section tab_1 --output-docx <file.docx>` when the user needs a clean source-only extraction.
   - If the file contains `Tab 1` and `Tab 2`, treat `Tab 1` as the raw input and `Tab 2` as a style/reference output.
   - If there is no reference output, infer the article shape from the user's request and the notes.

2. Read the references when relevant.
   - Read `references/house-style.md` before drafting in the sardonic analytical house voice.
   - Read `references/transformation-pattern.md` when converting rough notes into a polished article.

3. Build an article brief before writing.
   - Do this internally unless the user asks to see the brief.
   - Use this shape:

```markdown
## Article Brief
- Thesis:
- Audience/publication:
- Target length:
- Title:
- Standfirst/opening angle:
- Coverage map:
  - Substantive sections to use:
  - Sparse sections to mention lightly or omit:
  - Must-keep quotes/statistics:
  - Material to cut:
- Section spine:
- Must-keep facts, names, claims, statistics:
- Must-keep quotes:
- Author's personal angle:
- Critical implications:
- Closing idea:
```

4. Draft the article from the brief.
   - Open with a sharp observation that frames the tension in the notes.
   - Organize material around the thesis, not around every note in order.
   - Merge related sessions or ideas when they support the same argument.
   - Preserve named attribution and do not invent facts, quotes, speakers, events, statistics, or awards.
   - Use quotes sparingly and only when they carry authority, irony, or compression.
   - Add transitions that explain why each section matters.
   - Keep the default output as a publishable article only, not a memo about the article.
   - For long conference notes over 5,000 words, aim for roughly 1,500-1,850 words unless the user specifies otherwise. Go longer only when the source has unusually dense required material.

5. Add critical interpretation.
   - Do not merely reproduce, summarize, or elegantly retranslate the notes.
   - For each major section, ask what the material implies for the industry, the brand, marketing practice, creativity, AI, media, culture, or consumer behavior.
   - Surface tensions, contradictions, incentives, and uncomfortable consequences when the material supports them.
   - Weave implications into the prose; do not create a separate "Implications" section unless the user asks for one.

6. Apply source sufficiency.
   - If a section has only a title, description, or thin setup but no substantive notes, use it lightly, omit it, or explicitly avoid detailed takeaways.
   - Never invent takeaways just because a session title implies them.
   - When notes are sparse, write from the reliable implication of the available material rather than filling gaps with generic industry knowledge.

7. Self-edit before finalizing.
   - Check whether the article is only a stylish recap. If yes, add interpretation.
   - Check whether the article overstates beyond the notes. If yes, soften or remove the claim.
   - Check whether any joke is decorative. If yes, cut it.
   - Check whether the section order proves the thesis. If not, reorder or merge sections.
   - Check word count, unsupported claims, invented specificity, and whether every joke earns its place analytically.

8. Polish for publication.
   - Keep the voice analytical first, witty second.
   - Make the piece feel authored, not synthesized.
   - Remove generic thought-leadership language.
   - Keep jokes precise and useful; cut jokes that do not reveal an insight.
   - Keep factual density high enough that the article feels reported, not merely opinionated.

## Output Contract

Unless the user asks otherwise, return only the finished article:

- Title
- Optional standfirst if it improves publication readiness
- Byline if present in the source or requested
- Article body with clear section flow
- No process notes, caveats, brief, or bullet analysis before the article

If the source is ambiguous, make a conservative editorial choice and proceed. Ask a question only when missing information would materially change the article's facts, authorship, or publication stance.

## Quality Check

Before finalizing, verify:

- The article has one clear argument.
- Each major section does more than report what was said.
- Critical implications or tensions appear where the source supports them.
- Important names, quotes, statistics, and claims are preserved accurately.
- Similar notes are synthesized instead of repeated.
- Sparse source sections are not inflated into unsupported analysis.
- Default length discipline is respected unless the user requested otherwise.
- The ending lands on an insight rather than a recap.
- The voice is sardonic and witty without becoming flippant or cruel.
