import { z } from 'zod'

type InterFieldErrors<T extends z.ZodType> = {
  [K in keyof z.infer<T>]?: string[]
}

export type ActionState<T extends z.ZodType> =
  | {
      errors?: InterFieldErrors<T>
      payload?: Record<string, FormDataEntryValue>
      message?: string
    }
  | undefined

export interface SiteConfig {
  version: string
  name: string
  description: string
}

export const audit = z.object({
  createdBy: z.uuid(),
  createdAt: z.date(),
  updatedBy: z.uuid(),
  updatedAt: z.date(),
})

export const timeline = z.object({
  id: z.uuid(),
  sharedId: z.uuid(),
  validFrom: z.date(),
  validTo: z.date(),
})

export const edition = z.object({
  id: z.uuid(),
  sharedId: z.uuid(),
  editionNo: z.number(),
  description: z.string(),
  txFrom: z.date(),
  txTo: z.date(),
})

export type Audit = z.infer<typeof audit>
export type Timeline = z.infer<typeof timeline>
export type Edition = z.infer<typeof edition>
