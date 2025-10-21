'use client'

import { Skeleton } from '@/components/ui/skeleton'

import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useDepartmentList } from '../hooks/useDepartment'

export const ManagedDepartmentSummary = () => {
  const { data: departments, isLoading: deptLoading } = useDepartmentList()

  if (deptLoading) return <Skeleton className="animate-pulse" />
  if (!departments) return <p>Error while fetch</p>

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total departments</CardDescription>
        <CardTitle>{departments.length}</CardTitle>
        <CardAction>
          <Link href="/console/department">
            <ArrowUpRight />
          </Link>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
