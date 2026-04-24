import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label: string
  title: string
  action?: React.ReactNode
  className?: string
}

/**
 * SectionHeader — label (11px uppercase muted) + title (Syne 800 display) + optional action slot.
 * Identity: display 72px clamp, Syne 800, letter-spacing -0.045em, line-height 0.88
 */
export function SectionHeader({ label, title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="flex flex-col gap-3">
        <span
          className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground leading-none"
          aria-label={label}
        >
          {label}
        </span>
        <h2
          className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-foreground"
        >
          {title}
        </h2>
      </div>
      {action && (
        <div className="shrink-0" aria-label="Section action">
          {action}
        </div>
      )}
    </div>
  )
}
