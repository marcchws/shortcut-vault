import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"
import { ICON_STROKE } from "@/lib/icons"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon strokeWidth={ICON_STROKE} className="size-4" />
        ),
        info: (
          <InfoIcon strokeWidth={ICON_STROKE} className="size-4" />
        ),
        warning: (
          <TriangleAlertIcon strokeWidth={ICON_STROKE} className="size-4" />
        ),
        error: (
          <OctagonXIcon strokeWidth={ICON_STROKE} className="size-4" />
        ),
        loading: (
          <Loader2Icon strokeWidth={ICON_STROKE} className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
