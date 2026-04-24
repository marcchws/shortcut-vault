import * as React from "react"
import { CheckIcon } from "lucide-react"
import { ICON_STROKE } from "@/lib/icons"
import { cn } from "@/lib/utils"

interface WizardStepperProps {
  step: 1 | 2 | 3
}

const STEP_LABELS = ["Name & description", "Keybind", "Review"]

type StepState = "upcoming" | "active" | "completed"

function getStepState(stepIndex: number, currentStep: number): StepState {
  if (stepIndex + 1 < currentStep) return "completed"
  if (stepIndex + 1 === currentStep) return "active"
  return "upcoming"
}

function StepCircle({ state, label }: { state: StepState; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        role="img"
        aria-label={`Step ${label}: ${state}`}
        className={cn(
          "size-7 rounded-full border-2 flex items-center justify-center transition-all",
          // base: 400ms cubic-bezier
          "duration-[400ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)]",
          state === "upcoming" && "border-foreground/38 bg-transparent",
          state === "active" && "border-primary bg-primary",
          state === "completed" && "border-primary bg-primary"
        )}
      >
        {state === "completed" && (
          <CheckIcon strokeWidth={ICON_STROKE} className="size-3.5 text-primary-foreground" />
        )}
      </div>
      <span
        className={cn(
          "text-[11px] font-light text-center leading-tight",
          state === "upcoming" && "text-muted-foreground",
          state === "active" && "text-foreground font-semibold",
          state === "completed" && "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  )
}

export function WizardStepper({ step }: WizardStepperProps) {
  return (
    <div
      className="flex w-full items-start"
      role="list"
      aria-label="Wizard steps"
    >
      {STEP_LABELS.map((label, i) => {
        const state = getStepState(i, step)
        const isLast = i === STEP_LABELS.length - 1
        return (
          <React.Fragment key={label}>
            <div role="listitem" className="flex flex-1 flex-col items-center">
              <StepCircle state={state} label={label} />
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mt-3.5 h-0.5 flex-1 transition-all",
                  "duration-[400ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)]",
                  i + 1 < step ? "bg-primary" : "bg-foreground/9"
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
