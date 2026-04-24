# Shortcut Vault

A client-side keyboard shortcut manager built for power users who navigate everything by keyboard. Save your personal shortcuts, tag them, filter by category, and trigger them instantly via a global command palette — all stored locally, no account required.

## Features

- **Shortcut vault** — create shortcuts with name, description, and keybind capture
- **Tagging system** — assign color-coded tags with WCAG contrast enforcement
- **Instant search** — URL-synced search and multi-tag filtering with OR logic
- **Command palette** — `⌘K` / `Ctrl+K` from anywhere to copy any shortcut to clipboard
- **Inline editing** — edit name, description, and tags directly in the detail sheet
- **Undo delete** — 5-second window to restore a deleted shortcut
- **Dark / light mode** — persistent theme toggle
- **Zero backend** — everything lives in `localStorage`, nothing leaves the browser
- **[Kitchen sink](/dev/kitchen-sink)** — component showcase at `/dev/kitchen-sink`

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Radix primitives) |
| Routing | TanStack Router (file-based) |
| Server state | TanStack Query |
| Color science | culori (OKLCH, WCAG contrast) |
| Color picker | react-colorful |
| Toasts | Sonner |
| Package manager | pnpm |

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173). The vault is pre-populated with 36 real shortcuts across VS Code, browser, terminal, macOS, and window management.

## Project structure

```
src/
├── components/
│   ├── layout/          # Shell, Topbar
│   ├── shared/          # CommandPalette, SectionHeader, StorageMigrationWall
│   └── shortcuts/       # ShortcutListPage, ShortcutCard, DetailSheet,
│                        # InlineEditor, DeleteDialog, TagColorPicker,
│                        # FilterSidebar, SearchBar
│       └── wizard/      # WizardPage, Step1Form, Step2Form, Step3Review,
│                        # KeybindCapture, WizardStepper
├── lib/
│   ├── types.ts         # Shortcut, Tag, StorageSchema
│   ├── storage.ts       # localStorage read/write
│   ├── seed.ts          # Demo data — seedIfEmpty()
│   ├── contrast.ts      # WCAG contrast helpers (culori)
│   └── hooks/           # useShortcuts, useCreateShortcut, useUpdateShortcut, useDeleteShortcut
└── routes/
    ├── __root.tsx        # Shell + QueryClientProvider + aria-live region
    ├── _app.tsx          # Pathless layout — ShortcutListPage always mounted
    └── _app/
        ├── index.tsx     # / — null (list rendered by layout)
        ├── new.tsx       # /new — WizardPage
        └── $id.tsx       # /$id — DetailSheet
```

## Design decisions

**Pathless layout route (`_app.tsx`)** — the shortcut list is always mounted as the layout parent. Opening `/new` or `/$id` renders the wizard/sheet as an overlay via `<Outlet />`, so the list never unmounts and there's no content flash.

**OKLCH throughout** — colors are stored as `oklch(L C H)` strings. The `culori` library enforces WCAG 4.5:1 contrast before any tag color is saved, and picks the correct text color (dark vs white) at render time.

**Optimistic mutations** — create, update, and delete operations update the UI instantly via TanStack Query's `onMutate` → rollback on error pattern. The user never waits for a round trip.

**Exit animations** — Sheet and Dialog components start with `open=false`, mount to `open=true` via `useEffect` for entry animation, and delay navigation by 200ms on close so Radix can animate the exit before unmounting.

## License

MIT — built by [Marcos Bricches](mailto:softwares@devio.com.br)
