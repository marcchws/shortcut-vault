import * as React from "react"
import { useNavigate } from "@tanstack/react-router"
import { useShortcuts } from "@/lib/hooks/useShortcuts"
import { WizardStepper } from "./WizardStepper"
import { Step1Form, type Step1Data } from "./Step1Form"
import { Step2Form, type Step2Data } from "./Step2Form"
import { Step3Review } from "./Step3Review"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { AppSearch, Tag } from "@/lib/types"
import { cn } from "@/lib/utils"

type WizardStep = 1 | 2 | 3

interface WizardData {
  step1: Step1Data
  step2: Step2Data
  tags: Tag[]
}

const INITIAL_DATA: WizardData = {
  step1: { name: "", description: "" },
  step2: { key: "" },
  tags: [],
}

interface WizardContentProps {
  /** Disable step animations (mobile sheet) */
  noAnimation?: boolean
}

function WizardContent({ noAnimation = false }: WizardContentProps) {
  const navigate = useNavigate()
  const { data: existingShortcuts = [] } = useShortcuts()
  const [step, setStep] = React.useState<WizardStep>(1)
  const [prevStep, setPrevStep] = React.useState<WizardStep>(1)
  const [data, setData] = React.useState<WizardData>(INITIAL_DATA)
  const [animating, setAnimating] = React.useState(false)

  // Direction: positive = forward, negative = backward
  const direction = step >= prevStep ? 1 : -1

  function advanceStep(next: WizardStep) {
    setPrevStep(step)
    if (!noAnimation) {
      setAnimating(true)
      // Allow a paint before changing step for exit animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStep(next)
          setTimeout(() => setAnimating(false), 400)
        })
      })
    } else {
      setStep(next)
    }
  }

  function handleCancel() {
    navigate({ to: "/", search: (prev) => prev as AppSearch })
  }

  return (
    <div className="flex flex-col gap-6">
      <WizardStepper step={step} />

      {/*
        Step transition: on tablet/desktop (md+), animate with translate-x + opacity.
        On mobile, instant (no animation in sheet per REQ-5, REQ-motion-1).
        prefers-reduced-motion: index.css zeroes all durations globally.
      */}
      <div className="relative overflow-hidden">
        <div
          className={cn(
            noAnimation
              ? ""
              : [
                  "transition-[transform,opacity]",
                  "md:duration-[400ms]",
                  "md:[transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)]",
                  animating && direction > 0 && "md:-translate-x-4 md:opacity-0",
                  animating && direction < 0 && "md:translate-x-4 md:opacity-0",
                ]
          )}
        >
          {step === 1 && (
            <Step1Form
              data={data.step1}
              onChange={(step1) => setData((d) => ({ ...d, step1 }))}
              onNext={() => advanceStep(2)}
              onCancel={handleCancel}
              tags={data.tags}
              onTagChange={(i, updated) =>
                setData((d) => ({ ...d, tags: d.tags.map((t, idx) => (idx === i ? updated : t)) }))
              }
              onTagRemove={(i) =>
                setData((d) => ({ ...d, tags: d.tags.filter((_, idx) => idx !== i) }))
              }
              onTagAdd={() =>
                setData((d) => ({ ...d, tags: [...d.tags, { label: "Tag", color: "oklch(0.65 0.2 240)" }] }))
              }
            />
          )}

          {step === 2 && (
            <Step2Form
              data={data.step2}
              onChange={(step2) => setData((d) => ({ ...d, step2 }))}
              onNext={() => advanceStep(3)}
              onBack={() => advanceStep(1)}
              onCancel={handleCancel}
              existingShortcuts={existingShortcuts}
            />
          )}

          {step === 3 && (
            <Step3Review
              name={data.step1.name}
              description={data.step1.description}
              keybind={data.step2.key}
              tags={data.tags}
              onBack={() => advanceStep(2)}
              onCancel={handleCancel}
              existingShortcuts={existingShortcuts}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export function WizardPage() {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = React.useState(() => window.matchMedia("(max-width: 767px)").matches)

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const [open, setOpen] = React.useState(false)

  // Mount with open=false so the Sheet/Dialog can animate in on first render
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  function handleClose() {
    setOpen(false)
    setTimeout(() => navigate({ to: "/", search: (prev) => prev as AppSearch }), 200)
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(o) => !o && handleClose()}>
        <SheetContent side="bottom" className="rounded-t-[14px] max-h-[95dvh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add shortcut</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-8">
            {/* noAnimation=true: no step transitions inside mobile sheet (REQ-5) */}
            <WizardContent noAnimation />
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add shortcut</DialogTitle>
        </DialogHeader>
        <WizardContent />
      </DialogContent>
    </Dialog>
  )
}
