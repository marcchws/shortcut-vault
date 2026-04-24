import { parse, wcagContrast } from "culori"

const WHITE = parse("#ffffff")!
const NEAR_BLACK = parse("#141414")!

export type ContrastResult = {
  onWhite: number
  onDark: number
  passes: boolean
}

/**
 * Computes WCAG contrast ratio of an OKLCH color string against white and
 * near-black. `passes` is true if either ratio ≥ 4.5 (WCAG AA text).
 */
export function checkContrast(oklchColor: string): ContrastResult {
  const color = parse(oklchColor)
  if (!color) {
    return { onWhite: 0, onDark: 0, passes: false }
  }

  const onWhite = wcagContrast(color, WHITE)
  const onDark = wcagContrast(color, NEAR_BLACK)
  const passes = onWhite >= 4.5 || onDark >= 4.5

  return { onWhite, onDark, passes }
}
