'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { computeGlobalTimelineLayout } from '../utils'
import { useAcademicUnitList } from '../hooks/useAcademicUnit'
import { academicUnit } from '../schema'
import z from 'zod'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function GlobalTimeline() {
  const { data: units, isLoading, error } = useAcademicUnitList()

  if (isLoading) return <Skeleton className="animate-pulse" />
  if (!units) return <p>Error while fetch</p>

  const arraySchema = z.array(academicUnit)
  const u = arraySchema.safeParse(units)
  if (!u.success) return <p>Error while parsing data</p>
  const { grouped } = computeGlobalTimelineLayout(u.data)

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([sharedId, groupUnits]) => (
        <div key={sharedId} className="space-y-1">
          <h2 className="text-sm font-semibold text-foreground/70">Timeline ID: {sharedId}</h2>

          <div className="flex gap-2">
            <div className="relative w-[80%] rounded bg-muted/40 overflow-hidden">
              {groupUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="absolute top-0 h-full flex justify-center items-center rounded text-xs text-center text-white bg-blue-600 hover:bg-blue-500 transition-colors"
                  style={{
                    left: `${unit.offsetPercent}%`,
                    width: `${unit.widthPercent}%`,
                  }}
                  title={`${unit.id}\n${unit.timeline.validFrom} → ${unit.timeline.validTo}`}
                >
                  <span className="whitespace-nowrap">{unit.id}</span>
                </div>
              ))}
            </div>
            <Link href={`/console/academic-unit/timeline/${sharedId}/append`}>
              <Button size={'icon'} variant={'outline'}>
                <Plus />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
