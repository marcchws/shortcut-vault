import * as React from "react"
import { useNavigate } from "@tanstack/react-router"
import { useShortcuts } from "@/lib/hooks/useShortcuts"
import type { AppSearch } from "@/lib/types"
import { InlineEditor } from "./InlineEditor"
import { DeleteDialog } from "./DeleteDialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface DetailSheetProps {
  id: string
}

export function DetailSheet({ id }: DetailSheetProps) {
  const navigate = useNavigate()
  const { data: shortcuts = [], isLoading, isError } = useShortcuts()
  const [open, setOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  const shortcut = shortcuts.find((s) => s.id === id)

  // Mount with open=false so the Sheet can animate in on first render
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  function handleClose() {
    setOpen(false)
    setTimeout(() => navigate({ to: "/", search: (prev) => prev as AppSearch }), 200)
  }

  return (
    <Sheet open={open} onOpenChange={(o) => !o && handleClose()}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-lg overflow-hidden"
      >
        <SheetHeader className="border-b border-foreground/9 px-6 py-4">
          <SheetTitle className="text-[15px] font-semibold truncate">
            {shortcut?.name ?? (isLoading ? "Loading…" : "Shortcut")}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isLoading ? (
            <div className="flex flex-col gap-5">
              <Skeleton className="h-10 rounded-[14px]" />
              <Skeleton className="h-24 rounded-[14px]" />
              <Skeleton className="h-10 rounded-[14px]" />
            </div>
          ) : isError ? (
            <div className="py-12 text-center" role="alert">
              <p className="text-[15px] text-muted-foreground mb-4">
                Couldn't load shortcut
              </p>
              <Button variant="outline" onClick={handleClose} className="min-h-[44px]">
                Go back
              </Button>
            </div>
          ) : !shortcut ? (
            <div className="py-12 text-center">
              <p className="text-[15px] text-muted-foreground mb-4">
                Shortcut not found
              </p>
              <Button variant="outline" onClick={handleClose} className="min-h-[44px]">
                Back to shortcuts
              </Button>
            </div>
          ) : (
            <InlineEditor
              shortcut={shortcut}
              onSave={handleClose}
              onDelete={() => setDeleteOpen(true)}
            />
          )}
        </div>

        {shortcut && (
          <DeleteDialog
            shortcut={shortcut}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}
