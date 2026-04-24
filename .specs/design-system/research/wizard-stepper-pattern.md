# Wizard & Stepper Pattern

**Source:** https://refero.design/pages/c7c457aa-3e03-4314-b446-6d9567d0c271 (Contra — Service Creation Wizard)
**Surface:** Creation flow (multi-step form with progress)
**Platform:** Web
**Vertical:** Creator/freelance marketplace (service/product creation wizard)

## Why it matches
Shortcut-vault has a 3-step creation wizard (/shortcuts/new) for adding shortcuts: (1) name + description, (2) keybind capture, (3) review + save. Contra's service creation wizard demonstrates how to structure multi-step forms with progress indication, validation, navigation, and modal/card-based UX.

## Extracted signals

**Progress indicator & visual structure:**
- Horizontal progress bar or step indicator at the top of the card/modal
- 5 stages shown: Overview, Deliverables, Description, Price, Image
- Completed steps marked with green check icon (#22b573 or brand accent)
- Active step marked with filled circle and step label/number
- Future steps marked with empty circle (lighter gray)
- Step labels are centered above circles or inline; small font (~12px)
- Progress bar height ~48–56px (includes spacing above/below)

**Card layout:**
- Wizard content wrapped in a white card with rounded corners (8px radius) and subtle shadow
- Card has consistent padding (24–32px)
- Card background: #ffffff
- Card used on desktop; on mobile, can convert to sheet or full-screen form

**Form content per step:**
- Step heading (bold, ~18–20px, dark gray) clearly states the current task
  - Example: "How do you want to set up your pricing?"
- Help text below heading (regular, ~14px, gray) provides guidance
- Form inputs/controls below heading (centered or left-aligned)
  - Example: radio buttons, input fields, dropdowns, text areas
- Input styling: light gray background (#f3f4fb or #f6f7f7), rounded corners, no heavy border

**Navigation:**
- Continue / Next button (filled, accent color, e.g., #1e2228 on light or brand color) at bottom right
- Button text: "Next" or "Continue" or "Review"
- Back button (ghost/outline) on left (if not first step)
- Button is disabled until required fields are filled (visual feedback: lower opacity)
- Skip button (optional) if step is not mandatory
- Button spacing: horizontal alignment at bottom of card, 16–24px gap between buttons

**Input validation:**
- Required fields marked with * or required label
- Error message appears inline below input (red text, ~12–13px)
- Error state: red border on input (or red shadow) and error icon
- Error message uses accessible color (>3:1 contrast minimum)
- Success state: green checkmark or subtle green border (optional)

**Mobile responsiveness:**
- On mobile: full-screen form or sheet modal with single column layout
- Back/Next buttons stack vertically or reflow if not enough space
- Input fields are full-width with padding
- Progress bar remains at top (sticky or fixed)

**Motion & transitions:**
- Step transition: fade or slide (subtle, respects prefers-reduced-motion)
- Form inputs should auto-focus on step load (accessibility + UX)
- Error messages fade in (not instant jarring)

## Adopt

**Pattern:** Horizontal step indicator + card-based form + progressive validation.

**Tokens to define:**
- `wizard-progress-height` — height of step bar (~48–56px)
- `wizard-card-padding` — internal padding of form card (24–32px)
- `wizard-heading` — step title typography (bold, ~18–20px, use heading-5 token)
- `wizard-help-text` — guidance text (regular, ~14px, gray, use body-secondary token)
- `step-active` — filled circle or highlight color (use primary accent token)
- `step-completed` — check icon color (use success token, e.g., green)
- `step-inactive` — empty circle / future step (use secondary token, light gray)

**Primitives:**
- Stepper / progress indicator component (horizontal, with steps array)
- Wizard container (card or sheet, configurable)
- Form control compound (label + input + error message)
- Button group (Back / Next / Skip, horizontal or vertical)
- Validation state indicator (error icon, error text, success indicator)

**Interaction states:**
- Unvisited step (inactive, not clickable, or clickable but with warning)
- Active step (highlight, editable)
- Completed step (check, grayed out or clickable to revisit)
- Disabled button (lower opacity, not clickable, cursor disabled)
- Error state (red border, error text, cannot proceed until fixed)

**Mobile considerations:**
- Stepper may convert to vertical layout (column) or collapse to step count (e.g., "Step 2 of 3")
- Buttons should have touch-friendly sizing (min 44×44px)
- Form inputs full-width
- Sheet modal may have header with step count + close button

**Focus areas:**
- Auto-focus first input on step load (aria-autofocus or useEffect with ref.focus())
- Tab navigation: must flow through all controls, then to Next button
- Error announcements: aria-live="polite" for error messages
- Step indicator must announce current step (aria-current="step")
- Back button must not lose data (store in local state or cache)
- Keyboard support: Enter to submit (if only one button), Escape to cancel

## Notes
- Shortcut-vault's 3-step wizard maps: (1) Overview → name + description, (2) Deliverables → keybind capture, (3) Review → confirm + save
- Each step should be validatable independently; allow Back without losing data
- Keybind capture (step 2) is unique; consider real-time keyboard event listener (onKeyDown) to capture combo
- Consider optimistic save on last step: if user closes or navigates away mid-flow, save draft to localStorage

