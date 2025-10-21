'use client'

import { Skeleton } from '@/components/ui/skeleton'

import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useAcademicUnitList } from '../hooks/useAcademicUnit'

export const ManagedAcademicUnitSummary = () => {
  const { data: academicUnits, isLoading, error } = useAcademicUnitList()

  if (isLoading) return <Skeleton className="animate-pulse" />
  if (!academicUnits) return <p>Error while fetch</p>

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total academic unit</CardDescription>
        <CardTitle>{academicUnits.length}</CardTitle>
        <CardAction>
          <Link href="/console/academic-unit">
            <ArrowUpRight />
          </Link>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
