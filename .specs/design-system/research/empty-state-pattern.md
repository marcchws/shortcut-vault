# Empty State Pattern (Multiple References)

**Surfaces covered:** Empty state, Loading, Error

**Key sources:**
- https://refero.design/pages/dc7d8e58-3358-4095-8b89-085741caff18 (Slite — 404/No Results)
- https://refero.design/pages/872e577c-a2b6-4a10-a86c-65a90460ea99 (Teams/MS — No Results search)

**Vertical:** Productivity tools, knowledge base, collaboration

## Why it matches
Empty states are first-class surfaces in shortcut-vault (US: "zero shortcuts" list, "search returns nothing"). These references show how productivity tools handle no-results, zero-state, and 404 screens with clear messaging, illustrations, and actionable CTAs.

## Extracted signals

**Visual composition (empty state):**
- Centered vertical stack on a neutral/light background
- Illustration or icon as primary visual (abstract shapes, empty inbox metaphor, or magnifying glass)
- Illustration occupies 20–30% of viewport height; not overwhelming
- Illustration uses brand palette or muted accent colors
- No border, shadow on illustration; it's floating

**Typography & messaging:**
- Primary heading (bold, ~20–24px, dark gray #1a1a1a) explains the empty state clearly
  - Example: "We couldn't find any results for 'query'"
  - Example: "No shortcuts saved yet"
- Secondary paragraph (regular, ~14–16px, light gray #7f7f7f) gives actionable guidance
  - Example: "Check for spelling or try searching for another term"
  - Example: "Start by creating your first shortcut"
- No clutter; 1–2 lines of supporting text max

**Call-to-action:**
- Primary CTA button (filled, accent color) below text
  - Example: "Create your first shortcut" (links to /shortcuts/new)
  - Example: "Browse our collection" (suggests filter reset or nav to browse)
- Button is center-aligned or left-aligned if part of a card
- Button uses primary action token (bright color, clear affordance)

**Layout & responsive:**
- On mobile: full-width card or sheet with padding (24px)
- On desktop: centered container with max-width (~400–500px) for breathing room
- Vertical centering in viewport (or top-aligned in a list view)
- Illustration scales with viewport: smaller on mobile, larger on desktop

**States that need empty treatments:**
1. **Zero list** — user has created 0 shortcuts yet
2. **Search returns nothing** — filter/search term matches no shortcuts
3. **Filter applied, no matches** — tag or app filter yields empty results
4. **Loading state** — skeleton cards or spinner (first-class, not secondary)
5. **Error state** — network error, sync failure, can retry

## Adopt

**Pattern:** Centered empty-state card with illustration, clear message, and primary CTA.

**Tokens to define:**
- `empty-bg` — background color (neutral light, #f6f7f7 or #ffffff)
- `empty-icon-size` — illustration size (120–160px on desktop, 80–100px on mobile)
- `empty-heading` — typography (bold, ~20–24px, use heading-4 or heading-5 token)
- `empty-text` — secondary message (regular, ~14px, use body-secondary token)
- `empty-cta` — button style (primary action, use button-primary token)

**Primitives:**
- Empty state container (centered flex column, max-width constraint)
- Illustration component (SVG or image asset)
- Heading (h3 or h4)
- Paragraph (body text)
- Button (primary variant)

**States required:**
- Zero list (no shortcuts created)
- Search no results (query matched nothing)
- Filter no matches (tags applied, no shortcuts found)
- Loading (skeleton list or spinner)
- Error (retry button, error message, optional offline fallback)
- Sync error (retry CTA, timestamp of last sync)

**Focus areas:**
- Message text must clearly explain why the list is empty (not generic "No results")
- CTA must be actionable and contextual (not "Go back")
- Illustration should be accessible (alt text on img, or decoration if SVG)
- Loading state must not block interaction; allow cancel or nav away
- Error messages should include retry affordance and optional offline mode hint

## Notes
- Empty state is a first-class feature, not a fallback; design it early
- Illustrations add personality; consider brand palette (OKLCH color picker for tags can inspire accent color)
- CTAs should route to next logical step: /shortcuts/new for zero list, clear filter for no-match, etc.

