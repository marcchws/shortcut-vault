import * as React from "react"
import { normalizeKey, checkConflict } from "@/lib/keybind"
import { Button } from "@/components/ui/button"
import type { Shortcut } from "@/lib/types"
import { cn } from "@/lib/utils"

interface KeybindCaptureProps {
  value: string
  onChange: (value: string) => void
  existingShortcuts: Shortcut[]
  /** Exclude this shortcut from conflict check (for edit flows) */
  excludeId?: string
  /** Error shown when step advance is attempted with empty value */
  showRequiredError?: boolean
  /** Called when the user acknowledges overwriting a conflict */
  onOverwriteAcknowledged?: (ack: boolean) => void
}

export function KeybindCapture({
  value,
  onChange,
  existingShortcuts,
  excludeId,
  showRequiredError,
  onOverwriteAcknowledged,
}: KeybindCaptureProps) {
  const [capturing, setCapturing] = React.useState(false)
  const [overwriteAcknowledged, setOverwriteAcknowledged] = React.useState(false)
  const [modifierHint, setModifierHint] = React.useState(false)
  const modifierHintTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const ref = React.useRef<HTMLDivElement>(null)

  const conflict = value
    ? checkConflict(value, existingShortcuts, excludeId)
    : undefined

  // Reset overwrite acknowledgement whenever a new key is captured
  React.useEffect(() => {
    setOverwriteAcknowledged(false)
    onOverwriteAcknowledged?.(false)
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleKeyDown(e: React.KeyboardEvent) {
    // Don't intercept Tab (navigation) or Escape (cancel wizard)
    if (e.key === "Tab") return
    if (e.key === "Escape") {
      setCapturing(false)
      ref.current?.blur()
      return
    }

    e.preventDefault()
    const normalized = normalizeKey(e.nativeEvent)
    if (normalized) {
      onChange(normalized)
      setCapturing(false)
      // Clear any modifier-only hint on successful capture
      if (modifierHintTimer.current) clearTimeout(modifierHintTimer.current)
      setModifierHint(false)
    } else {
      // Modifier-only key press — show transient inline hint
      setModifierHint(true)
      if (modifierHintTimer.current) clearTimeout(modifierHintTimer.current)
      modifierHintTimer.current = setTimeout(() => setModifierHint(false), 2000)
    }
  }

  function handleClick() {
    setCapturing(true)
    ref.current?.focus()
  }

  function handleBlur() {
    setCapturing(false)
  }

  function handleOverwrite() {
    if (!conflict) return
    setOverwriteAcknowledged(true)
    onOverwriteAcknowledged?.(true)
  }

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (modifierHintTimer.current) clearTimeout(modifierHintTimer.current)
    }
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={value ? `Keybind: ${value}. Click or Tab back to re-capture.` : "Press to capture keybind"}
        aria-live="polite"
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onFocus={() => setCapturing(true)}
        onBlur={handleBlur}
        className={cn(
          "flex min-h-[64px] min-w-[44px] cursor-pointer select-none items-center justify-center rounded-[14px] border transition-all duration-200 outline-none",
          capturing
            ? "ring-2 ring-ring border-ring bg-muted"
            : "border-foreground/9 bg-muted/50 hover:border-foreground/38",
          "focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        {value ? (
          <span className="font-mono text-[15px] text-foreground">{value}</span>
        ) : (
          <span className="text-[15px] font-light text-muted-foreground">
            {capturing ? "Press a key combination…" : "Click to capture a keybind"}
          </span>
        )}
      </div>

      {/* Modifier-only hint */}
      {modifierHint && (
        <p className="text-[11px] text-muted-foreground" role="status">
          Include at least one non-modifier key (e.g. Ctrl+K, not just Ctrl)
        </p>
      )}

      {/* Required error */}
      {showRequiredError && !value && (
        <p className="text-[11px] text-destructive" role="alert">
          Keybind is required.
        </p>
      )}

      {/* Conflict warning or overwrite confirmation */}
      {conflict && !overwriteAcknowledged && (
        <div className="flex items-center justify-between gap-3 rounded-[14px] border border-warning/20 bg-warning/5 px-3 py-2">
          <p className="text-[11px] text-warning">
            Already used by {conflict.name}.
          </p>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleOverwrite}
            className="text-[11px] min-h-[44px]"
          >
            Overwrite
          </Button>
        </div>
      )}

      {conflict && overwriteAcknowledged && (
        <p className="text-[11px] text-warning" role="status">
          Will overwrite {conflict.name} on save
        </p>
      )}

      {value && (
        <p className="text-[11px] text-muted-foreground text-center">
          Click or Tab back to re-capture
        </p>
      )}
    </div>
  )
}
