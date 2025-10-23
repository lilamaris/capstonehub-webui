import { type AcademicUnit } from './schema'

export interface VisualizedUnit extends AcademicUnit {
  offsetPercent: number
  widthPercent: number
}

export function computeGlobalTimelineLayout(units: AcademicUnit[]) {
  const minStart = Math.min(...units.map((u) => u.timeline.validFrom.getTime()))
  const maxEnd = Math.max(...units.map((u) => u.timeline.validTo.getTime()))
  const totalDuration = maxEnd - minStart

  const normalized: VisualizedUnit[] = units.map((unit) => {
    const start = unit.timeline.validFrom.getTime()
    const end = unit.timeline.validTo.getTime()
    return {
      ...unit,
      offsetPercent: ((start - minStart) / totalDuration) * 100,
      widthPercent: ((end - start) / totalDuration) * 100,
    }
  })

  const grouped = normalized.reduce(
    (acc, unit) => {
      const sid = unit.timeline.sharedId
      if (!acc[sid]) acc[sid] = []
      acc[sid].push(unit)
      return acc
    },
    {} as Record<string, VisualizedUnit[]>,
  )

  return { grouped, minStart, maxEnd }
}
