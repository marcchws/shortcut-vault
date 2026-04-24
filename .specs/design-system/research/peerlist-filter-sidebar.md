# Peerlist — Filter Sidebar & Search Results

**Source:** https://refero.design/pages/5b05dfc1-a1fb-42fd-b2a5-8dec1b21d885
**Surface:** Primary surface — shortcut list/grid with search/filter bar; collection/tag sidebar
**Platform:** Web (Peerlist jobs)
**Vertical:** Productivity / professional network (job search with faceted filtering)

## Why it matches
Peerlist demonstrates a mature filter-and-browse pattern critical to shortcut-vault. The left-hand sidebar with faceted controls (Roles, Job type, Skills, Experience, Country) directly informs the tag-and-filter sidebar for shortcut-vault's collection navigation. The visual separation, label styling, and applied-filter chips are high-fidelity patterns for managing keyboard shortcuts by app/tool collections and tags.

## Extracted signals

**Layout & sidebar structure:**
- Fixed left sidebar (~20% width) with persistent vertical navigation
- Sidebar contains: filter category labels, select/dropdown/checkbox controls, applied filter chips, and Clear button
- Main content area (center-right) shows results list/cards with refresh on filter change
- Sidebar is scrollable if many filters exist; main area scrolls independently

**Filter categories & controls:**
- Category label (e.g., "Roles", "Job type") in bold, medium weight, dark gray (#373839 or #1b1c1d)
- Below label: dropdown or multi-select control (Roles dropdown shows max N items with load-more)
- Checkboxes for discrete options (Job type: Full-time, Part-time, etc.)
- Color used sparingly (accent green #1fa74d for selected checkboxes or highlights)

**Applied filters & state:**
- Above results: horizontal row of applied filter chips (removable, clickable X)
- Chip style: light gray background (#f6f7f7) with small X icon and dark text
- Chip count visible (e.g., "Product Designer ×" shows active filter)
- Clear All button (ghost style) to reset all filters in one action

**Results & cards:**
- Job cards (or shortcut cards in vault's case) show: icon/avatar, title, metadata (company, location, tags), action CTA
- Card grid is responsive: single column on mobile, multi-column on desktop
- Card background: white or very light gray (#fcfcfc or #ffffff)
- Card border: subtle light gray (#e0e0e0 or similar)
- Hover state: shadow lift or background tint, not bold

**Typography & hierarchy:**
- Job title (or shortcut name) in bold, ~16–18px, dark (#1b1c1d)
- Metadata (company, location, tags) in regular, ~14px, gray (#878b8f or #6778f9 for accent)
- No clutter; each card shows only essential info to support quick scanning

**Interaction model:**
- Click filter dropdown to open multi-select or radio list
- Select option updates main content instantly (if real-time) or with Apply button
- Applied filters show as chips; clicking chip or X removes it
- No modal required; filters are persistent and always visible

**Mobile responsiveness:**
- Sidebar converts to drawer or collapses to icon-only on small screens
- Filter chips reflow to new rows as needed
- Cards stack single-column on mobile (full width with padding)

## Adopt

**Pattern:** Left-hand persistent filter sidebar with faceted controls, applied filter chips, and instant result refresh.

**Tokens to define:**
- `sidebar-bg` — background color (#f6f7f7, use light surface token)
- `sidebar-label` — category label style (bold, ~14px, use label token)
- `filter-control` — dropdown/checkbox style (padding, border radius, use control token)
- `chip-bg` — applied filter chip background (light gray, use secondary surface token)
- `chip-text` — chip label and close icon color (dark, inherit from primary text)
- `card-bg` — result card background (#ffffff or #fcfcfc)
- `card-border` — subtle line (#e0e0e0, use border token)
- `card-hover` — hover state (shadow lift or subtle background, use hover state token)

**Primitives:**
- Sidebar container (sticky, scrollable content)
- Filter category group (label + control compound)
- Dropdown / multi-select (shadcn `Select` or `Popover` + checkbox list)
- Checkbox (shadcn `Checkbox` with label)
- Chip / badge component (removable with X icon)
- Clear All button (ghost style)
- Card component (responsive grid)

**Focus areas:**
- Filter state updates must be announced (aria-live="assertive") for screen readers
- Checkbox labels linked via htmlFor to input id
- Applied chips must be focusable and removable via keyboard (Delete key)
- Sidebar must be accessible on mobile (drawer with focus trap, Escape to close)
- Filter labels should use smaller font than headings (visual hierarchy)

## Notes
- Peerlist's job filters directly map to shortcut-vault's tag-based sidebar
- Real-time filtering (no Apply button) is smoother; if performance allows, prefer instant updates
- Filter categories (Roles → App/Tool, Job type → Category, Skills → Tags, Experience → Not applicable) need translation to shortcut domain
- Chip count and clear affordances are critical for transparency and user control

