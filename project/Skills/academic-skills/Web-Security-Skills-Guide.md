# Web & Security Skills — Quick Reference

> Location: `~/.pi/agent/skills/`

---

## 1. Firecrawl — Web Scraping Suite

**Author:** Firecrawl (https://firecrawl.dev)

Unified CLI for web data extraction: scrape, search, crawl, download, map, and AI-agent extraction. 6 sub-skills.

### Prerequisites
```bash
npx firecrawl@latest --help
firecrawl --status   # verify auth
```

### Commands Overview

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `firecrawl scrape <url>` | Extract clean markdown from a URL | Single page content |
| `firecrawl search <query>` | Web search with content extraction | Find articles/sources |
| `firecrawl crawl <url>` | Bulk extract from entire site | Documentation, full site |
| `firecrawl download <url>` | Download site as local files | Offline copy, bulk save |
| `firecrawl map <url>` | Discover/list all URLs on site | Find pages, site structure |
| `firecrawl agent <url>` | AI autonomous structured data extraction | JSON from complex sites |

### Workflow Escalation Pattern
```
search → scrape → map → crawl → agent
(simplest)                    (most powerful)
```

### Common Patterns

**Research workflow:**
```bash
firecrawl search "best practices for X" --limit 5
firecrawl scrape <url-from-results>
```

**Documentation extraction:**
```bash
firecrawl map https://example.com/docs --search "api"
firecrawl crawl https://example.com/docs --includePaths "/docs/*" --maxPages 100
```

**Structured data extraction:**
```bash
firecrawl agent "extract all pricing tiers" --wait -o pricing.json
firecrawl agent "extract products" --schema '{"type":"object","properties":{"name":{"type":"string"},"price":{"type":"number"}}}' --wait
```

**Offline archive:**
```bash
firecrawl download https://example.com/docs ./archive --includePaths "/docs/*" --maxPages 50
```

### Sub-Skills
- `firecrawl` — Main entry point + unified reference
- `firecrawl-scrape` — Single/multi-page scraping
- `firecrawl-search` — Web search with scraping
- `firecrawl-crawl` — Bulk site crawling
- `firecrawl-download` — Download to local files
- `firecrawl-map` — URL discovery
- `firecrawl-agent` — AI-powered structured extraction
- `firecrawl-browser` — Interactive browser session (scrape + click/fill forms)

---

## 2. Audit Website (SquirrelScan)

**Author:** SquirrelScan (https://squirrelscan.com, v1.22)

Comprehensive website auditing with 230+ rules across 21 categories. Uses the `squirrel` CLI tool.

### When to Use
- Analyze website health
- Debug SEO issues
- Check for broken links
- Validate meta tags and structured data
- Security, performance, accessibility audits
- Before/after comparisons

### Prerequisites
```bash
# Install: https://squirrelscan.com/download
squirrel --version
squirrel init -n my-project
```

### 21 Audit Categories
SEO, Technical, Performance, Content, Security, Accessibility, Usability, Links, E-E-A-T, UX, Mobile, Crawlability, Schema, Legal, Social, URL Structure, Keywords, Images, Local SEO, Video, and more.

### Core Workflow

```bash
# Full audit (crawl + analyze + report)
squirrel audit https://example.com --format llm

# Step-by-step
squirrel crawl https://example.com          # 1. Crawl
squirrel analyze                             # 2. Analyze
squirrel report <audit-id> --format llm     # 3. Report

# Regression diff
squirrel report --diff <audit-id> --format llm
squirrel report --regression-since example.com --format llm
```

### Scan Strategy
1. **First scan:** Surface scan (quick, shallow) — structure, content, tech stack
2. **Second scan:** Deep scan (thorough) — security, performance, accessibility
3. **Prefer live websites** for true representation

### Fix Workflow
1. Present report + health score (0-100)
2. Propose fixes → user confirms
3. Parallelize approved fixes (use subagents)
4. Re-audit → iterate until score ≥ 85 or only human-judgment items remain
5. Show before/after comparison

### Quick Commands
```
Audit this website: https://example.com
Check for broken links on: [url]
Run an SEO audit on: [url]
```

---

## 3. Design Review

**Author:** Community (claude-code-only skill)

Visual design quality review for web apps/pages. Checks layout, typography, spacing, colour, hierarchy, consistency, interaction patterns, and responsive behaviour.

**Not a UX audit** (usability/workflow) — this checks whether it looks professional and polished.

### When to Use
- Before showing to a client or team
- When something "looks off" but can't pinpoint why
- After building a feature, before calling it done
- After a UX audit (visual companion)

### 7 Review Areas

| Area | Key Checks |
|------|-----------|
| **Layout & Spacing** | Consistent gaps, alignment, breathing room, grid discipline |
| **Typography** | Hierarchy, line length (50-75 chars), line height, font scale |
| **Colour & Contrast** | Design tokens vs raw values, WCAG AA (4.5:1), dark mode |
| **Visual Hierarchy** | One clear CTA, squint test, progressive disclosure, grouping |
| **Component Consistency** | Button/card/input styles, icon families, border radius, shadows |
| **Interaction Design** | Hover/focus/active states, transitions (150-200ms), loading states |
| **Responsive Quality** | Mobile nav, image scaling, tables, touch targets (44x44px) |

### Severity Levels
- **High** — Looks broken or unprofessional
- **Medium** — Looks unpolished (inconsistent spacing, mixed styles)
- **Low** — Nitpick (1-2px alignment, shadow too strong)

### Output
Writes to `.jez/artifacts/design-review.md` with:
- Overall impression
- Findings (High / Medium / Low)
- What looks good (preserve)
- Top 3 fixes by visual impact

### Quick Commands
```
Review the design of this page: [url]
Does this look good? [url]
Check the layout of: [url]
Make this look better: [url]
```

---

## 4. Strix — AI Security Testing

**Author:** Custom (uses z.ai/GLM-5.1 with OrbStack runtime)

AI-powered penetration testing and vulnerability scanning for local code, repositories, and deployed applications.

### When to Trigger
- "Scan for security vulnerabilities" or "find security issues"
- "Penetration testing", "pentest", "security audit"
- Testing auth, authorization, input validation
- XSS, SQL injection, IDOR, SSRF, etc.
- Local directories, GitHub repos, or deployed apps

### Configuration
- **Provider:** z.ai (direct)
- **Model:** `zai/glm-5.1`
- **API Key:** Keychain (`pi-api-keys` / `zai`)
- **Runtime:** OrbStack (Docker-compatible)

### Scan Commands

```bash
# Basic scans
~/.strix/zai-run.sh --target ./path/to/app          # Local directory
~/.strix/zai-run.sh --target https://github.com/...  # GitHub repo
~/.strix/zai-run.sh --target https://app.com         # Deployed app

# With instructions
~/.strix/zai-run.sh --target ./api --instruction "Focus on auth bypass and IDOR"

# Scan modes
~/.strix/zai-run.sh --target ./app -m quick     # Fast, less thorough
~/.strix/zai-run.sh --target ./app -m standard  # Balanced (default)
~/.strix/zai-run.sh --target ./app -m deep      # Slow, thorough

# Headless (for automation)
~/.strix/zai-run.sh -n --target ./app

# Pi-friendly wrapper (recommended)
~/.strix/pi-run.sh --target ./app
```

### What Strix Finds
- **Access Control:** IDOR, privilege escalation, auth bypass
- **Injection:** SQL, NoSQL, command injection, template injection
- **Server-Side:** SSRF, XXE, deserialization
- **Client-Side:** XSS (reflected, stored, DOM), prototype pollution
- **Business Logic:** Race conditions, workflow manipulation
- **Auth:** JWT issues, session management flaws
- **Infrastructure:** Misconfigurations, exposed services

### Output
Results saved to `strix_runs/<run-name>/`:
- Findings with PoCs
- Evidence (screenshots, logs, repro steps)
- Structured markdown report

### Quick Commands
```
Scan this app for security issues: ./my-app
Pentest this deployed site: https://app.example.com
Check for XSS and SQL injection in: ./api
```

---

## Skills Comparison

| Feature | Firecrawl | Audit Website | Design Review | Strix |
|---------|:---:|:---:|:---:|:---:|
| Content extraction | ✅ | — | — | — |
| SEO audit | — | ✅ | — | — |
| Visual review | — | — | ✅ | — |
| Security testing | — | — | — | ✅ |
| Requires CLI tool | ✅ (npx) | ✅ (squirrel) | Browser tool | ✅ (OrbStack) |
| Live site scanning | ✅ | ✅ | ✅ | ✅ |
| Local code scanning | — | — | — | ✅ |
| Automated fixes | — | ✅ (proposed) | — | — |
