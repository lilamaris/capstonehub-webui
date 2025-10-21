import { useApi } from '@/hooks/useApi'
import { AcademicUnit } from '../schema'
import { client } from '@/lib/http'

export function useAcademicUnitList() {
  return useApi<AcademicUnit[]>({ key: 'academicUnit:list', fetcher: () => client.get('v1/academicUnit').json() })
}
