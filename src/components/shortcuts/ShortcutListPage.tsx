import * as React from "react"
import { Link, useSearch } from "@tanstack/react-router"
import { PlusIcon } from "lucide-react"
import { ICON_STROKE } from "@/lib/icons"
import { useShortcuts } from "@/lib/hooks/useShortcuts"
import { SearchBar } from "./SearchBar"
import { ShortcutGrid } from "./ShortcutGrid"
import { FilterSidebar } from "./FilterSidebar"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Button } from "@/components/ui/button"
import type { Tag } from "@/lib/types"

export function ShortcutListPage() {
  const { data: shortcuts = [], isLoading, isError, refetch } = useShortcuts()
  const { q, tags: selectedTags } = useSearch({ from: "/_app" })

  // Derive unique tags from all shortcuts
  const availableTags = React.useMemo<Tag[]>(() => {
    const seen = new Set<string>()
    const tags: Tag[] = []
    for (const s of shortcuts) {
      for (const tag of s.tags) {
        if (!seen.has(tag.label)) {
          seen.add(tag.label)
          tags.push(tag)
        }
      }
    }
    return tags
  }, [shortcuts])

  // Filter shortcuts by search query + selected tags (OR logic)
  const filtered = React.useMemo(() => {
    let result = shortcuts

    if (q.trim()) {
      const lower = q.trim().toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(lower) ||
          s.tags.some((t) => t.label.toLowerCase().includes(lower))
      )
    }

    if (selectedTags.length > 0) {
      result = result.filter((s) =>
        s.tags.some((t) => selectedTags.includes(t.label))
      )
    }

    return result
  }, [shortcuts, q, selectedTags])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-12">
        <SectionHeader
          label="Keyboard shortcuts"
          title="Find your shortcut"
          action={
            <Button asChild className="min-h-[44px]">
              <Link to="/new">
                <PlusIcon strokeWidth={ICON_STROKE} className="size-4" />
                Add shortcut
              </Link>
            </Button>
          }
        />
      </div>

      {/* Mobile row: search + filter button */}
      <div className="mb-6 flex items-center gap-3 sm:hidden">
        <SearchBar className="flex-1" />
        <FilterSidebar availableTags={availableTags} mobileOnly />
      </div>

      {/* Tablet: filter accordion (search is in topbar) */}
      <div className="hidden sm:block xl:hidden mb-4">
        <FilterSidebar availableTags={availableTags} tabletOnly />
      </div>

      {/* Desktop layout: sidebar + grid */}
      <div className="flex gap-10">
        {/* Sticky desktop sidebar */}
        <FilterSidebar availableTags={availableTags} desktopOnly />

        {/* Grid — spans full width on mobile/tablet */}
        <div className="flex-1 min-w-0">
          <ShortcutGrid
            shortcuts={filtered}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => refetch()}
          />
        </div>
      </div>
    </div>
  )
}
