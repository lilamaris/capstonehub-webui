'use client'

import { CreateForm } from '@/features/department/components/form'
import { CreateDepartment, Department } from '@/features/department/schema'
import { useApiMutation } from '@/hooks/useApi'

export default function Page() {
  const mutator = useApiMutation<CreateDepartment, Department>({ endpoint: 'v1/department' })
  return <CreateForm mutator={mutator} />
}
