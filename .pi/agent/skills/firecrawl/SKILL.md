---
disable-model-invocation: true
name: firecrawl
description: "Firecrawl Web Scraping, Search, Crawl & Extract. Unified Firecrawl CLI reference for web data extraction. Keywords: web scraping, crawling, data extraction, web automation, firecrawl."
---

# Firecrawl — Web Scraping, Search, Crawl & Extract

## Extended Details

Unified Firecrawl CLI reference for web data extraction.

## Prerequisites

Must be installed and authenticated. Check with `firecrawl --status`.

```
npx firecrawl@latest --help
```

## Quick Reference

| Command | What it does | Use when |
|---------|-------------|----------|
| `firecrawl scrape <url>` | Extract clean markdown from a URL | Single page content extraction |
| `firecrawl search <query>` | Web search with content extraction | Find articles/sources on a topic |
| `firecrawl crawl <url>` | Bulk extract from entire site/section | Documentation, full site content |
| `firecrawl download <url>` | Download site as local files (MD, screenshots) | Offline copy, bulk save |
| `firecrawl map <url>` | Discover and list all URLs on a site | Find specific pages, site structure |
| `firecrawl agent <url>` | AI-powered autonomous structured data extraction | Get JSON from complex sites |

---

# Section 1: Scrape (`firecrawl scrape`)

Extract clean markdown from any URL, including JavaScript-rendered SPAs.

```bash
firecrawl scrape <url> [options]
```

### Common options
- `--formats markdown` (default), `html`, `screenshot`
- `--waitFor <ms>` — Wait for JS to render
- `--onlyMainContent` — Skip nav/footer/sidebars
- `--includeTags` / `--excludeTags` — Target specific elements
- `--maxAge` — Cache freshness (in ms)

### Returns
Clean markdown optimized for LLM context windows.

---

# Section 2: Search (`firecrawl search`)

Web search with full page content extraction.

```bash
firecrawl search <query> [options]
```

### Common options
- `--limit <n>` — Number of results (default: 5)
- `--scrapeOptions` — Pass scrape options to each result

### Use cases
- Find recent articles on a topic with full content
- Competitor research with extracted content
- Source discovery with full-page extraction (not just snippets)

---

# Section 3: Crawl (`firecrawl crawl`)

Bulk extract content from an entire website or site section.

```bash
firecrawl crawl <url> [options]
```

### Common options
- `--maxDepth <n>` — How deep to follow links
- `--maxPages <n>` — Maximum pages to crawl
- `--limit <n>` — Same as maxPages
- `--allowExternalLinks` / `--denyExternalLinks`
- `--includePaths / --excludePaths` — Path filtering (e.g., `/docs/*`)
- `--webhookUrl` — Get notified when crawl completes

### Use cases
- Extract all documentation under `/docs`
- Bulk scrape a competitor's entire site
- Download a knowledge base for offline reference

---

# Section 4: Download (`firecrawl download`)

Download an entire website as local files — markdown, screenshots, or multiple formats.

```bash
firecrawl download <url> <output-dir> [options]
```

### Common options
- `--formats` — Specify output formats (markdown, html, screenshot)
- `--maxDepth`, `--maxPages` — Same as crawl
- Combine with `--includePaths` for targeted sections

### Use cases
- Save docs for offline reference
- Archive a site for later analysis
- Bulk download with screenshots for visual review

---

# Section 5: Map (`firecrawl map`)

Discover and list all URLs on a website, with optional search filtering.

```bash
firecrawl map <url> [options]
```

### Common options
- `--search` — Filter URLs by keyword
- `--ignoreSitemap` — Skip sitemap.xml, crawl pages instead
- `--includeSubdomains` — Include subdomain URLs

### Use cases
- Find a specific page on a large site when you don't know the URL
- List all pages before starting a crawl
- Check site structure for missing pages

---

# Section 6: Agent (`firecrawl agent`)

AI-powered autonomous data extraction that navigates complex sites and returns structured JSON.

```bash
firecrawl agent <url> --jsonSchema '<json-schema>'
```

### Use cases
- Extract pricing tiers from multiple pages
- Pull product listings with structured data
- Scrape directory entries with complex filtering
- Any multi-page structured extraction

### JSON Schema Example
```json
{
  "type": "object",
  "properties": {
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "price": { "type": "number" },
          "features": { "type": "array", "items": { "type": "string" } }
        }
      }
    }
  }
}
```

---

# Common Patterns

### Search + Scrape (Research Workflow)
```bash
# 1. Search for sources
firecrawl search "best practices for X" --limit 5

# 2. Scrape the most relevant result
firecrawl scrape <url-from-results>
```

### Map + Crawl (Documentation Extraction)
```bash
# 1. Find all docs pages
firecrawl map https://example.com/docs --search "api"

# 2. Crawl the docs section
firecrawl crawl https://example.com/docs --includePaths "/docs/*" --maxPages 100
```

### Crawl + Download (Offline Archive)
```bash
firecrawl download https://example.com/docs ./docs-archive \
  --includePaths "/docs/*" --maxPages 50
```
