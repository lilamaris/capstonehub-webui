import z from 'zod'

export const audit = z.object({
  createdBy: z.uuid(),
  createdAt: z.coerce.date(),
  updatedBy: z.uuid(),
  updatedAt: z.coerce.date(),
})

export type Audit = z.infer<typeof audit>
