'use client'

import { CreateForm } from '@/features/faculty/components/form'
import { CreateFaculty, Faculty } from '@/features/faculty/schema'
import { useApiMutation } from '@/hooks/useApi'

export default function Page() {
  const mutator = useApiMutation<CreateFaculty, Faculty>({ endpoint: 'v1/faculty' })
  return <CreateForm mutator={mutator} />
}
