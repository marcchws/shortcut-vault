# Retrospective — shortcut-vault

**Deployed URL:** http://localhost:5173
**Run date:** 2026-04-24
**Persona:** Power user who navigates everything by keyboard — saves personal keyboard shortcuts to a vault, filters/searches them, triggers them via command palette.
**Outcome:** partial

---

## Findings

### FR-1 — Cold landing with empty vault gives no orientation or shortcut hint
- **Severity:** medium
- **Step/surface:** `/` — empty state in `ShortcutGrid`
- **Observation:** The empty state renders "No shortcuts yet" + "Add your first shortcut" CTA. There is no hint that Ctrl+K / Cmd+K opens the command palette, no mention of keyboard-first workflow, and nothing that sets expectations about what this product is. A brand-new user landing cold has no onboarding signal beyond the list header "Find your shortcut."
- **Root cause hypothesis:** REQ-2 covers the headline and CTA but does not specify any contextual onboarding copy for the empty-vault state.
- **Spec coverage:** REQ-2 — partially covered; gap around palette discovery and product orientation.
- **Fix suggestion:** Add a secondary hint below the CTA: "Press Ctrl+K anytime to search and copy your shortcuts." Also consider a one-line product description in the empty state to clarify the purpose for first-time visitors.

---

### FR-2 — "Add tag" default label and color are not communicated; user has no idea what they will get
- **Severity:** medium
- **Step/surface:** `/new` — Step 1, tag creation in `WizardPage`
- **Observation:** Clicking "+ Add tag" immediately creates a tag with label "Tag" and color `oklch(0.65 0.2 240)` (a medium blue). The chip appears with no affordance explaining it is editable. A keyboard-only user who does not know to click the chip will not discover the label/color popover. There is no keyboard shortcut for "open tag editor" and the remove button (`XIcon`) is CSS hover-only (`hidden group-hover:flex`) — invisible to keyboard navigation.
- **Root cause hypothesis:** REQ-16 specifies inline tag creation with a color picker popover but does not specify how keyboard users discover the popover or how the remove button should be reachable without hover.
- **Spec coverage:** REQ-16 — gap on keyboard discoverability of tag edit/remove actions.
- **Fix suggestion:** Make the remove button always visible (or show on `:focus-within` of the tag group), not only on CSS hover. Add `aria-label` that says "Edit tag label and color" so screen readers announce the button's purpose. Consider adding a visible "(edit)" cue on first render or tooltip on focus.

---

### FR-3 — Keybind capture silently ignores single-key presses; user cannot save a bare key like F5
- **Severity:** medium
- **Step/surface:** `/new` — Step 2, `KeybindCapture`
- **Observation:** `normalizeKey` returns an empty string when the pressed key is in `MODIFIER_KEYS`. It also returns `e.key` (e.g. `"k"`, `"F5"`) when no modifiers are held — which is fine. However Escape is intercepted and used to exit capture mode (`setCapturing(false)`) rather than being recorded as a keybind. There is no way to record a bare Escape shortcut. More importantly: when capture mode is active, pressing a modifier-only chord (e.g. hold Ctrl then release) produces an empty string and `onChange` is never called — the capture widget stays in listening mode with no feedback. A confused user may not realize why nothing happened after pressing Ctrl alone.
- **Root cause hypothesis:** REQ-6 says "records modifier(s) + key" implying at least one non-modifier key is required, but the UX does not communicate this constraint. The empty-string guard in `handleKeyDown` is silent.
- **Spec coverage:** REQ-6 — gap on communicating the "must include a non-modifier key" constraint.
- **Fix suggestion:** When a modifier-only press is detected, show a transient hint inside the capture box: "Include at least one non-modifier key (e.g. Ctrl+K, not just Ctrl)." This prevents the blank-stare moment.

---

### FR-4 — Conflict resolution "Overwrite" button does nothing observable; user cannot tell the conflict is resolved
- **Severity:** high
- **Step/surface:** `/new` — Step 2, `KeybindCapture` conflict warning
- **Observation:** When a captured combo conflicts with an existing shortcut, the warning "Already used by [name]." appears with an "Overwrite" button. The `handleOverwrite` function calls `onChange(value)` with the same value already stored — it is effectively a no-op. The conflict warning does not disappear after clicking Overwrite because `conflict` is re-derived from the unchanged `value` on every render. The user sees the same warning even after confirming intent to overwrite, and has no indication that clicking "Overwrite" registered their decision. They may click repeatedly, or assume the feature is broken, or go back to re-capture a different key.
- **Root cause hypothesis:** The conflict acknowledged state is never stored locally. The design intent (allow proceeding after overwrite confirmation) is not reflected in the UI state.
- **Spec coverage:** REQ-7 — implementation gap. The spec says "User must overwrite the existing shortcut or capture a different combo" but the overwrite acknowledgement flow is broken.
- **Fix suggestion:** Add a local `overwriteAcknowledged` boolean state in `KeybindCapture`. After clicking Overwrite, set it to `true`. When `overwriteAcknowledged` is true, suppress the conflict warning and instead show a confirmation badge: "Will overwrite [name] on save." Reset when `value` changes (new capture). Pass `overwriteAcknowledged` up or rely on Step 3's existing conflict display to complete the story.

---

### FR-5 — InlineEditor does not allow editing the keybind; no clear path for users who captured the wrong key
- **Severity:** high
- **Step/surface:** `/$id` detail sheet — `InlineEditor`
- **Observation:** The keybind field in the detail sheet is intentionally read-only: it renders the key as a pill with the note "Create a new shortcut to change the keybind." This forces the user to delete the existing shortcut, then re-run the full 3-step wizard to fix a typo in the keybind. For a power user who just mistyped one key this is a multi-step detour. The spec (REQ-10) says "all fields (name, description, tags) are editable inline" but explicitly does not include keybind — however this decision is not surfaced as a design choice to the user; the copy reads like a limitation or bug rather than an intentional constraint.
- **Root cause hypothesis:** REQ-10 excludes keybind from inline editing. The "Create a new shortcut to change the keybind" guidance is present but positioned below the read-only pill, visually deemphasized at 11px muted text — easy to miss.
- **Spec coverage:** REQ-10 — covered as designed, but the UX consequence is friction for keyboard-focused users. This is a spec-level decision that produces real user pain.
- **Fix suggestion:** Either (a) add keybind editing inline (recaptured via the same `KeybindCapture` widget) as a v2 enhancement, or (b) make the "Create a new shortcut" note more prominent — perhaps a ghost button labelled "Change keybind" that navigates to `/new` with the name/description pre-filled from the existing shortcut.

---

### FR-6 — Delete undo window is 4 seconds but spec says 5; countdown not visualized
- **Severity:** medium
- **Step/surface:** `/$id` → delete confirmation dialog → sonner toast — `DeleteDialog`
- **Observation:** The `DeleteDialog` description reads "You can undo this for 4 seconds" and the toast `duration` is `4000ms`. REQ-11 specifies a 5-second countdown. Beyond the spec mismatch, the toast carries no visual countdown indicator. Without a progress bar or timer ring the user cannot judge whether they still have time to undo — they must act immediately or assume the window has passed. This is especially punishing for keyboard users who cannot glance quickly at the toast while their hands are on the keyboard.
- **Root cause hypothesis:** The toast duration was set to 4000ms during implementation, diverging from the 5s spec. REQ-11 specifies a "5s visual countdown" which implies a progress bar/timer — this was not implemented.
- **Spec coverage:** REQ-11 — two gaps: duration mismatch (4s vs 5s) and missing visual countdown.
- **Fix suggestion:** Change `duration: 4000` to `duration: 5000`. Implement the visual countdown using Sonner's built-in progress bar (if available) or a custom toast component with a CSS animation from full-width to zero over 5s.

---

### FR-7 — Command palette tag chips use hardcoded dark text color regardless of tag color contrast
- **Severity:** medium
- **Step/surface:** Command palette — `PaletteContent` in `CommandPalette.tsx`
- **Observation:** In `PaletteContent`, tag chips in the command palette are rendered with `color: "oklch(0.08 0.003 90)"` (near-black) hardcoded. For dark or low-luminosity tag colors this produces failing contrast. The same pattern is handled correctly in `ShortcutCard` and `Step3Review` by calling `checkContrast()` and choosing text color based on the ratio. The palette is inconsistent.
- **Root cause hypothesis:** Copy-paste omission. The developer applied the contrast-aware logic in the card and review components but used a shortcut in the palette's compact tag rendering.
- **Spec coverage:** REQ-16 (contrast enforcement) — gap in command palette surface.
- **Fix suggestion:** Replace the hardcoded color with the same `checkContrast(tag.color)` pattern already used in `ShortcutCard`.

---

### FR-8 — StorageMigrationWall "Reset vault" button fires with no confirmation dialog, violating its own spec
- **Severity:** high
- **Step/surface:** Migration wall — `StorageMigrationWall`
- **Observation:** `handleReset` calls `localStorage.clear()` and `window.location.reload()` immediately on button click. REQ-20 states "Requires explicit user confirmation before clearing storage." There is no confirmation dialog. A user who accidentally lands on this screen (e.g. from a dev environment with test data) loses all storage silently in a single click.
- **Root cause hypothesis:** Implementation skipped the confirmation step. The destructive action is gated only by the user arriving at the migration wall, which is not equivalent to explicit confirmation.
- **Spec coverage:** REQ-20 — implementation gap.
- **Fix suggestion:** Wrap the reset action in a confirmation dialog (same pattern as `DeleteDialog`): "This will permanently delete all your saved shortcuts. This cannot be undone." with a "Cancel" and "Reset vault" button pair.

---

### FR-9 — Escape in the wizard cancels the wizard even when a tag popover is open
- **Severity:** medium
- **Step/surface:** `/new` — Step 1, tag editing popover
- **Observation:** The `Step1Form` `handleKeyDown` intercepts Escape at the div level and calls `onCancel()` (navigate back to `/`). Radix `Popover` also closes on Escape via its own handler. The sequence is: user opens tag color picker popover, presses Escape to close the popover — but because the event bubbles up to `Step1Form`'s keydown handler, the wizard also cancels. The user loses all entered data (name, description, tags) when intending only to close the picker.
- **Root cause hypothesis:** The wizard's Escape handler does not check whether a popover or sub-dialog is currently open before acting. Radix stops propagation for dialogs (with `e.stopPropagation()` in their Escape handler) but not reliably for popovers in all versions.
- **Spec coverage:** REQ-a11y-1 (Escape cancels wizard) — gap; the spec does not address nesting behavior.
- **Fix suggestion:** Check `e.defaultPrevented` before calling `onCancel()`. Radix components should mark the event as default-prevented when they handle Escape; if `e.defaultPrevented` is true, skip the wizard cancel. Alternatively gate on whether a popover is open by tracking popover open state.

---

### FR-10 — "Press again to re-capture" hint conflicts with the actual UX; focus re-enters capture mode, not a second press
- **Severity:** low
- **Step/surface:** `/new` — Step 2, `KeybindCapture`
- **Observation:** After capturing a keybind, the hint text reads "Press again to re-capture." In reality the widget enters capture mode on `onFocus` (not on a second keypress). So the correct instruction is to click or Tab back to the widget, not to "press again." The current copy implies the user should press a key while the widget already has focus — which would immediately record that key as the new bind, not enter a re-capture mode.
- **Root cause hypothesis:** Copy was written to match an earlier interaction model where a second keypress would toggle re-capture mode, but the implementation uses `onFocus` to enter capture mode.
- **Spec coverage:** REQ-6 — gap in UX copy consistency.
- **Fix suggestion:** Change the hint to "Click or Tab back to re-capture."

---

### FR-11 — Undo after delete navigates to `/$id` but that route renders a Detail Sheet over the list; if the sheet immediately closes the undo is invisible
- **Severity:** medium
- **Step/surface:** `DeleteDialog` → undo toast handler
- **Observation:** After successfully undoing a delete, the code calls `navigate({ to: "/$id", params: { id: shortcut.id } })`. This navigates to the detail sheet of the restored shortcut — a reasonable UX choice. However, if the user happens to click "Undo" just as the 4-second toast auto-dismisses (race condition), `navigate` is called but the shortcut is also gone from `reInsert`'s perspective because `deleteShortcut.mutateAsync` has already settled. Additionally the toast success message "restored" fires but the navigation targets the sheet which may fail to find the shortcut in storage if the race is lost.
- **Root cause hypothesis:** The undo and navigation are sequential in the toast `onClick` handler but there is no guard against stale toast callbacks firing after the dismiss timeout.
- **Spec coverage:** REQ-11 — edge case not specified.
- **Fix suggestion:** Store the deleted shortcut's restore-window state outside the toast and cancel the restore operation (with a "Too late — shortcut is gone" error toast) if invoked after the toast has already auto-dismissed via `onAutoClose`.

---

## Unspec'd scenarios observed

- **Tab order in wizard skips the "+Add tag" button when tags list is empty** — the button exists in the DOM but there are no surrounding focusable elements to create a logical reading flow; a keyboard user Tab-navigating from the description textarea will land on "Cancel" instead of "Add tag" because they are in different DOM subtrees. Candidate REQ for v2: specify explicit Tab order for the tag row.

- **No "last used" sorting or sort control on the list** — a power user who has 20+ shortcuts and uses the command palette regularly will want the list sorted by `lastUsedAt` descending. The list renders in `createdAt` insertion order (as appended to the array) with no sort UI. Candidate REQ for v2: add sort options (by name, by recently used, by created date) URL-synced alongside `q` and `tags`.

- **Command palette has no keyboard shortcut hint visible before opening** — the product never displays "⌘K to search shortcuts" anywhere in the shell (topbar, empty state, or list header). A user who did not read the spec will never discover the palette by keyboard. Candidate REQ for v2: Add a persistent "⌘K" badge in the topbar or a one-line hint in the list header.

- **Tag color input accepts any CSS string, not just OKLCH** — the input `placeholder` says `oklch(0.65 0.2 240)` but `culori.parse()` can parse hex, hsl, rgb, etc. If a user enters `#ff0000` the contrast check passes and the color is accepted, but it is stored and displayed as `#ff0000`, not converted to OKLCH, violating REQ-19. Candidate REQ for v2: normalize the accepted color to OKLCH string before storing, or reject non-OKLCH strings explicitly.

- **Wizard data lost on browser refresh** — if the user is mid-wizard on Step 2 and accidentally hits F5, all entered data (name, description, tags, keybind) is discarded with no warning. Candidate REQ for v2: persist wizard draft to `sessionStorage` and restore on mount.

---

## Delight

- The optimistic mutation pattern is seamless — save in the wizard and the shortcut appears in the list instantly without a loader. The power user never has to wait.
- The sticky "Unsaved changes" bar in the detail sheet is exactly the right pattern: it stays anchored at the bottom of the sheet scroll area without covering content, and the "Discard" + "Save changes" pair is unambiguous.
- Conflict detection on the keybind capture widget is real-time and contextual — the warning appears inline with the name of the conflicting shortcut, saving the user from a frustrating post-save error.
- The 3-step wizard stepper is visually clear: the current step is highlighted, completed steps are visually distinguished, and the direction of slide animation correctly matches forward/back navigation.
- The command palette keyboard footer (`↑↓ Navigate · ↵ Copy · Esc Close`) is a compact, always-visible hint that respects the keyboard-first persona without cluttering the UI.

---

## Journey metrics

- Steps to goal (add shortcut): 4 (open wizard → fill Step 1 → capture keybind Step 2 → review + save Step 3)
- Steps to trigger via palette: 2 (Ctrl+K → type + Enter)
- Steps to delete + undo: 3 (open detail → click delete → confirm → click Undo in toast)
- Errors encountered: 2 critical (FR-4 overwrite no-op, FR-8 reset no confirm), 1 high (FR-5 keybind not editable)
- Screenshots: n/a (code trace — no browser session)
