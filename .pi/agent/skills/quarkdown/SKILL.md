---
disable-model-invocation: true
name: quarkdown
description: Compile .qd Markdown documents into HTML, PDF, slides, and docs sites using Quarkdown — a modern Markdown-based typesetting system. Use for academic papers, books, knowledge bases, presentations, and technical documentation.
---

# Quarkdown Skill

[Quarkdown](https://github.com/iamgio/quarkdown) is a modern Markdown-based typesetting system. It extends CommonMark/GFM Markdown with a Turing-complete scripting language (function calls, variables, loops, conditionals) and compiles to multiple output formats.

## Setup

Quarkdown is installed via Homebrew:

```bash
# Already installed at version 2.0.0
quarkdown --version
```

## Quick Reference

### Compile a .qd file to HTML

```bash
quarkdown compile input.qd
# Output: input.qd/<Document-Title>/index.html
```

### Watch mode (live recompile on changes)

```bash
quarkdown compile input.qd --watch
```

### Start a dev server with live preview

```bash
quarkdown serve input.qd
# Opens at http://localhost:8080
```

### Compile to a specific output format

```bash
quarkdown compile input.qd -o output-dir
quarkdown compile input.qd --format pdf      # PDF export
quarkdown compile input.qd --format slides   # reveal.js slides
quarkdown compile input.qd --format docs     # wiki/knowledge base site
```

## Document Types

Set the document type inside your `.qd` source with `.doctype`:

```markdown
.doctype {plain}    # Continuous flow (like Notion/Obsidian) — default
.doctype {paged}    # Print-ready books, articles, papers
.doctype {slides}   # Interactive presentations (reveal.js)
.doctype {docs}     # Wiki / knowledge base site
```

## Key Quarkdown Features

### Function calls (the heart of Quarkdown)

```
.image {path/to/image.png} {width:50%}
    My caption
```

### Variables and scripting

```
.let {name} {Quarkdown}

Hello, .name!
```

### Tables, math, diagrams

```markdown
| A | B |
|---|---|
| 1 | 2 |

.math {E = mc^2}

.mermaid
    graph TD
        A[Start] --> B[End]
```

### Bibliographies

```markdown
.bibliography {references.bib} {style:ieee}
```

## Creating a Project

```bash
quarkdown create my-project
cd my-project
quarkdown compile main.qd --watch
```

## PDF Export

PDF export requires Puppeteer. It was installed with Homebrew:

```bash
# Verify
quarkdown compile document.qd --format pdf
```

## Resources

- **Wiki**: https://quarkdown.com/wiki
- **Stdlib docs**: https://quarkdown.com/docs/quarkdown-stdlib
- **GitHub**: https://github.com/iamgio/quarkdown
