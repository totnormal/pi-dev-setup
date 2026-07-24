# Zero-Build Slides

A presentation engine designed for AI agents. Four plain JS files, no npm, no build step — serve from any static hosting and go.

## Install as Claude Code Skill

```bash
bunx @decocms/zero-build-slides
```

This installs the skill so Claude Code (and 40+ other agents) knows how to create and edit slide decks for you. Then just ask your agent to create a presentation.

## Quick Start

```bash
bunx serve
open http://localhost:3000
```

## Architecture

| File | Role |
|------|------|
| `index.html` | Bootstrap: import maps, fonts, Tailwind CDN, base CSS |
| `app.js` | Router, viewport scaling (1920x1080), keyboard nav, theme context |
| `layouts.js` | Every slide template as a Preact component |
| `data.js` | Presentations as plain JS objects + color maps |
| `themes.js` | 6 built-in color themes |
| `context.js` | Preact context for theme propagation |

## How It Works

- **Preact + htm** via ESM import maps from esm.sh CDN — JSX-like syntax that runs natively in the browser
- **Tailwind CDN** with inline config for design tokens
- **Hash-based routing**: `#/deck-slug?slide=N&theme=name`
- **Viewport scaling**: 1920x1080 base scaled to fit any screen at 16:9

## Working with AI Agents

An LLM can create or edit presentations by modifying `data.js`:

1. Read the data file and understand the slide schema
2. Add/edit slides as JS objects — pick a layout, set colors, write content
3. Upload to any static host — no build step needed

See `SKILL.md` for the full agent reference (slide schema, available layouts, color palette, theme system).

## Themes

Add `?theme=name` to any URL to switch the color palette instantly.

| Theme | Accent | Vibe |
|-------|--------|------|
| `deco` | Green `#D0EC1A` | Default brand |
| `ocean` | Blue `#38BDF8` | Corporate |
| `ember` | Orange `#F97316` | Warm startup |
| `midnight` | Purple `#C084FC` | Creative |
| `forest` | Green `#4ADE80` | Organic |
| `mono` | White `#FFFFFF` | Minimal B&W |

Example: `#/demo?theme=ocean&slide=3`

## Available Layouts

- `title` — Cover and section headers (centered or TOC variant)
- `dinner-thesis` — Bold claim with proof-point bullets
- `dinner-features` — Icon cards with hover interactions (1-4 columns)
- `dinner-demo` — 40/60 split with stacked cards
- `dinner-admin-cases` — Two-column: blog grid + quote cards
- `market-signals-funnel` — 4-stage chevron pipeline
- `dinner-roadmap` — 3-column strategic directions
- `dinner-cta` — Call-to-action with icon cards
- `timeline` — Alternating above/below timeline
- `retrospective-intro` — Numbered section index
- `retrospective-stats` — Animated counter stats

## URL Structure

```
https://your-host/#/deck-slug?slide=5&theme=ocean
```

- `deck-slug` — presentation key from DECKS map in app.js
- `slide` — slide number (0 = cover)
- `theme` — color theme name

## License

MIT
