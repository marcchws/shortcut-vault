import * as React from "react"
import { cn } from "@/lib/utils"

type PillBadgeVariant = "available" | "default" | "wip"

interface PillBadgeProps {
  variant?: PillBadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<PillBadgeVariant, string> = {
  available:
    "border-success/40 text-success bg-success/10",
  default:
    "border-foreground/9 text-muted-foreground bg-transparent",
  wip:
    "border-warning/40 text-warning bg-warning/10",
}

const dotStyles: Record<PillBadgeVariant, string> = {
  available: "bg-success",
  default: "bg-muted-foreground",
  wip: "bg-warning",
}

/**
 * PillBadge — status indicator with animated dot.
 * Variants: available (green), default (muted), wip (amber)
 * Identity: 11px Inter 600 uppercase tracking-wide, 7px 14px, rounded-full, border translucent
 */
export function PillBadge({ variant = "default", children, className }: PillBadgeProps) {
  const showBlink = variant === "available" || variant === "wip"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-[6px] rounded-full border px-[14px] py-[7px] text-[11px] font-semibold tracking-[0.08em] uppercase leading-none",
        variantStyles[variant],
        className
      )}
    >
      <span
        className={cn(
          "inline-block size-[6px] shrink-0 rounded-full",
          dotStyles[variant],
          showBlink && "animate-pulse"
        )}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}
