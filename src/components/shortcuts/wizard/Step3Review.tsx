import * as React from "react"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"
import { useCreateShortcut, useDeleteShortcut } from "@/lib/hooks/useShortcuts"
import { checkConflict } from "@/lib/keybind"
import { checkContrast } from "@/lib/contrast"
import { Button } from "@/components/ui/button"
import type { AppSearch, Shortcut, Tag } from "@/lib/types"

interface Step3ReviewProps {
  name: string
  description: string
  keybind: string
  tags: Tag[]
  onBack: () => void
  onCancel: () => void
  existingShortcuts: Shortcut[]
}

function KeybindPill({ value }: { value: string }) {
  return (
    <span className="font-mono text-[11px] bg-border px-[0.5rem] py-[0.25rem] rounded-full">
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

export function Step3Review({
  name,
  description,
  keybind,
  tags,
  onBack,
  onCancel,
  existingShortcuts,
}: Step3ReviewProps) {
  const navigate = useNavigate()
  const createShortcut = useCreateShortcut()
  const deleteShortcut = useDeleteShortcut()
  const [saving, setSaving] = React.useState(false)

  const conflict = checkConflict(keybind, existingShortcuts)

  async function handleSave() {
    setSaving(true)

    const newShortcut: Shortcut = {
      id: crypto.randomUUID(),
      name,
      description,
      key: keybind,
      tags,
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
    }

    try {
      // If there's a conflict, overwrite it first
      if (conflict) {
        await deleteShortcut.mutateAsync(conflict.id)
      }

      await createShortcut.mutateAsync(newShortcut)

      // Announce to screen readers
      const announceEl = document.getElementById("a11y-announce")
      if (announceEl) announceEl.textContent = "Shortcut saved."

      toast.success("Shortcut saved")
      navigate({ to: "/", search: (prev) => prev as AppSearch })
    } catch {
      const announceEl = document.getElementById("a11y-announce")
      if (announceEl) announceEl.textContent = "Save failed. Changes reverted."

      toast.error("Save failed. Changes reverted.")
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[14px] border border-foreground/9 p-4 flex flex-col gap-4">
        {/* Name + keybind */}
        <div className="flex items-start justify-between gap-3">
          <p className="text-[15px] font-semibold">{name}</p>
          <KeybindPill value={keybind} />
        </div>

        {/* Description */}
        {description && (
          <p className="text-[15px] font-light text-muted-foreground">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <TagChip key={tag.label} label={tag.label} color={tag.color} />
            ))}
          </div>
        )}

        {conflict && (
          <p className="text-[11px] text-warning">
            "{conflict.name}" will be overwritten.
          </p>
        )}
      </div>

      <div className="flex justify-between gap-3 pt-2">
        <Button variant="ghost" onClick={onBack} disabled={saving} className="min-h-[44px]">
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel} disabled={saving} className="min-h-[44px]">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="min-h-[44px]">
            {saving ? "Saving…" : "Save shortcut"}
          </Button>
        </div>
      </div>
    </div>
  )
}
