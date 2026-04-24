import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'
import { ShortcutListPage } from '@/components/shortcuts/ShortcutListPage'

const searchSchema = z.object({
  q: z.string().default(''),
  tags: z.array(z.string()).default([]),
})

export const Route = createFileRoute('/_app')({
  validateSearch: searchSchema,
  component: AppLayout,
})

function AppLayout() {
  return (
    <>
      <ShortcutListPage />
      <Outlet />
    </>
  )
}
