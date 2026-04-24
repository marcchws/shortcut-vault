# Component Catalogue

> Read this before creating any new component.
> Rule: if what you need exists here, use it. Extend before creating new.

## Dimensional system
See `.specs/design-system/identity.md` — padding scale, font system, border system, radius system.

Key rules:
- **Padding**: interactive compact `4px 11px`, interactive default `7px 15px`, container `40px 44px`
- **Radius**: pill `9999px` (all standalone interactive), container `14px` (cards, dialogs, inputs)
- **Border**: always translucent — `rgba(fg, 0.09)` rest, `rgba(fg, 0.38)` hover/focus
- **Font sizes**: 72px display / 30px heading / 15px body / 11px UI / 9–10px micro — nothing between 11px and 15px
- **Font weights**: 300 body prose, 400 nav/general, 600 identifiers, 800 display/featured
- **Motion**: 200ms fast (hover), 400ms base (state), 900ms slow (panel), 450ms nav-morph

## Primitives (src/components/ui/)

| Component | File | Key variants | Notes |
|-----------|------|-------------|-------|
| Button | `button.tsx` | default, outline, ghost, secondary, destructive, link | Rounded-full, 11px uppercase, 0.08em tracking |
| Badge | `badge.tsx` | default, outline, secondary, destructive, ghost, link | Rounded-full, 10px uppercase, 0.1em tracking, muted-foreground |
| Input | `input.tsx` | — | 15px body weight-300, 14px radius, translucent border, ring-2 focus |
| Label | `label.tsx` | — | 11px uppercase, 0.1em tracking, muted-foreground |
| Card | `card.tsx` | default, sm | 14px radius, translucent border, 400ms hover border, no rest shadow |
| Separator | `separator.tsx` | horizontal (default), vertical | bg-foreground/9 (alpha 0.09) |
| Dialog | `dialog.tsx` | — | 14px radius, elevated shadow 0 4px 24px, translucent border |
| Command | `command.tsx` | — | 14px radius, overlay shadow, 15px input |
| Popover | `popover.tsx` | — | Default shadcn, apply container radius at call site |
| Accordion | `accordion.tsx` | — | 15px body weight-300, 14px container inset, border-b separator |
| Skeleton | `skeleton.tsx` | — | 14px radius, animate-pulse, bg-muted |
| Tooltip | `tooltip.tsx` | — | Rounded-full, 11px uppercase, 0.08em tracking, no arrow |
| Scroll Area | `scroll-area.tsx` | — | Default shadcn |
| Sheet | `sheet.tsx` | right (default), left, top, bottom | Slide-in panel; no Dialog/Sheet for secondary nav |
| Avatar | `avatar.tsx` | — | 50% radius (dot/avatar rule) |
| Sonner (Toast) | `sonner.tsx` | — | Bottom-right, 4s, all icons at ICON_STROKE=1.5 |

## Shared (src/components/shared/)

| Component | File | Props | When to use |
|-----------|------|-------|-------------|
| SectionHeader | `SectionHeader.tsx` | `label`, `title`, `action?`, `className?` | Every section heading — label (11px muted uppercase) + Syne 800 display title + optional action slot |
| PillBadge | `PillBadge.tsx` | `variant` (available/default/wip), `children`, `className?` | Status indicator with animated dot — available (green), wip (amber), default (muted) |
| KbdKey | `KbdKey.tsx` | `children`, `className?` | Keyboard shortcut glyph — 10px monospace, rounded-full, translucent border |
| MetricPair | `MetricPair.tsx` | `value`, `label`, `className?` | Numeric metric + descriptor — 30px Inter 800 value, 11px label max-w-130px |
| EmptyState | `EmptyState.tsx` | `heading`, `cta?` ({label, onClick}), `className?` | Zero-content state — single line + one CTA pill; no illustration |
| FilterBar | `FilterBar.tsx` | `searchValue?`, `onSearchChange?`, `tags?`, `onTagToggle?`, `searchPlaceholder?`, `className?` | Search input + tag row for primary shortcut list |

## Layout (src/components/layout/)

| Component | File | Description |
|-----------|------|-------------|
| Topbar | `Topbar.tsx` | Fixed top nav. Logo (Syne 800 15px), nav links (hidden mobile), theme toggle pill. Morphs to floating 56%-wide pill (rounded-full, blur backdrop, elevated shadow) on scroll >60px via 450ms nav-morph transition. |
| Shell | `Shell.tsx` | Root layout wrapper. Renders `<Topbar>` + `<main className="pt-16">`. Wraps all route content. |
