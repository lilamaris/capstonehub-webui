'use client'

import { useApi } from '@/hooks/useApi'
import { client } from '@/lib/http'
import { Faculty } from '../schema'

export function useFacultyList() {
  return useApi<Faculty[]>({ key: 'faculty:list', fetcher: () => client.get('v1/faculty').json() })
}
