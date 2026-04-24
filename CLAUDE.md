# Project — shortcut-vault

Stack: Vite + React 19 · TypeScript · Tailwind v4 · shadcn (radix-nova) · TanStack Router · TanStack Query.

## Design system
Spec at `.specs/design-system/` — identity, requirements, design rationale. Every feature spec cites `REQ-tokens-*`. Never hardcode colors, spacing, or radius.

## Conventions

### Routes
- `src/routes/` file-based; `__root.tsx` shell; `src/routeTree.gen.ts` generated — never edit.
- Pathless layout route `_app.tsx` owns `validateSearch` for `{ q: string, tags: string[] }`.
- Child routes live in `src/routes/_app/`: `index.tsx` (null), `new.tsx` (wizard), `$id.tsx` (detail sheet).
- `useSearch({ from: "/_app" })` and `useNavigate({ from: "/_app" })` — no trailing slash.
- `navigate` for search-param-only updates: always include `to: "/"` and `resetScroll: false`.
- New routes: run `npx vite build` first to regenerate `routeTree.gen.ts`.

### Components
- `src/components/ui/` — shadcn primitives, never hand-edit.
- `src/components/<feature>/` — feature compositions.
- `src/lib/` — utilities, types, `queryClient.ts`. Alias `@/*` → `src/*`.
- No `AlertDialog` shadcn component installed — use `Dialog` with `role="alertdialog"` instead.
- `DialogHeader` must be inside `DialogContent` (not a sibling).
- `Button` variant `"destructive"` renders `bg-destructive/10 text-destructive` (not solid red).
- `Textarea` default styling doesn't match identity — always override via `className`.

### TypeScript
- `crypto.randomUUID()` works in modern browsers — no polyfill needed.
- Never use `key` as a prop name — React reserves it. Use `keybind` for the shortcut's key string.

### Identity rules (never violate)
- Font sizes: **11px or 15px only**. Never 12px, 13px, 14px.
- Borders: always alpha — `border-foreground/9` resting, `border-foreground/38` hover/focus.
- Interactive elements: `rounded-full`. Containers: `rounded-[14px]`.
- `--warning` token exists but no Tailwind utility — use `text-[color:var(--warning)]`.

### Identity drift in primitives (callers must compensate)
- `Textarea` (`src/components/ui/textarea.tsx`) uses generic styles — override with identity classes in every callsite.
- `SheetTitle` uses `text-base font-medium` — minor drift, acceptable.

### a11y
- `<div id="a11y-announce" aria-live="polite" aria-atomic="true" className="sr-only">` lives in `__root.tsx`.
- Announce outcomes: `document.getElementById("a11y-announce")?.textContent = "..."`.

### Mutations pattern
- `onMutate` → optimistic update → return `{ previous }`
- `onError` → rollback from `context.previous`
- `onSettled` → `queryClient.invalidateQueries`

### Persistence
- localStorage key: `shortcut-vault-v1`
- `src/lib/seed.ts` — `seedIfEmpty()` called in `main.tsx`, populates vault on first load.

## Build / Dev
- Fresh worktree: `CI=true pnpm install`
- Typecheck: `npx tsc --noEmit`
- Dev server: `pnpm dev`

## Workflow
See `~/.claude/CLAUDE.md`. Every feature begins with `/spec <slug>`.
