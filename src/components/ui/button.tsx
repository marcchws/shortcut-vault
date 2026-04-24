import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base: pill shape, 11px uppercase, 200ms ease transitions, identity border system
  "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-foreground/9 bg-clip-padding text-[11px] font-semibold tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-200 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary hover:border-primary/80 hover:bg-primary/80",
        outline:
          "bg-transparent text-foreground hover:border-foreground/38",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80",
        ghost:
          "border-transparent hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-[15px] py-[7px]",
        sm: "px-[11px] py-[4px] text-[10px]",
        lg: "px-[19px] py-[9px] text-[12px]",
        icon: "size-9 p-0",
        "icon-xs": "size-6 p-0 text-[10px]",
        "icon-sm": "size-7 p-0",
        "icon-lg": "size-10 p-0",
        xs: "px-[11px] py-[4px] text-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
