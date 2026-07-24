# Style Guide — Tarnovski Brand Skin

**The single source of truth for colors, typography, and tokens.** Every diagram draws from this — not from hex values inlined in other reference files.

Custom skin for **tarnovski.com** — dark teal + gold editorial palette derived from the Tarnovski brand identity. Dark mode is the primary/default skin (matching the website). Light mode is provided as a secondary variant.

---

## Tokens

### Semantic roles

Every token is referred to by **semantic role**, not by its hex value. Type references (`type-*.md`) and SKILL.md say `accent`, not `#f0d074`.

| Role | Purpose | Tarnovski (dark, primary) | Light variant |
|---|---|---|---|
| `paper` | Page background, default node fill | `#1a2b2b` (deep-teal) | `#f9e3bb` (cream) |
| `paper-2` | Diagram container bg, secondary fill | `#243838` (lighter teal) | `#f0d9b0` |
| `ink` | Primary text, primary stroke | `#f9e3bb` (cream) | `#1a2b2b` (deep-teal) |
| `muted` | Secondary text, default arrow stroke | `#bac5cb` (silver-sage) | `#5a6e6e` |
| `soft` | Sublabels, boundary labels | `#8a9ea0` | `#6a8080` |
| `rule` | Hairline borders | `rgba(249,227,187,0.12)` | `rgba(26,43,43,0.12)` |
| `rule-solid` | Stronger borders, baselines | `rgba(186,197,203,0.25)` | `#bac5cb` |
| `accent` | Focal / 1–2 max per diagram | `#f0d074` (gold) | `#d4a830` |
| `accent-tint` | Fill for accent-bordered boxes | `rgba(240,208,116,0.10)` | `rgba(212,168,48,0.08)` |
| `link` | HTTP/API calls, external arrows | `#c87fa2` (rose) | `#9e5a7e` |

> **Brand palette source:** Tarnovski brand — `deep-teal #1a2b2b`, `silver-sage #bac5cb`, `cream #f9e3bb`, `gold #f0d074`, `rose #c87fa2`. The `soft`, `rule`, and `link` tokens are derived to cover semantic roles not directly named in the brand palette.

### Inversion rule (dark → light)

Any `rgba(249,227,187, X)` in dark becomes `rgba(26,43,43, X)` in light. Same opacities, RGB flipped. The gold accent deepens slightly for light-mode readability.

---

## Typography

| Role | Family | Size | Weight | Usage |
|---|---|---|---|---|
| `title` | TLB Pro | 1.75rem | 400 | Page H1 |
| `node-name` | TLB Pro | 12px | 600 | Human-readable labels |
| `sublabel` | TLB Pro | 9px | 400 | Port, protocol, URL, field type |
| `eyebrow` | TLB Pro | 7–8px | 500, tracked 0.18em, uppercase | Type tags, axis labels |
| `arrow-label` | TLB Pro | 8px | 400, tracked 0.06em | Arrow annotations |
| `callout` | TLB Pro *italic* | 14px | 400 | Editorial asides only |

### Font stack

Since TLB Pro is self-hosted on tarnovski.com, diagrams reference it via a CSS import or fallback stack:

```css
font-family: 'TLB Pro', 'Georgia', 'Times New Roman', serif;
```

For standalone HTML diagrams that don't load from tarnovski.com, use this Google Fonts fallback that approximates the editorial serif feel:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Context | title | node-name | sublabel/eyebrow |
|---|---|---|---|
| **On tarnovski.com** | TLB Pro | TLB Pro | TLB Pro |
| **Standalone HTML** | Playfair Display | DM Sans | DM Mono |

---

## Stroke, radius, spacing

| Token | Value | Use |
|---|---|---|
| `stroke-thin` | `0.8` | Tag-box outlines, leaf nodes |
| `stroke-default` | `1` | Most strokes |
| `stroke-strong` | `1.2` | Emphasis strokes |
| `radius-sm` | `4` | Small tags |
| `radius-md` | `6` | Node boxes |
| `radius-lg` | `8` | Containers, rings |
| `grid` | `4` | Every coord, size, and gap is divisible by 4 (hard rule) |

---

## Node type → treatment

Semantic role combinations — reference these by name in type specs.

| Type | Fill | Stroke |
|---|---|---|
| `focal` (1–2 max) | `accent-tint` | `accent` (gold) |
| `backend` | `#ffffff` (white) | `ink` |
| `store` | `ink @ 0.05` | `muted` |
| `external` | `ink @ 0.03` | `ink @ 0.30` |
| `input` | `muted @ 0.10` | `soft` |
| `optional` | `ink @ 0.02` | `ink @ 0.20` dashed `4,3` |
| `security` | `accent @ 0.05` | `accent @ 0.50` dashed `4,4` |

---

## Customizing the skin

Three options:

1. **Run onboarding** — see [`onboarding.md`](onboarding.md). Drop a URL; the skill extracts the palette + fonts and rewrites this file.
2. **Edit by hand** — change the hex values in the tables above. Run the pre-output taste gate afterward to verify the accent still reads as "focal" against the new paper color.
3. **Brand handoff** — paste your existing design-token JSON into a new section here and map its tokens to the semantic roles above.

### Constraints (don't break these)

- **Contrast**: `ink` must hit WCAG AA on `paper`. `muted` must hit AA on `paper` for 11px+ text.
- **One accent**: gold `#f0d074` is the only accent. Rose `#c87fa2` is reserved for `link` only. Two accents erases the focal signal.
- **No rainbow palette**: the brand palette is teal + cream + gold + rose. Stick to these four.
- **Serif dominance**: TLB Pro (or Playfair Display fallback) for all type. This brand is serif-first, not sans-first.
- **Paper is deep teal, not pure black**: `#1a2b2b` has warmth and richness. Never use `#000` or `#111`.
- **Dot pattern is optional, not default**: the 22×22 dot pattern is an opt-in "dotted paper" variant. Default background is a clean `paper` fill.
- **Container is clean by default**: the diagram sits directly on the page paper, no secondary container background or border. A framed variant is available as an opt-in for card-heavy layouts.
