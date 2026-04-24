import * as React from "react"
import { toast } from "sonner"
import { checkContrast } from "@/lib/contrast"
import { useShortcuts, useUpdateLastUsed } from "@/lib/hooks/useShortcuts"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Shortcut } from "@/lib/types"

function KeybindPill({ value }: { value: string }) {
  return (
    <span className="font-mono text-[11px] bg-border px-[0.5rem] py-[0.25rem] rounded-full shrink-0">
      {value}
    </span>
  )
}

interface PaletteContentProps {
  shortcuts: Shortcut[]
  onSelect: (shortcut: Shortcut) => void
}

function PaletteContent({ shortcuts, onSelect }: PaletteContentProps) {
  return (
    <>
      <Command className="rounded-[14px]! border-none! shadow-none! bg-transparent!">
        <CommandInput
          placeholder="Search shortcuts…"
          aria-label="Search shortcuts"
        />
        <CommandList>
          <CommandEmpty>No shortcuts found.</CommandEmpty>
          <CommandGroup heading="Shortcuts">
            {shortcuts.map((shortcut) => (
              <CommandItem
                key={shortcut.id}
                value={`${shortcut.name} ${shortcut.tags.map((t) => t.label).join(" ")}`}
                onSelect={() => onSelect(shortcut)}
                className="flex items-center justify-between"
              >
                <span className="flex-1 truncate">{shortcut.name}</span>
                {shortcut.tags.length > 0 && (
                  <span className="mx-2 flex gap-1">
                    {shortcut.tags.slice(0, 2).map((tag) => {
                      const { onDark } = checkContrast(tag.color)
                      const tagTextColor = onDark >= 4.5
                        ? "oklch(0.08 0.003 90)"
                        : "oklch(1 0 0)"
                      return (
                        <span
                          key={tag.label}
                          className="inline-flex items-center rounded-full px-[6px] py-[2px] text-[9px]"
                          style={{ backgroundColor: tag.color, color: tagTextColor }}
                        >
                          {tag.label}
                        </span>
                      )
                    })}
                  </span>
                )}
                <KeybindPill value={shortcut.key} />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>

      {/* Footer */}
      <div className="text-[11px] text-muted-foreground border-t border-border px-4 py-2 select-none">
        ↑↓ Navigate · ↵ Copy · Esc Close
      </div>
    </>
  )
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const { data: shortcuts = [] } = useShortcuts()
  const updateLastUsed = useUpdateLastUsed()
  const previousFocusRef = React.useRef<Element | null>(null)

  // Detect mobile
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Global ⌘K / Ctrl+K listener
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isK = e.key === "k" || e.key === "K"
      const isTrigger = (e.metaKey || e.ctrlKey) && isK

      if (!isTrigger) return

      // Suppress when alertdialog is open
      if (document.querySelector('[role="alertdialog"]')) return

      e.preventDefault()
      previousFocusRef.current = document.activeElement

      setOpen((prev) => !prev)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Restore focus on close
  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen && previousFocusRef.current instanceof HTMLElement) {
      previousFocusRef.current.focus()
    }
  }

  async function handleSelect(shortcut: Shortcut) {
    handleOpenChange(false)

    try {
      if (typeof navigator.clipboard?.writeText === "function") {
        await navigator.clipboard.writeText(shortcut.key)

        const announceEl = document.getElementById("a11y-announce")
        if (announceEl) announceEl.textContent = `Copied ${shortcut.key}.`

        toast.success("Copied!")
      } else {
        toast.error(`Couldn't copy — use ${shortcut.key} manually.`)
      }
    } catch {
      toast.error(`Couldn't copy — use ${shortcut.key} manually.`)
    }

    // Update lastUsedAt regardless of clipboard success
    updateLastUsed.mutate(shortcut.id)
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="bottom" className="rounded-t-[14px] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Command palette</SheetTitle>
          </SheetHeader>
          <PaletteContent shortcuts={shortcuts} onSelect={handleSelect} />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-1/3 translate-y-0 max-w-[560px] bg-popover rounded-[14px]! p-0 overflow-hidden"
        style={{
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.07)",
        }}
        aria-label="Command palette"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Command palette</DialogTitle>
          <DialogDescription>
            Search shortcuts and copy keybinds to clipboard.
          </DialogDescription>
        </DialogHeader>
        <PaletteContent shortcuts={shortcuts} onSelect={handleSelect} />
      </DialogContent>
    </Dialog>
  )
}
