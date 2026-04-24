import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { PillBadge } from "./PillBadge"

interface FilterTag {
  id: string
  label: string
  active?: boolean
}

interface FilterBarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  tags?: FilterTag[]
  onTagToggle?: (id: string) => void
  searchPlaceholder?: string
  className?: string
}

/**
 * FilterBar — full-width search input + scrollable tag row.
 * Identity: 15px font weight 300 input, PillBadge filters below.
 */
export function FilterBar({
  searchValue = "",
  onSearchChange,
  tags = [],
  onTagToggle,
  searchPlaceholder = "Search shortcuts...",
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Input
        type="search"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={searchPlaceholder}
        aria-label="Search shortcuts"
        className="w-full"
      />
      {tags.length > 0 && (
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by tag"
        >
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => onTagToggle?.(tag.id)}
              aria-pressed={tag.active}
              className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
            >
              <PillBadge
                variant={tag.active ? "available" : "default"}
              >
                {tag.label}
              </PillBadge>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
