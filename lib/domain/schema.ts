import { Brand, UUID } from '@/lib/type'
import { z } from 'zod'

const UUIDString = z.uuid()

// NOTE: The Period domain designed in this project was not timezone mind.
// if consideration for users across different timezones is required,
// additional transmission of timezone information will be necessary in the future.
export type LocalDateTimeString = Brand<string, 'ldt'>
export const LocalDateTimeStringSchema = z.iso
  .datetime({ offset: false })
  .refine((s) => !/[+-]\d{2}:\d{2}$/.test(s) && !s.endsWith('Z'), 'LocalDateTime should not include timezone offset')
  .transform((s) => s as LocalDateTimeString)
export type Period = z.infer<typeof PeriodSchema>
export const PeriodSchema = z
  .object({
    from: LocalDateTimeStringSchema,
    to: LocalDateTimeStringSchema,
  })
  .refine((p) => p.from.localeCompare(p.to) < 0, "Invalid argument: 'from' must be before 'to'")

export type VersionId = Brand<UUID, 'version-id'>
export type VersionSharedId = Brand<UUID, 'version-shared-id'>
export type Version = z.infer<typeof VersionSchema>
export const VersionSchema = z.object({
  id: UUIDString.transform((s) => s as VersionId),
  sharedId: UUIDString.transform((s) => s as VersionSharedId),
  versionNo: z.number(),
  versionDescription: z.string(),
  txPeriod: PeriodSchema,
})

export type LineageId = Brand<UUID, 'lineage-id'>
export type LineageSharedId = Brand<UUID, 'lineage-shared-id'>
export const LineageScopeSchema = z.enum(['AFFILIATION', 'COURSE'])
export type Lineage = z.infer<typeof LineageSchema>
export const LineageSchema = z.object({
  id: UUIDString.transform((s) => s as LineageId),
  sharedId: UUIDString.transform((s) => s as LineageSharedId),
  scope: LineageScopeSchema,
  validPeriod: PeriodSchema,
})

export type CollegeId = Brand<UUID, 'college-id'>
export type College = z.infer<typeof CollegeSchema>
export const CollegeSchema = z.object({
  id: UUIDString.transform((s) => s as CollegeId),
  name: z.string().min(1),
})

export type MajorId = Brand<UUID, 'major-id'>
export type Major = z.infer<typeof MajorSchema>
export const MajorSchema = z.object({
  id: UUIDString.transform((s) => s as MajorId),
  name: z.string().min(1),
})

export type AffiliationId = Brand<UUID, 'affiliationId'>
export type Affiliation = z.infer<typeof AffiliationSchema>
export const AffiliationSchema = z.object({
  id: UUIDString.transform((s) => s as AffiliationId),
})
