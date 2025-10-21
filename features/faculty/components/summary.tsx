'use client'

import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import { useFacultyList } from '../hooks/useFaculty'

export const ManagedFacultySummary = () => {
  const { data: faculties, isLoading: facLoading } = useFacultyList()

  if (facLoading) return <Skeleton className="animate-pulse" />
  if (!faculties) return <p>Error while fetch</p>

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total faculty</CardDescription>
        <CardTitle>{faculties.length}</CardTitle>
        <CardAction>
          <Link href="/console/faculty">
            <ArrowUpRight />
          </Link>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
