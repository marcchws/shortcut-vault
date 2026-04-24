import { cn } from "@/lib/utils"

interface MetricPairProps {
  value: string
  label: string
  className?: string
}

/**
 * MetricPair — numeric value + descriptor label.
 * Identity: value 30px Inter 800 muted-foreground, label 11px muted max-width 130px lh 1.35
 */
export function MetricPair({ value, label, className }: MetricPairProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-sans text-[30px] font-extrabold leading-none text-muted-foreground">
        {value}
      </span>
      <span
        className="max-w-[130px] text-[11px] font-normal leading-[1.35] text-muted-foreground"
        style={{ maxWidth: "130px" }}
      >
        {label}
      </span>
    </div>
  )
}
