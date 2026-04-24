# Design — shortcut-vault

## Product summary

Shortcut Vault is a keyboard shortcut reference and management app. Users browse, search, and organize shortcuts across tools and applications. Primary aesthetic reference: dvdrod.com — a senior product designer portfolio with high editorial density, minimal chrome, and expressive Syne display type against restrained Inter body.

---

## Dimensional system key rules

These rules prevent shadcn defaults from bleeding in. Every component must satisfy all four rules before shipping.

### Rule 1 — Radius
- Standalone interactive (buttons, badges, pills, tags, tooltips, kbd): `9999px` (rounded-full)
- Bounded containers (cards, dialogs, popovers, inputs, skeletons): `14px`
- Dot/avatar: `50%`
- Never: `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl` — these are shadcn defaults, not identity values

### Rule 2 — Border
- Always translucent alpha — never opaque solid
- Rest: `border-foreground/9` (`rgba(fg, 0.09)`)
- Hover/focus-ring: `border-foreground/38` (`rgba(fg, 0.38)`)
- Width: always 1px

### Rule 3 — Font sizes
- 72px display | 30px heading | 15px body | 11px UI | 9–10px micro
- **Gap rule**: no font-size between 11px and 15px (no 12px, 13px, 14px body text)
- shadcn default `text-sm` (14px) is forbidden for body; use `text-[15px]` + `font-light`

### Rule 4 — Shadow
- Resting: zero shadow on all cards, buttons, inputs
- Elevated (floating nav, popovers): `0 4px 24px rgba(0,0,0,0.25)`
- Overlay (modal, command palette): `0 2px 8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.07)`

---

## Component layer diagram

```
tokens (index.css :root / .dark)
  └── primitives (src/components/ui/)         ← shadcn scaffold, restyled
        └── shared (src/components/shared/)   ← project compositions used 2+ times
              └── layout (src/components/layout/)  ← shell, topbar
                    └── feature (src/components/<feature>/)  ← domain-specific
```

Rules across layers:
- Tokens → primitives: className only, no hard values
- Primitives → shared: compose, don't copy-paste primitive markup
- Shared → layout/feature: props-driven, className passthrough always exported
- Never bypass a lower layer (e.g. don't use raw `<div>` with hardcoded padding where a Card exists)

---

## Derivation examples

**Badge** = `10px` + `uppercase` + `tracking-[0.1em]` + `rounded-full` + `border-foreground/9` + `text-muted-foreground` + `px-[11px] py-[4px]`

**KbdKey** = `10px` + `ui-monospace` + `rounded-full` + `border-foreground/9` + `bg-muted` + `px-[11px] py-[4px]`

**Card hover** = base `border-foreground/9` → hover `border-foreground/38` over `400ms cubic-bezier(0.25,0.46,0.45,0.94)`, zero shadow at rest
