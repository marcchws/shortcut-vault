## Overview
Dark-first client app (localStorage, no backend). Primary surface: card grid + filter sidebar. ⌘K palette for power users. TanStack Query wraps localStorage with optimistic updates. All filter state in URL — no duplicated UI state.

## Architecture

```
App (QueryClientProvider + ThemeProvider)
├── __root.tsx          CommandPalette + Toaster + <div aria-live="polite"> + StorageMigrationWall gate
├── /shortcuts          ShortcutListRoute (validateSearch: q, tags[])
│   ├── FilterSidebar   OR multi-select — sidebar (1280) / collapsible bar (768) / Sheet (375)
│   ├── SearchBar       debounced, URL-synced
│   └── ShortcutGrid    card grid; empty / loading / error states
├── /shortcuts/new      WizardRoute (Sheet on mobile, Dialog on tablet+)
│   ├── Step1Form       name + description
│   ├── KeybindCapture  keydown → canonical string + conflict check
│   └── Step3Review     summary + save
└── /shortcuts/$id      DetailRoute — InlineEditor (dirty-state) + DeleteDialog
```

Mutations: `onMutate` optimistic → `onError` rollback → `onSettled` invalidate. Schema mismatch on mount → `StorageMigrationWall` blocks app.

## Components & interfaces

**ShortcutCard** — `Card` wrapper. Name `text-[15px]` top-left; keybind pill `font-mono text-[11px] bg-border px-[0.5rem] py-[0.25rem] rounded-full` top-right; tag chips below; `lastUsedAt` `text-[11px] text-muted-foreground`. Border `border-border` (alpha), hover `border-border-hover`. (ref: Jace.ai/HelloIvy right-aligned monospace pill)

**KeybindCapture** — focusable `<div role="button">`, `onKeyDown` → canonical string, same keybind pill token. `capturing` → `ring-2 ring-ring`. Conflict: `text-warning text-[11px]` "Already used by [name]." + "Overwrite" button inline. Props: `value, onChange, existingShortcuts`.

**WizardStepper** — 3 circles connected by lines: hollow (upcoming) → filled primary (active) → filled + `Check` icon (completed). Transitions: `translate-x + opacity 400ms` on tablet/desktop; instant on mobile. (ref: Contra/Wittl circle-state pattern)

**CommandPalette** — shadcn `Command` in `Dialog`. `max-w-[560px] bg-popover rounded-[14px]` overlay shadow (identity: `0 2px 8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.07)`). Footer: `↑↓ Navigate · ↵ Copy · Esc Close` `text-[11px] text-muted-foreground`. ⌘K / Ctrl+K global bind; skipped when `[role="alertdialog"]` present. Select → `navigator.clipboard.writeText` + "Copied!" toast + `updateLastUsed`. (ref: Missive/Weekrise palette footer)

**TagColorPicker** — `Popover` trigger: 16×16px swatch `rounded-[2px]` + label. Input: raw `oklch(...)` string + live preview. `culori.wcagContrast` vs white + dark; inline error if both < 4.5. Chip: `inline-flex gap-2 rounded-full px-[11px] py-[4px] text-[11px]`. (ref: ElevenLabs tag chip, Figma swatch)

**FilterSidebar** — tag list from query cache, checkboxes URL-synced. Desktop: `sticky top-6 w-[200px] aside`. Tablet: `Accordion` top bar. Mobile: `Sheet`. (ref: IKEA sticky sidebar / Homerun modal)

**DeleteDialog** — `AlertDialog`. Button: "Delete shortcut". Immediate localStorage delete + sonner `duration: 4000` + "Undo" re-inserts from `onMutate` context. Props: `shortcut, open, onOpenChange`.

**StorageMigrationWall** — Full-page centered. "Old format detected." → "Reset vault" `<Button variant="destructive">` → clear storage + reload.

**InlineEditor** — Dirty-state tracker; sticky bottom bar: "Discard" ghost + "Save changes" primary when `isDirty`. Escape → discard `AlertDialog`. Props: `shortcut, onSave, onDelete`.

## Data models

```ts
type Shortcut = { id: string; name: string; description: string; key: string; tags: Tag[]; createdAt: string; lastUsedAt: string | null }
type Tag = { label: string; color: string } // "oklch(0.65 0.2 240)"
type StorageSchema = { version: "1"; shortcuts: Shortcut[] }
const QUERY_KEYS = { shortcuts: ["shortcuts"] as const, shortcut: (id: string) => ["shortcuts", id] as const }
```

Key normalization: `Control → Alt → Meta → Shift → Key`. Conflict = `===`. Tags derived from `shortcuts.flatMap(s => s.tags)` deduplicated by label.

## Error handling

| Scenario | Message | Recovery |
|---|---|---|
| localStorage read fail | "Couldn't load shortcuts · Retry" | Retry re-runs query |
| localStorage write fail | "Save failed. Changes reverted." | `onError` rollback |
| Schema mismatch | "Old format detected." | `StorageMigrationWall` → explicit reset |
| Duplicate keybind | "Already used by [name]." | Overwrite or re-capture |
| Contrast below AA | "Color doesn't meet contrast requirements." | Inline error, blocks save |
| Clipboard API absent | "Couldn't copy — use [combo] manually." | Toast only |

## Testing strategy

- **Unit:** `useShortcuts` (mocked localStorage), contrast wrapper, key normalization, schema migration.
- **Component:** KeybindCapture (keydown sequences, conflict), WizardStepper (circle states, mobile instant), DeleteDialog (confirm → undo → re-insert), InlineEditor (dirty, Escape discard).
- **A11y:** axe-core on CommandPalette (focus trap, combobox ARIA), Wizard (keyboard nav), DeleteDialog (focus return).
- **E2E:** create → list (tag filter) → detail (edit, delete + undo) → palette copy.

## Decisions

### Decision: Circle step indicator, not progress bar
Three circles (hollow / filled / filled+check) connected by lines — discrete step states, not continuous progress. (ref: Contra 5-step, Wittl 3-step)

### Decision: `font-mono` keybind pill everywhere
`font-mono text-[11px] bg-border rounded-full px-[0.5rem] py-[0.25rem]` — consistent across ShortcutCard, palette rows, and Step3 review. (ref: Jace.ai, HelloIvy)

### Decision: Palette footer with keyboard hints
`↑↓ Navigate · ↵ Copy · Esc Close` persists below results — non-interactive, `text-muted-foreground`. (ref: Missive, Weekrise)

### Decision: Immediate delete + 4s undo toast
Delete writes immediately; undo re-inserts from `onMutate` context. `duration: 4000` per identity.md feedback window.

### Decision: `key: string` canonical over `keys: string[]`
`===` conflict detection; single display-split point. Normalization: `Control → Alt → Meta → Shift → Key`.

### Decision: Clipboard copy, not `KeyboardEvent` dispatch
App can't intercept shortcuts in other apps. `navigator.clipboard.writeText` is honest. Fallback toast if API absent.

### Decision: `culori` for OKLCH contrast
Gamut clipping math is non-trivial; silent bugs in contrast validation are a safety issue. `culori.wcagContrast()` is the industry standard.

### Decision: Blocking migration wall
Wiping user data without explicit consent contradicts REQ-11 destructive-confirm pattern. Full-page wall with single CTA.

## References

- **Missive · palette** — footer hints bar `↑↓ ↵ Esc`, blue-highlight selected row → CommandPalette footer + selection token
- **Weekrise · palette tabs** — `CommandGroup` section headings `14px uppercase muted` → grouped results pattern
- **Polar · global search** — "No commands found" empty state → palette empty state
- **Jace.ai · keybindings** — monospace grey pill `12px 0.5rem radius` right-aligned in rows → `keybind-pill` token
- **HelloIvy · shortcuts list** — `flex justify-between` label + pill → ShortcutCard + palette row layout
- **Contra · 5-step wizard** — circle states + Back/Next bottom-right, Next disabled until valid → WizardStepper
- **Wittl · 3-step wizard** — compact circle indicator with icon+text labels → step label pattern
- **Figma · color palettes** — 16px swatch `rounded-[4px]` → `color-swatch` 16×16 `rounded-[2px]` in TagColorPicker
- **ElevenLabs · voice tags** — `rounded-full px-3 py-1 text-[12px]` pill with inline accent → TagColorPicker chip
- **IKEA · product catalog** — sticky left sidebar, collapsible filters, checkbox list → FilterSidebar desktop layout
- **Homerun · candidate filter** — filter-applied badge with count → active filter state in FilterSidebar
