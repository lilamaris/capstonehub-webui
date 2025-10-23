import z from 'zod'

export const timeline = z.object({
  id: z.uuid(),
  sharedId: z.uuid(),
  validFrom: z.coerce.date(),
  validTo: z.coerce.date(),
})

export type Timeline = z.infer<typeof timeline>
