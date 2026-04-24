/* eslint-disable react-refresh/only-export-components */
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { queryClient } from '@/lib/queryClient'
import { Shell } from '@/components/layout'
import { Toaster } from '@/components/ui/sonner'
import { isMigrationRequired } from '@/lib/storage'
import { StorageMigrationWall } from '@/components/shared/StorageMigrationWall'
import { CommandPalette } from '@/components/shared/CommandPalette'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const migrationRequired = isMigrationRequired()

  return (
    <QueryClientProvider client={queryClient}>
      {/* REQ-a11y-3: single aria-live region for outcomes */}
      <div
        id="a11y-announce"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {migrationRequired ? (
        <StorageMigrationWall />
      ) : (
        <Shell>
          <Outlet />
        </Shell>
      )}

      {/* REQ-13: global command palette */}
      {!migrationRequired && <CommandPalette />}

      <Toaster position="bottom-right" />

      {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools initialIsOpen={false} />
          <TanStackRouterDevtools />
        </>
      )}
    </QueryClientProvider>
  )
}
