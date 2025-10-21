import { ManagedDepartmentSummary } from '@/features/department/components/summary'
import { DepartmentTable } from '@/features/department/components/table'

export default function Page() {
  return (
    <div>
      <ManagedDepartmentSummary />
      <DepartmentTable />
    </div>
  )
}
