## Goal
Client-only (localStorage) vault for saving, tagging, filtering, and triggering personal keyboard shortcuts. Designed for power users who navigate everything by keyboard.

## Requirements

### Shortcut List (`/shortcuts`)
- **REQ-1:** Filter by tag(s) + search by name → URL-synced via TanStack Router `validateSearch` (`q: string`, `tags: string[]`). OR logic for tags: shows shortcuts matching any selected tag. Back/forward restores state. Empty inputs → show all.
- **REQ-2:** Empty state (zero shortcuts) → headline "No shortcuts yet" + CTA "Add your first shortcut" linking to `/shortcuts/new`.
- **REQ-3:** Loading state → skeleton grid matching the active layout (stacked / 2-col / 3-col).
- **REQ-4:** Error state (localStorage read failure) → message "Couldn't load shortcuts" + "Retry" button that re-runs the query.

### Wizard (`/shortcuts/new`)
- **REQ-5:** 3-step wizard — Step 1: name + description fields; Step 2: real-time keybind capture; Step 3: review + save. Step transitions animate (slide/fade) on tablet/desktop only; no step animation inside the mobile sheet (sheet open animation suffices).
- **REQ-6:** Step 2 keybind capture: listens `keydown`, records modifier(s) + key, normalizes to canonical string `Modifier+Modifier+Key` (e.g. `Meta+Shift+K`). Pressing again resets. Supports multi-modifier chords.
- **REQ-7:** Conflict detection: captured combo matches an existing shortcut → inline warning "Already used by [name]." User must overwrite the existing shortcut or capture a different combo. "Keep both" is not permitted.
- **REQ-8:** Inline validation — name: required, ≤100 chars; keybind: required. Errors shown on field blur and on attempted step advance.
- **REQ-9:** Save → optimistic mutation → success toast "Shortcut saved" + navigate to `/shortcuts`. On failure → rollback + error toast "Save failed. Changes reverted."

### Detail (`/shortcuts/$id`)
- **REQ-10:** All fields (name, description, tags) are editable inline. A single "Save changes" button appears when any field is dirty. Escape discards all pending changes (with confirm dialog if edits are substantial). Save on Escape is not automatic.
- **REQ-11:** Delete: confirmation dialog → on confirm, immediately delete from localStorage + open sonner toast with 5s visual countdown. "Undo" in toast re-inserts the full shortcut record. After 5s or toast dismiss → permanent (no further action needed).
- **REQ-12:** `lastUsedAt` updated when a shortcut is copied via command palette.

### Command Palette (⌘K / Ctrl+K)
- **REQ-13:** Global keybind ⌘K (Mac) / Ctrl+K (Win/Linux) opens palette from any route. Suppressed when a blocking dialog is already open.
- **REQ-14:** Palette lists all shortcuts; typing filters by name or tag label. Selecting a shortcut copies the key combo string (e.g. `⌘ Shift K`) to clipboard + shows "Copied!" toast + updates `lastUsedAt`.
- **REQ-15:** Palette closes on Escape or outside click; focus returns to the previously focused element.

### Tags
- **REQ-16:** Tags are created inline (in wizard / detail editor) — no separate tag management screen. Each tag has a label + OKLCH color assigned via a color picker popover. On color input, compute WCAG contrast ratio using `culori`; reject (inline error) if ratio < 4.5:1 on both white and dark surfaces.
- **REQ-17:** Tag filter is multi-select (OR logic); selection is URL-synced (REQ-1). Filter sidebar derives its tag list from all unique labels across saved shortcuts.

### Data / Persistence
- **REQ-18:** `Shortcut { id: string, name: string, description: string, key: string, tags: Tag[], createdAt: string, lastUsedAt: string | null }`. `key` is a normalized canonical string: `"Modifier+Modifier+Key"` (e.g. `"Meta+Shift+K"`).
- **REQ-19:** `Tag { label: string, color: string }` — color stored as `oklch(L C H)` string.
- **REQ-20:** localStorage key `shortcut-vault-v1`. On version mismatch → full-page blocking notice ("Your saved shortcuts are in an old format we can't read.") with single "Reset vault" CTA. Requires explicit user confirmation before clearing storage.

### A11y
- **REQ-a11y-1:** Wizard keyboard: Tab / Shift+Tab between fields; Enter advances step; Escape cancels wizard and navigates back to list.
- **REQ-a11y-2:** Command palette: `role="combobox"`, `aria-expanded`, `aria-activedescendant`, focus trap while open.
- **REQ-a11y-3:** Single `aria-live="polite"` region in root announces save, delete, undo, and copy outcomes.
- **REQ-a11y-4:** After dialog / sheet close, focus returns to the element that opened it.
- **REQ-a11y-5:** All interactive elements: visible focus ring with ≥3:1 contrast; touch targets ≥44×44 px.

### Responsive
- **REQ-responsive-1:** Mobile (375): list as stacked single-column cards; wizard as full-screen bottom sheet (no step animations inside); command palette as bottom sheet.
- **REQ-responsive-2:** Tablet (768): list as 2-col grid; filter in collapsible top bar; wizard as centered modal with step transitions.
- **REQ-responsive-3:** Desktop (1280): list as 3-col grid with sticky left sidebar for filters; wizard as centered modal with step transitions; palette as floating centered overlay.

### Motion
- **REQ-motion-1:** Wizard step transitions (slide+fade) active on tablet/desktop only. Palette open/close uses fade+scale. All animations disabled when `prefers-reduced-motion: reduce`.
