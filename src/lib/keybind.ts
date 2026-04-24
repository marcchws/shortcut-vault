import type { Shortcut } from "./types"

const MODIFIER_KEYS = new Set([
  "Control",
  "Alt",
  "Meta",
  "Shift",
  "CapsLock",
  "NumLock",
  "ScrollLock",
  "Fn",
  "FnLock",
  "Hyper",
  "Super",
  "Symbol",
  "SymbolLock",
])

/** Canonical modifier order: Control → Alt → Meta → Shift */
const MODIFIER_ORDER = ["Control", "Alt", "Meta", "Shift"] as const

/**
 * Converts a KeyboardEvent into a canonical modifier string.
 * Returns empty string if only modifier keys are pressed.
 */
export function normalizeKey(e: KeyboardEvent): string {
  if (MODIFIER_KEYS.has(e.key)) return ""

  const modifiers: string[] = []
  if (e.ctrlKey) modifiers.push("Control")
  if (e.altKey) modifiers.push("Alt")
  if (e.metaKey) modifiers.push("Meta")
  if (e.shiftKey) modifiers.push("Shift")

  // Sort modifiers to canonical order
  modifiers.sort(
    (a, b) =>
      MODIFIER_ORDER.indexOf(a as (typeof MODIFIER_ORDER)[number]) -
      MODIFIER_ORDER.indexOf(b as (typeof MODIFIER_ORDER)[number])
  )

  return [...modifiers, e.key].join("+")
}

/**
 * Checks if a key string conflicts with any existing shortcut.
 * Optionally excludes a shortcut by id (for edit flows).
 */
export function checkConflict(
  key: string,
  shortcuts: Shortcut[],
  excludeId?: string
): Shortcut | undefined {
  if (!key) return undefined
  return shortcuts.find(
    (s) => s.key === key && s.id !== excludeId
  )
}
