---
disable-model-invocation: true
name: fabric
description: "Fabric Skill for Pi. Use [Fabric](https://github. Keywords: fabric."
---

# Fabric Skill for Pi

Use [Fabric](https://github.com/danielmiessler/fabric) patterns to process content through structured AI-powered transformations.

## When to Use

- User says "fabric" followed by a pattern name or task
- User asks to extract insights/wisdom from content (videos, articles, transcripts)
- User asks to summarize, analyze, or repurpose content
- User mentions specific patterns like "extract_wisdom", "summarize", "create_social_posts"
- User wants to chain multiple AI text transformations together

## Setup Check

Before first use in a session, verify Fabric is operational:

```bash
echo "test" | fabric --pattern summarize 2>&1 | head -5
```

If this fails with an auth error, tell the user:
> "Fabric's AI provider needs configuration. Run `fabric --setup` or check ~/.config/fabric/.env"

## Core Commands

### Single pattern
```bash
# From stdin
echo "CONTENT" | fabric --pattern PATTERN_NAME

# From a file
cat file.md | fabric --pattern PATTERN_NAME

# From a URL (YouTube, article)
fabric --url URL --pattern PATTERN_NAME

# With explicit model
echo "CONTENT" | fabric --pattern PATTERN_NAME --model MODEL_NAME

# Dry run (see the prompt without calling AI)
echo "CONTENT" | fabric --pattern PATTERN_NAME --dry-run
```

### Chaining patterns
```bash
cat input.md \
  | fabric --pattern extract_wisdom \
  | fabric --pattern rate_content \
  | fabric --pattern create_social_posts
```

### Listing available patterns
```bash
fabric --list
```

## Key Patterns (categorized)

### Content Extraction & Analysis
| Pattern | What it does |
|---|---|
| `extract_wisdom` | Extract insights, quotes, habits, facts from any content |
| `summarize` | Concise summary of content |
| `create_5_sentence_summary` | Ultra-short summary |
| `rate_content` | Rate content quality (1-10) |
| `analyze_prose` | Analyze writing style and quality |
| `analyze_prose_pinker` | Analyze prose using Steven Pinker's principles |
| `analyze_paper` | Break down academic paper |
| `analyze_debate` | Analyze arguments in a debate |
| `analyze_incident` | Analyze a security incident |
| `analyze_mistakes` | Extract lessons from failures |
| `analyze_product_feedback` | Structure product/user feedback |
| `analyze_sales_call` | Analyze sales call effectiveness |
| `analyze_presentation` | Evaluate a presentation |
| `analyze_claims` | Fact-check and analyze claims |
| `check_falsifiability` | Check if claims are falsifiable |

### Content Creation & Repurposing
| Pattern | What it does |
|---|---|
| `create_social_posts` | Generate social media posts from content |
| `create_aphorisms` | Create memorable sayings from content |
| `create_art_prompt` | Generate AI art prompts from content |
| `create_5_sentence_summary` | Ultra-brief summary |
| `create_academic_paper` | Structure an academic paper |
| `create_higher_order_questions` | Generate deep questions about content |
| `create_investigation_visualization` | Create investigation mindmap JSON |
| `create_mermaid_visualization` | Create Mermaid diagram from content |
| `create_user_story` | Generate user stories from requirements |

### Writing & Editing
| Pattern | What it does |
|---|---|
| `improve_writing` | Improve any piece of writing |
| `improve_report_writing` | Improve formal reports |
| `clean_text` | Clean and normalize text |
| `convert_to_markdown` | Convert any text to clean markdown |
| `write_essay_in_voice` | Write an essay in a specific voice |
| `write_nucleus_paragraph` | Write a strong opening paragraph |
| `answer_interview_question` | Answer an interview question well |
| `explain_project` | Explain a project to non-technical audience |
| `explain_terms` | Explain jargon in plain language |

### Business & Strategy
| Pattern | What it does |
|---|---|
| `create_ai_jobs_analysis` | Analyze AI impact on jobs |
| `analyze_monetization_opportunities` | Find revenue opportunities |
| `create_better_frame` | Reframe a problem statement |
| `ask_uncle_duke` | Get pragmatic life/business advice |
| `compare_and_contrast` | Compare two things systematically |
| `create_micro_summary` | One-line summary |
| `analyze_candidates` | Analyze political candidates |
| `create_philosophical_aphorism` | Generate philosophical insights |

### Technical & Security
| Pattern | What it does |
|---|---|
| `explain_code` | Explain what code does |
| `create_coding_master` | Step-by-step coding instructions |
| `analyze_malware` | Analyze malware behavior |
| `analyze_threat_report` | Analyze a threat intelligence report |
| `analyze_terraform_plan` | Analyze Terraform infrastructure changes |
| `analyze_logs` | Extract patterns from logs |

### YouTube & Podcasts
Use `--url` with any YouTube URL:
```bash
fabric --url https://youtube.com/watch?v=xxx --pattern extract_wisdom
fabric --url https://youtube.com/watch?v=xxx --pattern summarize
```

## Tarnovski-Specific Workflows

### 1. Content Repurposing Pipeline
Turn any article/video into multi-platform content:
```bash
cat article.md \
  | fabric --pattern extract_wisdom > wisdom.md
cat wisdom.md | fabric --pattern create_social_posts > social.md
cat wisdom.md | fabric --pattern create_aphorisms > quotes.md
```

### 2. Competitor Analysis
```bash
fabric --url https://competitor-site.com --pattern analyze_prose > analysis.md
cat analysis.md your_positioning.md | fabric --pattern compare_and_contrast
```

### 3. Client Brief → Case Study
```bash
cat client_interview.md | fabric --pattern analyze_product_feedback > structured.md
cat structured.md | fabric --pattern create_5_sentence_summary > summary.md
```

### 4. SEO Content Audit
```bash
cat page_content.md | fabric --pattern rate_content > rating.md
cat page_content.md | fabric --pattern analyze_prose > prose.md
cat page_content.md | fabric --pattern improve_writing > improved.md
```

### 5. Weekly Intelligence Digest
```bash
for url in URL1 URL2 URL3; do
  fabric --url "$url" --pattern extract_wisdom >> weekly_raw.md
done
cat weekly_raw.md | fabric --pattern create_5_sentence_summary > digest.md
```

## Pattern Discovery

To find patterns for a task:
```bash
# List all patterns
fabric --list

# Search for patterns containing a keyword
fabric --list | grep -i "summar"
```

When the user's request doesn't match a known pattern, search the list and suggest the best match.

## Important Notes

- Fabric is a CLI tool — always invoke via `bash` tool
- Default model is configured in `~/.config/fabric/.env`
- The `--dry-run` flag shows the full prompt without calling AI (useful for debugging)
- YouTube support requires `yt-dlp` installed
- Patterns are Markdown files living in `~/.config/fabric/patterns/`
- Custom patterns can be added to `~/.config/fabric/custom_patterns/`
- All 256 patterns are documented — use `fabric --list` to discover them
