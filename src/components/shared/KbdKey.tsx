import * as React from "react"
import { cn } from "@/lib/utils"

interface KbdKeyProps {
  children: React.ReactNode
  className?: string
}

/**
 * KbdKey — keyboard shortcut glyph display.
 * Identity: 9–10px ui-monospace, rounded-full (micro pill rule), border translucent,
 * padding 4px 11px (interactive compact scale)
 */
export function KbdKey({ children, className }: KbdKeyProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-foreground/9 bg-muted px-[11px] py-[4px] font-mono text-[10px] leading-none text-muted-foreground",
        className
      )}
    >
      {children}
    </kbd>
  )
}
