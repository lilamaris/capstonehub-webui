'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Skeleton } from '@/components/ui/skeleton'
import { type Faculty } from '../schema'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useFacultyList } from '../hooks/useFaculty'

export const columns: ColumnDef<Faculty>[] = [
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

export const FacultyTable = () => {
  const { data: faculties, isLoading: facLoading } = useFacultyList()

  if (facLoading) return <Skeleton className="animate-pulse" />
  if (!faculties) return <p>Error while fetch</p>

  return (
    <div>
      <Link href="/console/faculty/new">
        <Button variant="outline" size="sm">
          <Plus />
          <span>New</span>
        </Button>
      </Link>
      <DataTable columns={columns} data={faculties} />
    </div>
  )
}
