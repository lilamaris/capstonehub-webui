import z from 'zod'

export const edition = z.object({
  id: z.uuid(),
  sharedId: z.uuid(),
  editionNo: z.number(),
  editionDescription: z.string(),
  txFrom: z.coerce.date(),
  txTo: z.coerce.date(),
})

export type Edition = z.infer<typeof edition>
