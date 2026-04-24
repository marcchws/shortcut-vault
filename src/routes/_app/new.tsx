import { createFileRoute } from '@tanstack/react-router'
import { WizardPage } from '@/components/shortcuts/wizard/WizardPage'

export const Route = createFileRoute('/_app/new')({
  component: WizardPage,
})
