import * as React from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { SearchIcon } from "lucide-react"
import { ICON_STROKE } from "@/lib/icons"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  const navigate = useNavigate({ from: "/_app" })
  const { q } = useSearch({ from: "/_app" })

  const [localValue, setLocalValue] = React.useState(q)
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync localValue when URL q changes externally (e.g. back/forward)
  React.useEffect(() => {
    setLocalValue(q)
  }, [q])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setLocalValue(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      navigate({
        to: "/",
        search: (prev) => ({ ...prev, q: value }),
        replace: true,
        resetScroll: false,
      })
    }, 300)
  }

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className={cn("relative", className)}>
      <SearchIcon
        strokeWidth={ICON_STROKE}
        className="pointer-events-none absolute top-1/2 left-[15px] size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        type="search"
        aria-label="Search shortcuts"
        placeholder="Search shortcuts…"
        value={localValue}
        onChange={handleChange}
        className="w-full rounded-full border border-foreground/9 bg-transparent py-[7px] pr-[15px] pl-[40px] text-[15px] font-light leading-[1.65] text-foreground transition-colors duration-200 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  )
}
