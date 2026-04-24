import * as React from "react"
import { HexColorPicker } from "react-colorful"
import { converter, formatCss, parse, formatHex } from "culori"
import { checkContrast } from "@/lib/contrast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { ICON_STROKE } from "@/lib/icons"
import type { Tag } from "@/lib/types"

const toOklch = converter("oklch")

function hexToOklch(hex: string): string {
  const oklch = toOklch(hex)
  if (!oklch) return hex
  return formatCss(oklch)
}

function oklchToHex(oklch: string): string {
  const parsed = parse(oklch)
  if (!parsed) return "#6366f1"
  return formatHex(parsed) ?? "#6366f1"
}

interface TagColorPickerProps {
  value: Tag
  onChange: (tag: Tag) => void
  onRemove?: () => void
}

export function TagColorPicker({ value, onChange, onRemove }: TagColorPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [labelInput, setLabelInput] = React.useState(value.label)
  const [pickerHex, setPickerHex] = React.useState(() => oklchToHex(value.color))
  const [contrastError, setContrastError] = React.useState<string | null>(null)

  // Sync inputs when value changes externally
  React.useEffect(() => {
    setLabelInput(value.label)
  }, [value.label])

  React.useEffect(() => {
    setPickerHex(oklchToHex(value.color))
  }, [value.color])

  function handlePickerChange(hex: string) {
    const oklchStr = hexToOklch(hex)
    const result = checkContrast(oklchStr)
    if (!result.passes) {
      setContrastError(
        "This color doesn't meet contrast requirements. Try a brighter or more saturated shade.",
      )
    } else {
      setContrastError(null)
      onChange({ ...value, color: oklchStr })
    }
    setPickerHex(hex)
  }

  function handleLabelChange(label: string) {
    setLabelInput(label)
    onChange({ ...value, label })
  }

  // Determine text color for chip: use dark if color passes on dark, else white
  const contrastResult = checkContrast(value.color)
  const textColor =
    contrastResult.onDark >= 4.5 ? "oklch(0.08 0.003 90)" : "oklch(1 0 0)"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative inline-flex items-center">
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={`Edit tag: ${value.label}`}
            className="inline-flex items-center rounded-full px-[11px] py-[4px] text-[11px] font-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[44px]"
            style={{
              backgroundColor: value.color,
              color: textColor,
            }}
          >
            {value.label}
          </button>
        </PopoverTrigger>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove tag ${value.label}`}
            className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-muted border border-foreground/9 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <XIcon strokeWidth={ICON_STROKE} className="size-2.5" />
          </button>
        )}
      </div>

      <PopoverContent className="w-64 flex flex-col gap-3" align="start">
        {/* Label */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tag-label-input">Label</Label>
          <Input
            id="tag-label-input"
            value={labelInput}
            onChange={(e) => handleLabelChange(e.target.value)}
            placeholder="Tag name"
            className="h-8 text-[11px]"
          />
        </div>

        {/* Visual color picker */}
        <div className="flex flex-col gap-2">
          <Label>Color</Label>
          <HexColorPicker
            color={pickerHex}
            onChange={handlePickerChange}
            style={{ width: "100%", height: "140px" }}
          />
          {contrastError && (
            <p className="text-[11px] text-destructive" role="alert">
              {contrastError}
            </p>
          )}
          <code className="text-[10px] text-muted-foreground font-mono">
            {value.color}
          </code>
        </div>

        {/* Live preview */}
        <div className="flex flex-col gap-1.5">
          <Label>Preview</Label>
          <span
            className="inline-flex self-start items-center gap-2 rounded-full px-[11px] py-[4px] text-[11px] font-light"
            style={{ backgroundColor: value.color, color: textColor }}
          >
            {labelInput || "Tag"}
          </span>
        </div>

        <Button
          size="sm"
          variant="ghost"
          className="w-full"
          onClick={() => setOpen(false)}
        >
          Done
        </Button>
      </PopoverContent>
    </Popover>
  )
}
