import { audit } from '@/lib/type'
import z from 'zod'

export const department = z.object({
  id: z.uuid(),
  name: z.string(),
  audit,
})

export const createDepartmentSchema = z.object({
  name: z.string().min(2, { error: 'Name is must be at least 2 characters' }),
})

export type Department = z.infer<typeof department>
export type CreateDepartment = z.infer<typeof createDepartmentSchema>
