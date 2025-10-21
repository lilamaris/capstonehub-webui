'use client'

import { CreateTimelineForm } from '@/features/academicUnit/components/form'
import { AcademicUnit, ValueOf } from '@/features/academicUnit/schema'
import { useApiMutation } from '@/hooks/useApi'

export default function Page() {
  const mutator = useApiMutation<ValueOf<'create'>, AcademicUnit>({ endpoint: 'v1/academicUnit/timeline' })
  return (
    <div>
      <h1>Create new academic unit timeline</h1>
      <CreateTimelineForm mutator={mutator} />
    </div>
  )
}
