# Raycast — Command Palette (Search / Filter)

**Source:** https://refero.design/pages/370ddbce-beea-405c-86d5-f43e61f6a453
**Surface:** Primary surface — shortcut list/grid with search/filter bar; command/search
**Platform:** Web (Raycast store)
**Vertical:** Devtool / productivity (keyboard-first launcher and extension manager)

## Why it matches
Raycast is a keyboard-first command launcher and productivity tool—exactly the interaction pattern for shortcut-vault's Cmd+K palette. The palette is the primary entry point for searching and invoking saved shortcuts. This reference shows how to compose a minimal, distraction-free search modal with semantic grouping (Explore section) and quick actions.

## Extracted signals

**Visual & composition:**
- Modal overlay on dark dimmed background (backdrop blur + rgba(0,0,0,0.95))
- Centered single-column card with rounded corners and subtle shadow
- Monochrome palette: near-black background (#1a1a1a or #161616), near-white text (#e9e9e9)
- No border; card is defined by shadow and internal spacing
- Generous internal padding (~20–24px) between sections

**Search input & state:**
- Top-flush search field with placeholder "Search…" in muted gray (#9b9b9b)
- Input has no visible border; blends with card background
- Cursor placement at top signals focus and ready-to-type

**Content grouping:**
- Section header "Explore" in smaller, uppercase, muted gray (#7e888e or #8c8c8c)
- Below: list of actions (Browse Extensions, Create an Extension) with icons and right-aligned metadata
- Each action row is a compound button with hover/active state
- Icons use accent color or match text color; metadata (shortcut hint if shown) is right-aligned

**Interaction model:**
- Keyboard-driven: type to filter, arrow keys to select, Enter to invoke
- First-class keyboard affordances (no mouse required)
- Focus ring visible (implied by row highlights)
- No click-to-expand; all items visible and selectable

**Motion:**
- Open/close animation likely smooth fade (respects prefers-reduced-motion)
- Row hover state is subtle fill or background tint, not bold

## Adopt

**Pattern:** Dark command palette with centered modal overlay, minimal visual noise, keyboard-first interaction.

**Tokens to define:**
- `palette-bg` — dark card background (#161616 or similar, use design system dark token)
- `palette-border` — subtle stroke or shadow (use shadow token)
- `search-input-placeholder` — muted text (#9b9b9b, inherit from secondary text token)
- `action-row-hover` — subtle background tint (use hover state token for dark theme)
- `section-label` — uppercase, muted, smaller (use caption or label token)

**Primitives:**
- `<Command>` from shadcn (supports input, group, separator, shortcut)
- Custom modal wrapper with backdrop blur and dim
- Row component for semantic action grouping (icon + label + right slot for shortcut/metadata)

**Focus areas:**
- Ensure focus ring is visible (4.5:1 contrast) on dark background
- Keyboard navigation: Tab cycles rows, Escape closes, Enter invokes, arrow keys navigate
- Announce results count and selections to screen readers (aria-live="polite")
- Respect prefers-reduced-motion for open/close animations

## Notes
- Raycast's palette is the canonical devtool Cmd+K pattern; this directly informs shortcut-vault's command palette behavior
- Search-as-you-type with no separate "Submit" button; filtering is instant
- No pagination or Load More; if many shortcuts exist, consider virtualization or scrollable overflow

