import z from 'zod'

export const faculty = z.object({
  id: z.uuid(),
  name: z.string(),
})

export type Faculty = z.infer<typeof faculty>
