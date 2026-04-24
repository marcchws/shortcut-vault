import * as React from "react"
import { KeybindCapture } from "./KeybindCapture"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { Shortcut } from "@/lib/types"

export interface Step2Data {
  key: string
}

interface Step2FormProps {
  data: Step2Data
  onChange: (data: Step2Data) => void
  onNext: () => void
  onBack: () => void
  onCancel: () => void
  existingShortcuts: Shortcut[]
}

export function Step2Form({
  data,
  onChange,
  onNext,
  onBack,
  onCancel,
  existingShortcuts,
}: Step2FormProps) {
  const [showRequired, setShowRequired] = React.useState(false)

  function handleNext() {
    if (!data.key) {
      setShowRequired(true)
      return
    }
    setShowRequired(false)
    onNext()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      onCancel()
    }
  }

  return (
    <div className="flex flex-col gap-5" onKeyDown={handleKeyDown}>
      <div className="flex flex-col gap-1.5">
        <Label>
          Keybind <span aria-hidden="true" className="text-destructive">*</span>
        </Label>
        <KeybindCapture
          value={data.key}
          onChange={(key) => {
            onChange({ key })
            setShowRequired(false)
          }}
          existingShortcuts={existingShortcuts}
          showRequiredError={showRequired}
        />
      </div>

      <div className="flex justify-between gap-3 pt-2">
        <Button variant="ghost" onClick={onBack} className="min-h-[44px]">
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel} className="min-h-[44px]">
            Cancel
          </Button>
          <Button onClick={handleNext} className="min-h-[44px]">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
