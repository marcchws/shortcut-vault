import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EmptyStateCTA {
  label: string
  onClick: () => void
}

interface EmptyStateProps {
  heading: string
  cta?: EmptyStateCTA
  className?: string
}

/**
 * EmptyState — single-line helper text + one CTA pill button.
 * Identity voice: "[verb] + [object] to get started" pattern
 * No illustration. Centered layout.
 */
export function EmptyState({ heading, cta, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <p className="text-[15px] font-light text-muted-foreground">{heading}</p>
      {cta && (
        <Button variant="outline" onClick={cta.onClick}>
          {cta.label}
        </Button>
      )}
    </div>
  )
}
