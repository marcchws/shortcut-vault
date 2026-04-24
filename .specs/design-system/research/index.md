# Research Index — Shortcut Vault Design System

Reference database extracted from Refero, organized by surface and pattern. Each file documents compositional patterns, tokens, primitives, and accessibility considerations for shortcut-vault.

## References by Surface

### Primary Surface (Shortcut List/Grid with Search & Filter)

| File | Product/Source | Pattern | Focus |
|------|---|---|---|
| [peerlist-filter-sidebar.md](./peerlist-filter-sidebar.md) | Peerlist (job search) | Left-hand persistent filter sidebar, faceted controls, applied filter chips | Filter + sidebar navigation, result list composition |
| [raycast-command-palette.md](./raycast-command-palette.md) | Raycast (command launcher) | Dark modal command palette, keyboard-first search, semantic grouping | Command/search, instant filtering, keyboard affordances |

### Empty State & Loading

| File | Product/Source | Pattern | Focus |
|------|---|---|---|
| [empty-state-pattern.md](./empty-state-pattern.md) | Slite, Teams/MS | Centered empty state with illustration, clear messaging, actionable CTA | Zero list, no results, loading, error states |

### Multi-Step Creation Flow

| File | Product/Source | Pattern | Focus |
|------|---|---|---|
| [wizard-stepper-pattern.md](./wizard-stepper-pattern.md) | Contra (service wizard) | Horizontal step indicator, card-based form, validation per step | Wizard UX, progress tracking, inline validation |

## Coverage Map

**Surfaces researched:**
- ✓ Primary surface — shortcut list/grid with search/filter bar
- ✓ Command / search — Cmd+K palette
- ✓ Collection / tag sidebar — filter-based navigation
- ✓ Empty state — zero shortcuts, no search results
- ✓ Loading / error — skeleton, error retry
- ✓ Wizard / create — multi-step form for new shortcuts
- ⊘ Detail / expand — shortcut item detail (in-flight, see SRS.md `/shortcuts/$id`)
- ⊘ Auth / onboarding — out of scope (client-only, localStorage)

**Vertical:** Productivity tools, devtools, keyboard-first reference apps

## Token & Primitive Checklist

### From Raycast (Command Palette)
- `palette-bg`, `palette-border`, `search-input-placeholder`, `action-row-hover`, `section-label`
- `<Command>` (shadcn), modal wrapper, row component

### From Peerlist (Filter Sidebar)
- `sidebar-bg`, `sidebar-label`, `filter-control`, `chip-bg`, `chip-text`, `card-bg`, `card-border`, `card-hover`
- Sidebar, filter group, dropdown, checkbox, chip, card components

### From Empty State
- `empty-bg`, `empty-icon-size`, `empty-heading`, `empty-text`, `empty-cta`
- Empty state container, illustration, heading, paragraph, button

### From Wizard / Stepper
- `wizard-progress-height`, `wizard-card-padding`, `wizard-heading`, `wizard-help-text`
- `step-active`, `step-completed`, `step-inactive`
- Stepper, wizard container, form control, button group, validation indicator

## A11y & Responsive Reminders

**Across all surfaces:**
- Keyboard navigation fully supported (Tab, Shift+Tab, Enter, Escape, arrow keys)
- Focus rings visible (4.5:1 contrast on any background)
- Live regions (`aria-live="polite"`, `aria-live="assertive"`) for filter updates, errors, success toasts
- Touch targets ≥ 44×44px
- Color not the only differentiator (icons, text, patterns)
- `prefers-reduced-motion` respected (fade vs. slide, no auto-play)
- Mobile-first responsive: drawer sidebar on <768px, single-column forms on mobile
- Semantic HTML (buttons vs. links, fieldsets, labels with htmlFor)

## Next Steps

1. Extract color, spacing, typography tokens from design-system identity if present (TBD)
2. Define token values in `.specs/design-system/tokens.json` or `.css` variables
3. Implement shadcn primitives in `src/components/ui/`
4. Build feature components in `src/components/shortcut/` using patterns above
5. Test keyboard, screen reader, mobile layouts before shipping

---

**Generated:** 2026-04-24
**Researcher:** Claude Code
**Methodology:** Refero semantic search + deep-dive visual analysis

