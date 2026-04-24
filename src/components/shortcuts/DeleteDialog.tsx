import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"
import { useDeleteShortcut, useReInsertShortcut } from "@/lib/hooks/useShortcuts"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import type { AppSearch, Shortcut } from "@/lib/types"

interface DeleteDialogProps {
  shortcut: Shortcut
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteDialog({ shortcut, open, onOpenChange }: DeleteDialogProps) {
  const navigate = useNavigate()
  const deleteShortcut = useDeleteShortcut()
  const reInsert = useReInsertShortcut()

  async function handleDelete() {
    onOpenChange(false)

    try {
      const result = await deleteShortcut.mutateAsync(shortcut.id)
      const deleted = result ?? shortcut

      const announceEl = document.getElementById("a11y-announce")
      if (announceEl) announceEl.textContent = `"${shortcut.name}" deleted.`

      toast(
        () => (
          <div className="flex w-full flex-col gap-2">
            <span className="text-[11px]">&ldquo;{shortcut.name}&rdquo; deleted</span>
            <div
              className="h-[2px] w-full rounded-full bg-foreground/20 overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-foreground/50"
                style={{
                  animation: "toast-countdown 5s linear forwards",
                }}
              />
            </div>
          </div>
        ),
        {
          duration: 5000,
          action: {
            label: "Undo",
            onClick: async () => {
              try {
                await reInsert.mutateAsync(deleted as Shortcut)
                const el = document.getElementById("a11y-announce")
                if (el) el.textContent = `"${shortcut.name}" restored.`
                toast.success(`"${shortcut.name}" restored`)
                navigate({ to: "/$id", params: { id: shortcut.id }, search: (prev) => prev as AppSearch })
              } catch {
                toast.error("Couldn't restore shortcut.")
              }
            },
          },
        }
      )

      navigate({ to: "/", search: (prev) => prev as AppSearch })
    } catch {
      toast.error("Couldn't delete shortcut.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        role="alertdialog"
        aria-modal="true"
        showCloseButton={false}
        className="max-w-sm"
      >
        <DialogHeader>
          <DialogTitle>Delete shortcut?</DialogTitle>
          <DialogDescription>
            &ldquo;{shortcut.name}&rdquo; will be deleted. You have 5 seconds to undo.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="min-h-[44px]"
          >
            Keep editing
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="min-h-[44px]"
          >
            Delete shortcut
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
