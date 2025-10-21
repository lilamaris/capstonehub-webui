'use client'

import { useApi } from '@/hooks/useApi'
import { client } from '@/lib/http'
import { Department } from '../schema'

export function useDepartmentList() {
  return useApi<Department[]>({ key: 'department:list', fetcher: () => client.get('v1/department').json() })
}
