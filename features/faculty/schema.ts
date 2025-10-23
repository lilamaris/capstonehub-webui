import z from 'zod'
import { audit } from '../audit/schema'

export const faculty = z.object({
  id: z.uuid(),
  name: z.string(),
  audit,
})

export const createSchema = z.object({
  name: z.string().min(2, { error: 'Name is must be at least 2 characters' }),
})

export const modifySchema = createSchema.extend({})

export type Faculty = z.infer<typeof faculty>
export type CreateFaculty = z.infer<typeof createSchema>
export type ModifyFaculty = z.infer<typeof modifySchema>
