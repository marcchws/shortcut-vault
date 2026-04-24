import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        // identity: rounded-[14px] for container-scale skeletons; animate-pulse; muted bg
        "animate-pulse rounded-[14px] bg-muted",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
