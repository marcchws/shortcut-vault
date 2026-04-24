# Project — shortcut-vault

Stack: Vite + React 19, TypeScript, Tailwind v4, shadcn (Nova preset), TanStack Router, TanStack Query.

## Design system
Tokens/typography/primitives/motion at `.claude/specs/design-system/`. Every feature spec cites `REQ-tokens-*`. Never hardcode colors or spacing.

## Conventions
- `src/routes/` — TanStack Router file-based. `__root.tsx` is the shell.
- `src/routeTree.gen.ts` — generated; never edit by hand.
- `src/components/ui/` — shadcn primitives. Never hand-edit.
- `src/components/<feature>/` — feature compositions.
- `src/lib/` — utilities, types, `queryClient.ts`.
- Data: always `useQuery` / `useMutation`. No `useEffect + fetch`.
- Navigation: typed `<Link>` / `useNavigate`. No raw `<a>`.
- Alias: `@/*` → `src/*`. Package manager: pnpm.

## Workflow
See `~/.claude/CLAUDE.md`. Every feature begins with `/spec <slug>`.
