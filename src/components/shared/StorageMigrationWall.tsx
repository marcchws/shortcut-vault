import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export function StorageMigrationWall() {
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  function handleConfirmedReset() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
        role="main"
        aria-labelledby="migration-heading"
      >
        <div className="flex flex-col gap-3 max-w-sm">
          <h1
            id="migration-heading"
            className="font-display text-[30px] font-extrabold leading-[0.88] tracking-[-0.045em]"
          >
            Old format detected.
          </h1>
          <p className="text-[15px] font-light text-muted-foreground">
            Your saved shortcuts are in an old format we can't read.
          </p>
        </div>

        <Button
          variant="destructive"
          onClick={() => setConfirmOpen(true)}
          className="min-h-[44px]"
        >
          Reset vault
        </Button>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent
          role="alertdialog"
          aria-modal="true"
          showCloseButton={false}
          className="max-w-sm"
        >
          <DialogHeader>
            <DialogTitle>Reset vault?</DialogTitle>
            <DialogDescription>
              This will permanently delete all your saved shortcuts. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setConfirmOpen(false)}
              className="min-h-[44px]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmedReset}
              className="min-h-[44px]"
            >
              Reset vault
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
