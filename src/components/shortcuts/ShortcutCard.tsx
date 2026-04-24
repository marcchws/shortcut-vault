import * as React from "react"
import { Link } from "@tanstack/react-router"
import { Card, CardContent } from "@/components/ui/card"
import { checkContrast } from "@/lib/contrast"
import type { Shortcut } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ShortcutCardProps {
  shortcut: Shortcut
  className?: string
}

function KeybindPill({ value, className }: { value: string; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] bg-border px-[0.5rem] py-[0.25rem] rounded-full shrink-0 text-foreground",
        className
      )}
    >
      {value}
    </span>
  )
}

function TagChip({ label, color }: { label: string; color: string }) {
  const { onDark } = checkContrast(color)
  const textColor = onDark >= 4.5 ? "oklch(0.08 0.003 90)" : "oklch(1 0 0)"
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-[11px] py-[4px] text-[11px] font-light"
      style={{ backgroundColor: color, color: textColor }}
    >
      {label}
    </span>
  )
}

function formatLastUsed(lastUsedAt: string | null): string | null {
  if (!lastUsedAt) return null
  const date = new Date(lastUsedAt)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Used today"
  if (diffDays === 1) return "Used yesterday"
  if (diffDays < 7) return `Used ${diffDays}d ago`
  return `Used ${date.toLocaleDateString()}`
}

export function ShortcutCard({ shortcut, className }: ShortcutCardProps) {
  const lastUsedLabel = formatLastUsed(shortcut.lastUsedAt)

  return (
    <Link
      to="/$id"
      params={{ id: shortcut.id }}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[14px]"
    >
      <Card
        className={cn(
          "min-h-[44px] cursor-pointer p-0",
          className
        )}
      >
        <CardContent className="px-4 py-4">
          {/* Top row: name + keybind pill */}
          <div className="flex items-start justify-between gap-3">
            <span className="text-[15px] font-semibold leading-snug text-foreground line-clamp-2">
              {shortcut.name}
            </span>
            {shortcut.key && <KeybindPill value={shortcut.key} />}
          </div>

          {/* Description */}
          {shortcut.description && (
            <p className="mt-1 text-[15px] font-light text-muted-foreground line-clamp-2">
              {shortcut.description}
            </p>
          )}

          {/* Tags */}
          {shortcut.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {shortcut.tags.map((tag) => (
                <TagChip key={tag.label} label={tag.label} color={tag.color} />
              ))}
            </div>
          )}

          {/* Last used */}
          {lastUsedLabel && (
            <p className="mt-2 text-[11px] text-muted-foreground">
              {lastUsedLabel}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
