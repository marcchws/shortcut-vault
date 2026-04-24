# SRS — Shortcut Vault

Mini-produto pra salvar, taguear, filtrar e acionar atalhos de teclado pessoais. Client-only (localStorage).

## User stories

- **US-1** · Power user: salvo atalhos pra não esquecer entre apps.
- **US-2** · Returning user: filtro por tag + busco por nome, URL-syncada.
- **US-3** · Editor: edito/deleto com confirmação destrutiva + undo.
- **US-4** · Keyboard-first: abro command palette (⌘K) e navego tudo por teclado.

## Functional requirements

- Lista em `/shortcuts` — filter por tag + search por nome, estado sincronizado via URL search params (TanStack Router typed `validateSearch`).
- Wizard em `/shortcuts/new` com 3 steps: (1) nome + descrição, (2) capture do keybind em tempo real, (3) review + save. Motion entre steps.
- Detalhe em `/shortcuts/$id` — edit inline ou delete.
- Delete destrutivo: dialog de confirmação + toast com undo de 5s.
- ⌘K abre command palette (shadcn `Command`) que aciona qualquer atalho salvo.
- Mutations otimistas com rollback em falha + cache invalidation (TanStack Query).

## States (first-class, todas exigidas)

- Empty list (zero shortcuts) — CTA pro primeiro.
- Loading — skeleton.
- Error — retry + offline fallback.
- Validação inline no wizard.
- Conflict detection: combo duplicado → warning + opção de overwrite.
- Destructive confirm dialog.
- Undo window (toast com countdown visual).
- Success toast + list refresh.

## Accessibility

- Keyboard full flow no wizard: Tab/Shift+Tab entre campos, Enter avança, Escape cancela.
- Command palette: focus trap + ARIA combobox semantics.
- Live region (`aria-live="polite"`) em save/delete/undo.
- `prefers-reduced-motion` respeitado em transições do wizard + palette open.
- Focus retorna ao trigger após dialog close.
- Tags são user-colored (OKLCH picker) — validação de contraste AA no input, rejeita cor abaixo do limite.

## Responsive

- Mobile (375): lista em cards stacked, wizard full-screen sheet, palette bottom sheet.
- Tablet (768): lista 2-col grid, wizard modal.
- Desktop (1280): lista 3-col grid + sidebar de filtros, wizard modal, palette floating center.

## Data model

- `Shortcut { id, name, description, keys: string[], tags: Tag[], createdAt, lastUsedAt }`
- `Tag { label, color: oklch }`
- Persistence: localStorage com schema versionado.

## Out of scope

- Backend / auth / multi-user / cross-device sync / export-import.
