# Requirements — shortcut-vault design system

Traceable REQs for the design token and component layer.
Every REQ cites its identity.md source section.

---

## Tokens

### REQ-tokens-palette-light
Light mode OKLCH palette per identity.md §Palette §Light mode.
- `--background: oklch(0.93 0.014 85)` — warm off-white
- `--foreground: oklch(0.08 0.003 90)` — near-black
- `--primary: oklch(0.60 0.245 30)` — vivid orange-red
- `--muted-foreground: oklch(0.40 0.005 80)` — medium gray
- All alpha tokens use the foreground OKLCH base at /0.10 (border) and /0.38 (hover)

### REQ-tokens-palette-dark
Dark mode OKLCH palette per identity.md §Palette §Dark mode (primary).
- `--background: oklch(0.08 0.003 90)` — near-black
- `--foreground: oklch(0.93 0.007 90)` — near-white
- `--primary: oklch(0.60 0.245 30)` — vivid orange-red (same hue, preserved across modes)
- `--muted-foreground: oklch(0.62 0.005 90)` — medium light gray

### REQ-tokens-radius
Per identity.md §Radius system.
- `--radius: 14px` — container base (cards, dialogs, inputs)
- Interactive elements: `border-radius: 9999px` — applied via `rounded-full` at component level
- Never use `--radius` derived values (`--radius-lg`, etc.) for interactive elements

### REQ-tokens-border
Per identity.md §Border system.
- Rest alpha: `0.09` — `border-foreground/9`
- Hover alpha: `0.38` — `border-foreground/38` or `hover:border-foreground/38`
- Width: always 1px
- Focus ring: `ring-2 ring-ring` where `--ring = rgba(fg, 0.38)`
- Forbidden: opaque borders, `border-border` (uses `--border` token which is already alpha)

---

## Typography

### REQ-typography-families
Per identity.md §Typography.
- `font-sans`: `@fontsource-variable/inter` — weights 300–800 — all UI text, body, buttons, labels, kbd
- `font-display`: `@fontsource-variable/syne` — weights 700–800 — h1, h2, section headings, nav logo only
- `font-mono`: system `ui-monospace` — kbd shortcut glyphs, code snippets only

### REQ-typography-weights
Per identity.md §Font weight system.
- 300: body prose only (descriptions, paragraphs, `font-light`)
- 400: nav links, general UI text (`font-normal`)
- 600: compact numeric identifiers, uppercase labels, buttons (`font-semibold`)
- 800: display headlines Syne, featured titles Inter, metric values (`font-extrabold`)
- Forbidden: weight 500 (`font-medium`) — never appears in this system

### REQ-typography-sizes
Per identity.md §Font size system.
- 72px (clamp): display hero h1, page-level headline — `clamp(2.5rem, 6vw, 4.5rem)`
- 30px: metric values, featured titles — `text-[30px]`
- 15px: descriptions, prose, nav items, body — `text-[15px]`
- 11px: buttons, badges, labels, uppercase nav, marquee — `text-[11px]`
- 9–10px: tags, captions, metadata, kbd shortcuts — `text-[10px]` or `text-[9px]`
- Gap rule: no font-size between 11px and 15px

---

## Motion

### REQ-motion-durations
Per identity.md §Motion.
- fast: `200ms ease` — hover fills, focus ring, cursor transitions
- base: `400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` — border-color, background fill, state changes
- slow: `900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` — panel open/close, parallax scale
- nav-morph: `450ms cubic-bezier(0.4, 0, 0.2, 1)` — topbar → floating pill transition

### REQ-motion-reduced
Per identity.md §Motion.
- `@media (prefers-reduced-motion: reduce)` → all durations 0ms
- Applied globally in `src/index.css` via `!important` on `transition-duration` and `animation-duration`
- Animate transform/opacity only (no layout-triggering properties)

---

## Voice

### REQ-voice-empty
Per identity.md §Voice §Empty state shape.
- Pattern: `[verb] + [object] to get started`
- Examples: "Add your first shortcut to get started", "Save a shortcut to get started"
- Single CTA pill button follows the heading — label matches the verb

### REQ-voice-error
Per identity.md §Voice §Error shape.
- Pattern: `[name of failure] · [one recovery action]`
- Examples: "Shortcut not found · Try a different search", "Load failed · Refresh the page"
- Middle dot `·` is the separator — no em dash, no comma

### REQ-voice-destructive
Per identity.md §Voice §Destructive confirm shape.
- Button label mirrors the action exactly
- Correct: "Delete shortcut", "Remove tag"
- Forbidden: "Confirm", "Yes", "OK", "Proceed"
