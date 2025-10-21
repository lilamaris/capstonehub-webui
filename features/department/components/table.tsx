'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Skeleton } from '@/components/ui/skeleton'
import { Department } from '../schema'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useDepartmentList } from '../hooks/useDepartment'

export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'audit_lastmodifiedat',
    header: 'Last modified at',
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span>{new Date(row.original.audit.updatedAt).toLocaleDateString('en-US')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'audit_lastmodifiedby',
    header: 'Last modified by',
    cell: ({ row }) => {
      return <div>{row.original.audit.updatedBy}</div>
    },
  },
]

export const DepartmentTable = () => {
  const { data: departments, isLoading: depLoading } = useDepartmentList()
  if (depLoading) return <Skeleton className="animate-pulse" />
  if (!departments) return <p>Error while fetch</p>

  return (
    <div>
      <Link href="/console/department/new">
        <Button variant="outline" size="sm">
          <Plus />
          <span>New</span>
        </Button>
      </Link>
      <DataTable columns={columns} data={departments} />
    </div>
  )
}
