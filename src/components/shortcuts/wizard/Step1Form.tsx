import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { TagColorPicker } from "@/components/shortcuts/TagColorPicker"
import { cn } from "@/lib/utils"
import type { Tag } from "@/lib/types"

export interface Step1Data {
  name: string
  description: string
}

interface Step1FormProps {
  data: Step1Data
  onChange: (data: Step1Data) => void
  onNext: () => void
  onCancel: () => void
  tags: Tag[]
  onTagChange: (index: number, updated: Tag) => void
  onTagRemove: (index: number) => void
  onTagAdd: () => void
}

export function Step1Form({ data, onChange, onNext, onCancel, tags, onTagChange, onTagRemove, onTagAdd }: Step1FormProps) {
  const [errors, setErrors] = React.useState<Partial<Step1Data>>({})
  const nameRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    nameRef.current?.focus()
  }, [])

  function validate(): boolean {
    const newErrors: Partial<Step1Data> = {}
    if (!data.name.trim()) {
      newErrors.name = "Name is required."
    } else if (data.name.length > 100) {
      newErrors.name = "Name must be 100 characters or fewer."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validate()) onNext()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleNext()
    }
    if (e.key === "Escape") {
      // Radix Popover marks Escape as default-prevented when it handles it
      // — skip cancel so closing the popover doesn't also close the wizard
      if (e.defaultPrevented) return
      onCancel()
    }
  }

  function handleNameBlur() {
    if (data.name && data.name.length > 100) {
      setErrors((prev) => ({ ...prev, name: "Name must be 100 characters or fewer." }))
    } else if (!data.name.trim() && errors.name) {
      // Keep the error visible after blur only if already shown
    } else if (!data.name.trim()) {
      setErrors((prev) => ({ ...prev, name: undefined }))
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }))
    }
  }

  return (
    <div className="flex flex-col gap-5" onKeyDown={handleKeyDown}>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="wizard-name">
          Name <span aria-hidden="true" className="text-destructive">*</span>
        </Label>
        <Input
          id="wizard-name"
          ref={nameRef}
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          onBlur={handleNameBlur}
          placeholder="e.g. Duplicate line"
          maxLength={110}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "wizard-name-error" : undefined}
          className={cn(errors.name && "border-destructive ring-destructive/20")}
        />
        {errors.name && (
          <p id="wizard-name-error" className="text-[11px] text-destructive" role="alert">
            {errors.name}
          </p>
        )}
        <p className="text-[11px] text-muted-foreground text-right">
          {data.name.length}/100
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="wizard-description">Description</Label>
        <Textarea
          id="wizard-description"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder="Optional — describe when to use it"
          rows={3}
          className="resize-none rounded-[14px] border border-foreground/9 bg-transparent px-[15px] py-[7px] text-[15px] font-light leading-[1.65] text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {/* Tags (optional) — above action buttons */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
          Tags (optional)
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <TagColorPicker
              key={i}
              value={tag}
              onChange={(updated) => onTagChange(i, updated)}
              onRemove={() => onTagRemove(i)}
            />
          ))}
          <button
            type="button"
            onClick={onTagAdd}
            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-foreground/38 px-[11px] py-[4px] text-[11px] text-muted-foreground hover:text-foreground transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            + Add tag
          </button>
        </div>
      </div>

      {/* Action buttons — always at bottom */}
      <div className="flex justify-between gap-3 pt-2">
        <Button variant="ghost" onClick={onCancel} className="min-h-[44px]">
          Cancel
        </Button>
        <Button onClick={handleNext} className="min-h-[44px]">
          Next
        </Button>
      </div>
    </div>
  )
}
