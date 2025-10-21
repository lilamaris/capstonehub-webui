import { ManagedFacultySummary } from '@/features/faculty/components/summary'
import { FacultyTable } from '@/features/faculty/components/table'

export default function Page() {
  return (
    <div>
      <ManagedFacultySummary />
      <FacultyTable />
    </div>
  )
}
