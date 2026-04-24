import * as React from "react"
import { Link } from "@tanstack/react-router"
import { ShortcutCard } from "./ShortcutCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import type { Shortcut } from "@/lib/types"

interface ShortcutGridProps {
  shortcuts: Shortcut[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

function SkeletonCard() {
  return (
    <div className="rounded-[14px] border border-foreground/9 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-5 w-2/3 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full rounded-full" />
      <Skeleton className="h-4 w-3/4 rounded-full" />
      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  )
}

export function ShortcutGrid({ shortcuts, isLoading, isError, onRetry }: ShortcutGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
        aria-label="Loading shortcuts"
        aria-busy="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-16 text-center"
        role="alert"
      >
        <p className="text-[15px] text-muted-foreground">
          Couldn't load shortcuts
        </p>
        <Button variant="outline" onClick={onRetry} className="min-h-[44px]">
          Retry
        </Button>
      </div>
    )
  }

  if (shortcuts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="text-[15px] text-muted-foreground">No shortcuts yet</p>
        <Button asChild className="min-h-[44px]">
          <Link to="/new">Add your first shortcut</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {shortcuts.map((shortcut) => (
        <ShortcutCard key={shortcut.id} shortcut={shortcut} />
      ))}
    </div>
  )
}
