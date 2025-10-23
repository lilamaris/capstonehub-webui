import z from 'zod'
import { audit } from '../audit/schema'

export const department = z.object({
  id: z.uuid(),
  name: z.string(),
  audit,
})

export const createSchema = z.object({
  name: z.string().min(2, { error: 'Name is must be at least 2 characters' }),
})

export const modifySchema = createSchema.extend({})

export type Department = z.infer<typeof department>
export type CreateDepartment = z.infer<typeof createSchema>
export type ModifyDepartment = z.infer<typeof modifySchema>
