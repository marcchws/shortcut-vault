import * as React from "react"
import { Topbar } from "./Topbar"

interface ShellProps {
  children: React.ReactNode
}

/**
 * Shell — root layout wrapper.
 * Renders Topbar + main content area with pt-16 to clear fixed nav.
 */
export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar />
      <main className="pt-16">{children}</main>
    </div>
  )
}
