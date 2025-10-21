import { Fragment } from 'react'
import { ManagedFacultySummary } from '@/features/faculty/components/summary'
import { ManagedDepartmentSummary } from '@/features/department/components/summary'

export default function Page() {
  return (
    <Fragment>
      <section>
        <header>Managed academic resources</header>
        <div className="grid grid-cols-1 min-h-24 gap-4 @xl/main:grid-cols-3">
          <ManagedFacultySummary />
          <ManagedDepartmentSummary />
        </div>
      </section>
      <section>
        <header>Managed student summary</header>
      </section>
    </Fragment>
  )
}
