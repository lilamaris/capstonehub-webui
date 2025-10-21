'use client'

import { Button } from '@/components/ui/button'
import { ManagedAcademicUnitSummary } from '@/features/academicUnit/components/summary'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>Academic Units</h1>
      <ManagedAcademicUnitSummary />
      <Link href="/console/academic-unit/new">
        <Button variant={'outline'} size={'icon'}>
          <Plus />
        </Button>
      </Link>
    </div>
  )
}
