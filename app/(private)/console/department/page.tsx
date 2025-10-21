import { ManagedDepartmentSummary } from '@/features/department/components/summary'
import { DepartmentTable } from '@/features/department/components/table'
import { Fragment } from 'react'

export default function Page() {
  return (
    <Fragment>
      <ManagedDepartmentSummary />
      <DepartmentTable />
    </Fragment>
  )
}
