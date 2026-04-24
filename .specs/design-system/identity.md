# Identity — shortcut-vault

## Product
A keyboard shortcut reference and management app where users browse, search, and organize shortcuts across tools and applications. Primary reference: dvdrod.com (Senior Product Designer portfolio).

---

## Dimensional System

### Padding scale
- Interactive compact (tags, micro badges): 4px 11px
- Interactive default (buttons, pills): 7px 15px
- Container tight (list rows, divider items): 14px 0
- Container default (cards, panels): 40px 44px
- Rule: vertical padding never exceeds 7px in any standalone interactive element; 14px is the floor for container rows

### Font size system
- Display: 72px (clamp floor) — context: hero h1, page-level headline only
- Heading: 30px — context: metric values, featured item titles (Inter 800)
- Body: 15px — context: descriptions, prose, nav items
- UI: 11px — context: buttons, badges, labels, uppercase nav links, marquee
- Micro: 9px–10px — context: tags, captions, metadata, kbd shortcuts
- Rule: no font-size between 11px and 15px

### Font weight system
- 300: body prose only (descriptions, about paragraphs)
- 400: nav links, general UI text
- 600: compact numeric identifiers, project numbers
- 700: Syne only — smaller section identifiers, company names, awards
- 800: display headlines (Syne), featured item titles (Inter), metric values (Inter)
- Rule: 500 never appears; 600 appears only on Inter for compact numeric/identifier contexts

### Letter-spacing system
- Display (Syne 800): −0.045em to −0.05em
- UI labels uppercase: 0.1em to 0.14em
- Button / badge: 0.08em
- Body: 0

### Line-height system
- Display: 0.88
- UI (buttons, labels): 1 (not set, no leading)
- Body: 1.62–1.65

### Border system
- Style: always translucent alpha — `rgba(fg, 0.09)` default, `rgba(fg, 0.38)` hover
- Width: 1px everywhere
- Interactive elements: `rgba(fg, 0.09)`, hover `rgba(fg, 0.38)`
- Containers (cards): `rgba(fg, 0.09)`
- Dividers: bottom-only `1px solid rgba(fg, 0.09)`
- Focus ring: `ring-2 ring-ring` where ring = `rgba(fg, 0.38)` (matches hover alpha)
- Rule: never a solid opaque border; never border-radius mismatch within a component

### Radius system
- Interactive (buttons, badges, pills, tags): 9999px (rounded-full)
- Container (cards, dialogs, popovers): 14px
- Input: 14px (matches container)
- Micro (kbd, inline tags): 9999px — pill rule, never hard-cornered
- Dot/avatar: 50%
- Rule: pill (rounded-full) is the default for every standalone interactive element; 14px only for bounded containers

### Shadow system
- Resting state: zero (cards, buttons, inputs — no shadow)
- Elevated (floating nav pill, popovers): `0 4px 24px rgba(0,0,0,0.25)`
- Overlay (modal, command palette): `0 2px 8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.07)`
- Rule: shadow only signals detachment from the page surface; resting components never have shadow

---

## Palette (OKLCH)

### Dark mode (primary)
```
--background:              oklch(0.08 0.003 90)
--background-2:            oklch(0.10 0.003 90)
--foreground:              oklch(0.93 0.007 90)
--muted:                   oklch(0.10 0.003 90)
--muted-foreground:        oklch(0.62 0.005 90)
--card:                    oklch(0.10 0.003 90)
--card-foreground:         oklch(0.93 0.007 90)
--popover:                 oklch(0.10 0.003 90)
--popover-foreground:      oklch(0.93 0.007 90)
--border:                  oklch(0.93 0.007 90 / 0.09)
--border-hover:            oklch(0.93 0.007 90 / 0.38)
--input:                   oklch(0.93 0.007 90 / 0.09)
--ring:                    oklch(0.93 0.007 90 / 0.38)
--primary:                 oklch(0.60 0.245 30)
--primary-foreground:      oklch(1 0 0)
--secondary:               oklch(0.70 0.170 30)
--secondary-foreground:    oklch(1 0 0)
--accent:                  oklch(0.60 0.245 30)
--accent-foreground:       oklch(1 0 0)
--destructive:             oklch(0.60 0.245 30)
--destructive-foreground:  oklch(1 0 0)
--success:                 oklch(0.80 0.210 148)
--success-foreground:      oklch(0.08 0.003 90)
--warning:                 oklch(0.75 0.150 70)
--warning-foreground:      oklch(0.08 0.003 90)
--sidebar:                 oklch(0.08 0.003 90)
--sidebar-foreground:      oklch(0.93 0.007 90)
--sidebar-primary:         oklch(0.60 0.245 30)
--sidebar-primary-foreground: oklch(1 0 0)
--sidebar-accent:          oklch(0.10 0.003 90)
--sidebar-accent-foreground: oklch(0.93 0.007 90)
--sidebar-border:          oklch(0.93 0.007 90 / 0.09)
--sidebar-ring:            oklch(0.93 0.007 90 / 0.38)
--chart-1:                 oklch(0.70 0.200 30)
--chart-2:                 oklch(0.65 0.180 210)
--chart-3:                 oklch(0.68 0.170 60)
--chart-4:                 oklch(0.68 0.170 0)
--chart-5:                 oklch(0.50 0 0)
```

### Light mode
```
--background:              oklch(0.93 0.014 85)
--background-2:            oklch(0.91 0.012 85)
--foreground:              oklch(0.08 0.003 90)
--muted:                   oklch(0.91 0.012 85)
--muted-foreground:        oklch(0.40 0.005 80)
--card:                    oklch(0.91 0.012 85)
--card-foreground:         oklch(0.08 0.003 90)
--popover:                 oklch(0.91 0.012 85)
--popover-foreground:      oklch(0.08 0.003 90)
--border:                  oklch(0.08 0.003 90 / 0.10)
--border-hover:            oklch(0.08 0.003 90 / 0.38)
--input:                   oklch(0.08 0.003 90 / 0.10)
--ring:                    oklch(0.08 0.003 90 / 0.38)
--primary:                 oklch(0.60 0.245 30)
--primary-foreground:      oklch(1 0 0)
--secondary:               oklch(0.54 0.220 30)
--secondary-foreground:    oklch(1 0 0)
--accent:                  oklch(0.60 0.245 30)
--accent-foreground:       oklch(1 0 0)
--destructive:             oklch(0.60 0.245 30)
--destructive-foreground:  oklch(1 0 0)
--success:                 oklch(0.35 0.120 148)
--success-foreground:      oklch(0.93 0.007 90)
--warning:                 oklch(0.55 0.140 70)
--warning-foreground:      oklch(0.93 0.007 90)
--sidebar:                 oklch(0.91 0.012 85)
--sidebar-foreground:      oklch(0.08 0.003 90)
--sidebar-primary:         oklch(0.60 0.245 30)
--sidebar-primary-foreground: oklch(1 0 0)
--sidebar-accent:          oklch(0.93 0.014 85)
--sidebar-accent-foreground: oklch(0.08 0.003 90)
--sidebar-border:          oklch(0.08 0.003 90 / 0.10)
--sidebar-ring:            oklch(0.08 0.003 90 / 0.38)
--chart-1:                 oklch(0.60 0.245 30)
--chart-2:                 oklch(0.50 0.200 210)
--chart-3:                 oklch(0.55 0.180 60)
--chart-4:                 oklch(0.55 0.180 0)
--chart-5:                 oklch(0.50 0 0)
```

---

## Typography (Fontsource)

- `font-display`: `@fontsource-variable/syne` — weights 700–800 — context: h1, h2, section headings, nav logo only
- `font-sans`: `@fontsource-variable/inter` — weights 300–800 — context: all UI text, body, buttons, labels, kbd
- `font-mono`: system `ui-monospace` — context: keyboard shortcut glyphs, code snippets only

---

## Motion

- fast: 200ms — hover fills, focus ring, cursor transitions; `ease`
- base: 400ms — border-color, background fill, state changes; `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- slow: 900ms — panel open/close, parallax scale; `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- nav-morph: 450ms — topbar to floating pill; `cubic-bezier(0.4, 0, 0.2, 1)`
- Rule: no spring, no bounce as system patterns
- reduced-motion: all durations → 0ms

---

## Composition

- Secondary actions: inline pill buttons within context — no Sheet or Dialog for secondary navigation
- Destructive confirm: single-button + toast undo (4s, bottom-right)
- Long forms: multi-step wizard with step indicator (3-step create flow)
- Navigation — desktop: fixed topbar (full width) → floating centered pill (56% width, `border-radius: 9999px`) on scroll > 60px; gap 48px between logo and links; links hidden on mobile
- Navigation — mobile: same bar but nav-links hidden; pill morph retained
- Empty states: single-line helper text + one CTA pill button (no illustration)
- Loading: skeleton matching final shape per region; no global spinner
- Feedback: toast bottom-right, 4s duration
- Search/command: filter bar above list (primary) + Cmd+K palette overlay (power user); palette uses `background: oklch(0.10 0.003 90)`, `border-radius: 14px`, overlay shadow
- Rule: overlays (14px radius, elevated shadow) only for command palette and creation flows — never for reading or browsing

---

## Voice

- Register: first-person direct; imperative CTAs; numbers over adjectives for proof points
- Prefer: "Find", "Add", "Copy", "Save", "Done" — short imperative; contractions ("it's", "you've", "let's")
- Avoid: "Manage", "Utilize", "Seamlessly", "Powerful", "Leverage" — adverbs modifying obvious actions
- Corpus (verbatim from primary reference):
  1. "Available for work"
  2. "Turning free trial users into loyal members"
  3. "Finding the right incentive to double referral volume"
  4. "Work in progress"
  5. "Looking for more?"
  6. "Say hi!"
  7. "Let's talk"
  8. "View CV"
  9. "Guest"
  10. "I want to understand why users behave the way they do before I open Figma."
- Metrics (measured from corpus): avg sentence length ~7 words; ~2 exclamations per 100 words; contractions yes
- Empty state shape: `[verb] + [object] to get started` — e.g. "Add your first shortcut to get started"
- Error shape: name the failure + one recovery action — e.g. "Shortcut not found · Try a different search"
- Destructive confirm shape: button label mirrors the action exactly — e.g. "Delete shortcut" not "Confirm"
