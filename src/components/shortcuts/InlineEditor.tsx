import * as React from "react"
import { toast } from "sonner"
import { useUpdateShortcut } from "@/lib/hooks/useShortcuts"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { TagColorPicker } from "./TagColorPicker"
import type { Shortcut, Tag } from "@/lib/types"

interface InlineEditorProps {
  shortcut: Shortcut
  onSave: () => void
  onDelete: () => void
}

function deepEqual<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function InlineEditor({ shortcut, onSave, onDelete }: InlineEditorProps) {
  const updateShortcut = useUpdateShortcut()

  const [name, setName] = React.useState(shortcut.name)
  const [description, setDescription] = React.useState(shortcut.description)
  const [tags, setTags] = React.useState<Tag[]>(shortcut.tags)
  const [nameError, setNameError] = React.useState<string | null>(null)
  const [discardOpen, setDiscardOpen] = React.useState(false)

  const isDirty =
    name !== shortcut.name ||
    description !== shortcut.description ||
    !deepEqual(tags, shortcut.tags)

  // Escape key: if dirty, intercept and show discard confirm instead of closing the sheet
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return
      if (!isDirty) return
      // Stop Escape from propagating to the Sheet/Dialog so they don't close simultaneously
      e.stopPropagation()
      setDiscardOpen(true)
    }
    // useCapture=true to intercept before Radix's own Escape handler
    document.addEventListener("keydown", handleKeyDown, true)
    return () => document.removeEventListener("keydown", handleKeyDown, true)
  }, [isDirty])

  function validateName(): boolean {
    if (!name.trim()) {
      setNameError("Name is required.")
      return false
    }
    if (name.length > 100) {
      setNameError("Name must be 100 characters or fewer.")
      return false
    }
    setNameError(null)
    return true
  }

  async function handleSave() {
    if (!validateName()) return

    const updated: Shortcut = {
      ...shortcut,
      name,
      description,
      tags,
    }

    try {
      await updateShortcut.mutateAsync(updated)

      const announceEl = document.getElementById("a11y-announce")
      if (announceEl) announceEl.textContent = "Changes saved."

      toast.success("Changes saved")
      onSave()
    } catch {
      const announceEl = document.getElementById("a11y-announce")
      if (announceEl) announceEl.textContent = "Save failed. Changes reverted."

      toast.error("Save failed. Changes reverted.")
    }
  }

  function handleDiscard() {
    setName(shortcut.name)
    setDescription(shortcut.description)
    setTags(shortcut.tags)
    setNameError(null)
    setDiscardOpen(false)
  }

  return (
    <div className="relative flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="editor-name">
          Name <span aria-hidden="true" className="text-destructive">*</span>
        </Label>
        <Input
          id="editor-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={validateName}
          aria-required="true"
          aria-invalid={!!nameError}
          aria-describedby={nameError ? "editor-name-error" : undefined}
          maxLength={110}
        />
        {nameError && (
          <p id="editor-name-error" className="text-[11px] text-destructive" role="alert">
            {nameError}
          </p>
        )}
        <p className="text-[11px] text-muted-foreground text-right">
          {name.length}/100
        </p>
      </div>

      {/* Keybind (read-only in editor, shown as pill) */}
      <div className="flex flex-col gap-1.5">
        <Label>Keybind</Label>
        <span className="font-mono text-[11px] bg-border px-[0.5rem] py-[0.25rem] rounded-full self-start">
          {shortcut.key}
        </span>
        <p className="text-[11px] text-muted-foreground">
          Create a new shortcut to change the keybind.
        </p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="editor-description">Description</Label>
        <Textarea
          id="editor-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional — describe when to use it"
          rows={3}
          className="resize-none rounded-[14px] border border-foreground/9 bg-transparent px-[15px] py-[7px] text-[15px] font-light leading-[1.65] text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1.5">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <TagColorPicker
              key={i}
              value={tag}
              onChange={(updated) =>
                setTags((prev) => prev.map((t, idx) => (idx === i ? updated : t)))
              }
              onRemove={() => setTags((prev) => prev.filter((_, idx) => idx !== i))}
            />
          ))}
          <button
            type="button"
            onClick={() =>
              setTags((prev) => [
                ...prev,
                { label: "Tag", color: "oklch(0.65 0.2 240)" },
              ])
            }
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-foreground/38 px-[11px] py-[4px] text-[11px] text-muted-foreground hover:text-foreground hover:border-foreground/38 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            + Add tag
          </button>
        </div>
      </div>

      {/* Delete action */}
      <div className="pt-2">
        <Button
          variant="destructive"
          onClick={onDelete}
          className="min-h-[44px]"
        >
          Delete shortcut
        </Button>
      </div>

      {/* Sticky dirty bar */}
      {isDirty && (
        <div className="sticky bottom-0 z-40 -mx-1 border-t border-foreground/9 bg-popover/95 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] text-muted-foreground">Unsaved changes</p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => setDiscardOpen(true)}
                className="min-h-[44px]"
              >
                Discard
              </Button>
              <Button
                onClick={handleSave}
                disabled={updateShortcut.isPending}
                className="min-h-[44px]"
              >
                {updateShortcut.isPending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Discard confirm dialog */}
      <Dialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <DialogContent
          role="alertdialog"
          aria-modal="true"
          showCloseButton={false}
          className="max-w-sm"
        >
          <DialogHeader>
            <DialogTitle>Discard changes?</DialogTitle>
            <DialogDescription>
              Your edits to "{shortcut.name}" will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDiscardOpen(false)}
              className="min-h-[44px]"
            >
              Keep editing
            </Button>
            <Button
              variant="destructive"
              onClick={handleDiscard}
              className="min-h-[44px]"
            >
              Discard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
