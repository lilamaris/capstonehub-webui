import { timeline, edition, Timeline } from '@/lib/type'
import z from 'zod'
import { faculty } from '../faculty/schema'
import { department } from '../department/schema'

export const academicUnit = z.object({
  id: z.uuid(),
  edition,
  timeline,
  faculty: z.lazy(() => faculty),
  department: z.lazy(() => department),
})

export const baseTimelineMutationSchema = z.object({
  facultyId: z.uuid(),
  departmentId: z.uuid(),
})

export const createTimelineSchema = baseTimelineMutationSchema.extend({
  validAt: z.date(),
})

export const appendTimelineSchema = createTimelineSchema

export const amendTimelineSchema = baseTimelineMutationSchema.extend({
  editionDescription: z.string(),
})

export const schemaMap = {
  create: createTimelineSchema,
  append: appendTimelineSchema,
  amend: amendTimelineSchema,
} as const

export type TimelineFormMode = 'create' | 'append' | 'amend'
export type AcademicUnit = z.infer<typeof academicUnit>
export type SchemaOf<M extends TimelineFormMode> = (typeof schemaMap)[M]
export type ValueOf<M extends TimelineFormMode> = z.infer<SchemaOf<M>>
