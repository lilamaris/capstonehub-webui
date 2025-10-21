import { ManagedFacultySummary } from '@/features/faculty/components/summary'
import { ManagedDepartmentSummary } from '@/features/department/components/summary'
import { ManagedAcademicUnitSummary } from '@/features/academicUnit/components/summary'

export default function Page() {
  return (
    <section className="grid grid-cols-1 min-h-[128px] gap-4 @xl/main:grid-cols-5">
      <ManagedFacultySummary />
      <ManagedDepartmentSummary />
      <ManagedAcademicUnitSummary />
    </section>
  )
}
