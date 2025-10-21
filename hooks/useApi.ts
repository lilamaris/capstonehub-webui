'use client'

import { client } from '@/lib/http'
import { useCallback, useState } from 'react'
import useSWR from 'swr'

type Fetcher<T> = () => Promise<T>

export interface APIFetcherProps<T> {
  key: string
  fetcher: Fetcher<T>
  options?: Parameters<typeof useSWR<T>>[2]
}
export function useApi<T>({ ...props }: APIFetcherProps<T>) {
  const { key, fetcher, options } = props
  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10_000,
    ...options,
  })

  return {
    data,
    error,
    isLoading,
    refresh: mutate,
  }
}

export interface APIMutationProps {
  endpoint: string
  method?: 'POST' | 'PUT' | 'DELETE'
}

export function useApiMutation<TI, TO>({ ...props }: APIMutationProps) {
  const { endpoint, method = 'POST' } = props
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const mutate = useCallback(
    async (input: TI): Promise<TO | null> => {
      setLoading(true)
      setError(null)
      try {
        const res = await client(endpoint, {
          method,
          body: JSON.stringify(input),
        })
        if (!res.ok) throw new Error(await res.text())
        return res.json<TO>()
      } catch (e) {
        setError(e)
        return null
      } finally {
        setLoading(false)
      }
    },
    [props],
  )
  return { mutate, isLoading, error }
}
