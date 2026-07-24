---
disable-model-invocation: true
name: zero-build-slides
description: "Zero Build Slides. A presentation engine designed for AI agents to create, edit, and deploy slide decks with zero development environment. Keywords: zero build slides."
---

# Zero-Build Slides

## Extended Details

A presentation engine designed for AI agents to create, edit, and deploy slide decks with zero development environment. Four plain JS files served from any static host — no npm, no build step, no node_modules.

## When to Use This Skill

- User wants to create a new presentation or slide deck
- User wants to add, edit, or reorder slides in an existing deck
- User wants to change the theme/colors of a presentation
- User wants to understand available slide templates
- User asks about the presentation system architecture

## Architecture

```
zero-build-slides/
  index.html    — Bootstrap: import maps, fonts, Tailwind CDN, base CSS
  app.js        — Router, viewport scaling (1920×1080), keyboard nav, theme context
  layouts.js    — All slide template components (Preact + htm)
  data.js       — All presentations as plain JS objects + color maps
  themes.js     — Theme definitions (6 built-in themes)
  SKILL.md      — This file
```

## Creating a New Presentation

### Step 1: Define the deck in data.js

Add a new export to `data.js` following this schema:

```js
export const myDeck = {
  title: 'Deck Title',           // Cover slide title
  subtitle: 'Subtitle text',     // Cover slide subtitle
  logo: 'https://...',           // Optional logo URL (top-left of cover)
  theme: 'deco',                 // Theme name (deco, ocean, ember, midnight, forest, mono)
  slides: [
    // First slide defines the cover appearance
    {
      title: 'Welcome',
      subtitle: 'Opening line',
      layout: 'title',
      backgroundColor: 'primary-light',  // Color token (see palette below)
      textColor: 'dark',                 // 'dark' or 'light'
      tag: 'EVENT NAME | DATE',          // Optional eyebrow text
    },
    // ... more slides
  ],
};
```

### Step 2: Register the deck in app.js

Add it to the DECKS map and the landing page:

```js
import { myDeck } from './data.js';

const DECKS = {
  'my-deck': myDeck,
  // ... existing decks
};
```

Also add a card to the landing page array in the Router component.

### Step 3: Access it

Navigate to: `#/my-deck` or `#/my-deck?slide=3&theme=ocean`

## Slide Schema

Every slide is a plain JS object:

```js
{
  title: 'Slide title',                    // Required
  subtitle: 'Optional subtitle',           // Optional
  layout: 'dinner-features',               // Required — template name
  backgroundColor: 'dc-950',               // Color token
  textColor: 'light',                      // 'dark' or 'light'
  tag: 'SECTION TAG',                      // Optional eyebrow
  slideNumber: '02',                       // Optional — used by title slides for TOC
  backgroundImage: 'https://...mp4',       // Optional — video/image for demo slides
  items: [                                 // Optional — content items
    {
      title: 'Item title',
      subtitle: 'TAG TEXT',               // Shown as [TAG TEXT] in brackets
      value: 'material_icon_name',        // Material Symbols Sharp icon
      label: 'https://...mp4',            // Media URL (video/image)
      bullets: [
        { text: 'Bullet with ||italic highlight|| markers', highlight: false },
      ],
    },
  ],
}
```

### Text Formatting

- Use `||text||` to wrap text in Instrument Serif italic — e.g., `'This is ||beautifully|| styled'`
- Set `highlight: true` on bullets for accent-colored text
- Use `\n` in title/slideNumber for multi-line text

## Available Layouts

| Layout | Purpose | Items? |
|--------|---------|--------|
| `title` | Section dividers, intro/outro. Centered if no slideNumber, TOC-style if slideNumber set | No |
| `dinner-thesis` | Bold statement + proof bullets with left border | 1 item with bullets |
| `dinner-features` | 1-3 card grid with optional video (1:1), icons, [TAGS], ✳︎ bullets | 1-3 items |
| `dinner-demo` | 40/60 split — pain/solution cards left, video right. Fullscreen toggle | 2 items (pain + solution) |
| `dinner-admin-cases` | Two-column: blog post 2×2 grid left, quote cards right | Mix of blog + quote items |
| `market-signals-funnel` | 4-stage chevron funnel + per-stage article cards with accent borders | 4 stages + article items |
| `dinner-roadmap` | 3-column strategic direction cards with icons | 3 items |
| `dinner-cta` | Call-to-action with multi-line title + compact action cards | 2-3 items |
| `timeline` | Horizontal Q1-Q4 timeline with alternating above/below | 4 items |
| `retrospective-intro` | Numbered section index (hardcoded 5 sections) | No |
| `retrospective-stats` | 3×2 grid with animated CountUp counters | No |

### Layout Details

**dinner-features items:**
- With `label` (URL): Shows video/image in 1:1 aspect ratio, grayscale → color on hover, gradient overlay
- Without `label`: Shows large Material Symbol icon
- `subtitle` field shown as `[SUBTITLE]` in monospace brackets
- `value` field = Material Symbols icon name
- `bullets[].text` supports `||italic||` markers, shown with ✳︎ prefix

**dinner-demo items:**
- First item (index 0): "pain" card with skull icon, muted colors
- Second item (index 1): "solution" card with smart_toy icon, accent colors
- `backgroundImage` on the slide = video/image for the right panel

**dinner-admin-cases items:**
- Items with `subtitle: 'blog'` go to left column (2×2 grid)
- Items without `subtitle: 'blog'` go to right column (quote cards)
- `slideNumber` field split by `|` → left title | right title
- Blog items: `label` = image URL, `value` = link URL
- Quote items: `bullets[0].text` with `||italic||` highlights

**market-signals-funnel items:**
- Items with title matching stage names (Aquisição/Conversão/Operação/Suporte) → funnel stages
- Other items → article cards, grouped by `subtitle` matching stage name
- Stage colors: green → purple → yellow → green
- Article `label` = Material Symbol icon name, `value` = external URL

## Color Palette (Background Tokens)

| Token | Hex | Use |
|-------|-----|-----|
| `primary-light` | `#D0EC1A` | Green accent — cover, section headers |
| `primary-dark` | `#07401A` | Dark green — CTA slides |
| `purple-light` | `#A595FF` | Purple accent — learning sections |
| `purple-dark` | `#151042` | Dark purple |
| `yellow-light` | `#FFC116` | Yellow accent — direction sections |
| `yellow-dark` | `#392B02` | Dark yellow |
| `dc-950` | `#121110` | Default dark background |
| `dc-900` | `#1C1917` | Slightly lighter dark |
| `dc-50` | `#FAFAF9` | Light background |

## Themes

Switch themes with `?theme=name` query parameter. Available themes:

| Theme | Accent | Vibe |
|-------|--------|------|
| `deco` | `#D0EC1A` (green) | Default brand — lime green, purple, yellow |
| `ocean` | `#38BDF8` (sky blue) | Corporate — blue, indigo, teal |
| `ember` | `#F97316` (orange) | Startup — orange, red, amber |
| `midnight` | `#C084FC` (purple) | Creative — purple, pink, cyan |
| `forest` | `#4ADE80` (green) | Organic — green, lime, gold |
| `mono` | `#FFFFFF` (white) | Minimal — pure black and white |

### Creating a Custom Theme

Add to `themes.js`:

```js
myTheme: {
  name: 'myTheme',
  accent: '#FF6B6B',        // Primary accent
  accent2: '#4ECDC4',       // Secondary accent
  accent3: '#FFE66D',       // Tertiary accent
  textDark: '#1A1A2E',      // Text on light backgrounds
  textLight: '#EAEAEA',     // Text on dark backgrounds
  surface: '#16213E',       // Dark slide background
  surfaceLight: '#F8F8F8',  // Light slide background
  heading: '#E2E2E2',       // Heading text color
  body: '#A0A0A0',          // Body text color
  muted: '#666666',         // Muted/tag text color
  border: '#2A2A4A',        // Card border color
  bg: {                     // Background token overrides
    'primary-light': '#FF6B6B',
    'primary-dark': '#4A1942',
    'dc-950': '#16213E',
    // ... other tokens
  },
},
```

## URL Structure

```
#/deck-slug                    → Deck at slide 0
#/deck-slug?slide=5            → Deck at slide 5
#/deck-slug?slide=3&theme=ocean → Deck at slide 3 with ocean theme
```

## Key Implementation Details

- **Viewport**: 1920×1080 base, scaled to fit browser window maintaining aspect ratio
- **Navigation**: Arrow keys (left/right), spacebar (next), minimap panel
- **Animations**: `.animate-item` class → staggered fade-in on slide change (60ms per item)
- **Fonts**: Inter (sans), Instrument Serif (italic highlights), Material Symbols Sharp (icons)
- **Zero-build**: Uses ES module import maps, Preact + htm from esm.sh CDN, Tailwind CDN

## Common Agent Tasks

### Add a slide to an existing deck
1. Open `data.js`
2. Find the deck's `slides` array
3. Insert a new slide object at the desired position
4. Choose a layout and populate the fields

### Change the cover color
1. Find the first slide in the deck's `slides` array
2. Change `backgroundColor` to a different token (e.g., `'purple-light'`)
3. Set `textColor` to `'dark'` or `'light'` for contrast

### Add a new layout template
1. Open `layouts.js`
2. Create a new Preact component function
3. Register it in the `LAYOUTS` export object
4. Use `useThemeColors()` hook for theme-aware colors

### Reorder slides
Slides render in array order. Just move objects within the `slides` array.
