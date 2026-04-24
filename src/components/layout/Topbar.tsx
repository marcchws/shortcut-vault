import * as React from "react"
import { Link, useMatch } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { SearchBar } from "@/components/shortcuts/SearchBar"
import type { AppSearch } from "@/lib/types"

/**
 * Topbar — fixed top nav with scroll morph to floating pill.
 * Identity:
 *  - Logo: Syne 800, 15px, letter-spacing -0.02em
 *  - Nav links: 12px 400 uppercase tracking-widest muted-foreground, hidden on mobile
 *  - Theme toggle: 7px 15px, 11px uppercase, border rounded-full
 *  - Scroll >60px: morphs to 56%-wide floating pill
 *    bg rgba(bg,0.80), backdrop-blur(20px), shadow, border-radius 9999px
 *    transition 450ms cubic-bezier(0.4,0,0.2,1)
 */
export function Topbar() {
  const isAppRoute = useMatch({ from: "/_app", shouldThrow: false })
  const [scrolled, setScrolled] = React.useState(false)
  const [dark, setDark] = React.useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  )

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center",
        "transition-[padding,top] duration-[450ms] [cubic-bezier(0.4,0,0.2,1)]",
        scrolled ? "top-3 px-[22%]" : "top-0 px-0"
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
    >
      <nav
        aria-label="Main navigation"
        className={cn(
          "flex w-full items-center justify-between px-6",
          "transition-all duration-[450ms]",
          scrolled
            ? [
                "rounded-full border border-foreground/9 py-3",
                "bg-background/80 backdrop-blur-[20px]",
                "shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
              ].join(" ")
            : "h-16 bg-transparent"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
      >
        {/* Logo */}
        <Link
          to="/"
          search={(prev) => prev as AppSearch}
          className="font-display text-[15px] font-extrabold leading-none tracking-[-0.02em] text-foreground no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full px-1"
          aria-label="Shortcut Vault home"
        >
          Vault
        </Link>

        {/* Search bar — center slot, only on _app routes, hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-sm mx-6">
          {isAppRoute && <SearchBar className="w-full" />}
        </div>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-foreground/9 px-[15px] py-[7px] text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-[border-color] duration-200 hover:border-foreground/38 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </nav>
    </div>
  )
}
