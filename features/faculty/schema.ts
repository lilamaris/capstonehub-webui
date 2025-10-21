import { audit } from '@/lib/type'
import z from 'zod'

export const faculty = z.object({
  id: z.uuid(),
  name: z.string(),
  audit,
})

export const createFacultySchema = z.object({
  name: z.string().min(2, { error: 'Name is must be at least 2 characters' }),
})

export type Faculty = z.infer<typeof faculty>
export type CreateFaculty = z.infer<typeof createFacultySchema>
