/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { z } from 'zod'
import { ShortcutListPage } from '@/components/shortcuts/ShortcutListPage'

const searchSchema = z.object({
  q: z.string().default(''),
  tags: z.array(z.string()).default([]),
})

type AppSearch = { q: string; tags: string[] }

export const Route = createFileRoute('/_app')({
  validateSearch: (search): AppSearch => searchSchema.parse(search),
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
