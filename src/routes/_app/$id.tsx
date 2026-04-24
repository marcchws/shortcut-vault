/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router'
import { DetailSheet } from '@/components/shortcuts/DetailSheet'

export const Route = createFileRoute('/_app/$id')({
  component: DetailSheetRoute,
})

function DetailSheetRoute() {
  const { id } = Route.useParams()
  return <DetailSheet id={id} />
}
