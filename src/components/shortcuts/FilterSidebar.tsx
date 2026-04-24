import * as React from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { SlidersHorizontalIcon } from "lucide-react"
import { ICON_STROKE } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import type { AppSearch } from "@/lib/types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { Tag } from "@/lib/types"

interface FilterSidebarProps {
  availableTags: Tag[]
  /** Render only the mobile sheet trigger button */
  mobileOnly?: boolean
  /** Render only the tablet accordion bar */
  tabletOnly?: boolean
  /** Render only the desktop sticky aside */
  desktopOnly?: boolean
}

function TagCheckbox({
  tag,
  checked,
  onToggle,
}: {
  tag: Tag
  checked: boolean
  onToggle: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-[7px] min-h-[44px] transition-colors duration-200 hover:bg-muted">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onToggle}
        aria-label={`Filter by ${tag.label}`}
      />
      <span
        className="size-3 shrink-0 rounded-[2px] border border-foreground/38 transition-colors duration-200"
        style={checked ? { backgroundColor: tag.color, borderColor: tag.color } : undefined}
        aria-hidden="true"
      />
      <span className="text-[15px] font-light text-foreground">{tag.label}</span>
    </label>
  )
}

function TagFilterList({
  tags,
  selectedTags,
  onToggle,
}: {
  tags: Tag[]
  selectedTags: string[]
  onToggle: (label: string) => void
}) {
  if (tags.length === 0) {
    return (
      <p className="text-[11px] text-muted-foreground px-3 py-2">
        No tags yet
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-0.5">
      {tags.map((tag) => (
        <TagCheckbox
          key={tag.label}
          tag={tag}
          checked={selectedTags.includes(tag.label)}
          onToggle={() => onToggle(tag.label)}
        />
      ))}
    </div>
  )
}

export function FilterSidebar({
  availableTags,
  mobileOnly,
  tabletOnly,
  desktopOnly,
}: FilterSidebarProps) {
  const navigate = useNavigate()
  // strict: false — component always renders within /_app context
  const { tags: selectedTags } = useSearch({ strict: false }) as AppSearch
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const activeCount = selectedTags.length

  function handleToggle(label: string) {
    navigate({
      to: "/",
      search: (rawPrev) => {
        const prev = rawPrev as AppSearch
        return {
          ...prev,
          tags: prev.tags.includes(label)
            ? prev.tags.filter((t) => t !== label)
            : [...prev.tags, label],
        }
      },
      replace: true,
      resetScroll: false,
    })
  }

  function handleClearAll() {
    navigate({
      to: "/",
      search: (rawPrev) => ({ ...(rawPrev as AppSearch), tags: [] }),
      replace: true,
      resetScroll: false,
    })
  }

  // Mobile: Sheet trigger button only
  if (mobileOnly) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="shrink-0 min-h-[44px] min-w-[44px] gap-2"
            aria-label="Open tag filter"
          >
            <SlidersHorizontalIcon strokeWidth={ICON_STROKE} className="size-4" />
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary text-[10px] text-primary-foreground font-semibold">
                {activeCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-[14px] max-h-[70dvh]">
          <SheetHeader>
            <SheetTitle>Filter by tag</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto px-4 pb-6">
            <TagFilterList
              tags={availableTags}
              selectedTags={selectedTags}
              onToggle={handleToggle}
            />
            {activeCount > 0 && (
              <Button
                variant="ghost"
                className="mt-3 w-full"
                onClick={() => {
                  handleClearAll()
                  setMobileOpen(false)
                }}
              >
                Clear all
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  // Tablet: collapsible Accordion bar
  if (tabletOnly) {
    return (
      <div aria-label="Filter by tag">
        <Accordion type="single" collapsible>
          <AccordionItem value="tags">
            <AccordionTrigger className="px-0 text-[15px]">
              <span className="flex items-center gap-2">
                <SlidersHorizontalIcon strokeWidth={ICON_STROKE} className="size-4" />
                Filter by tag
                {activeCount > 0 && (
                  <span className="inline-flex items-center justify-center size-5 rounded-full bg-primary text-[10px] text-primary-foreground font-semibold">
                    {activeCount}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pt-2 pb-1">
                <TagFilterList
                  tags={availableTags}
                  selectedTags={selectedTags}
                  onToggle={handleToggle}
                />
                {activeCount > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="mt-2 text-[11px] text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full px-3 py-1 min-h-[44px]"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }

  // Desktop: sticky aside
  if (desktopOnly) {
    return (
      <aside
        className="hidden xl:block sticky top-6 w-[200px] shrink-0 self-start"
        aria-label="Filter by tag"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-muted-foreground">
            Tags
          </p>
          {activeCount > 0 && (
            <button
              onClick={handleClearAll}
              className="text-[11px] text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full px-1 min-h-[44px]"
            >
              Clear
            </button>
          )}
        </div>
        <TagFilterList
          tags={availableTags}
          selectedTags={selectedTags}
          onToggle={handleToggle}
        />
      </aside>
    )
  }

  return null
}
