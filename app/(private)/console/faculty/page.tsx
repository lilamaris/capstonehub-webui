import { ManagedFacultySummary } from '@/features/faculty/components/summary'
import { FacultyTable } from '@/features/faculty/components/table'
import { Fragment } from 'react'

export default function Page() {
  return (
    <Fragment>
      <ManagedFacultySummary />
      <FacultyTable />
    </Fragment>
  )
}
