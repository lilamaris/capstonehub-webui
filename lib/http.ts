import ky from 'ky'

const apiPrefixUrl = `${process.env.API_URL}/api`
export const api = ky.create({
  prefixUrl: apiPrefixUrl,
  headers: { 'Content-Type': 'application/json' },
  throwHttpErrors: false,
})

const clientPrefixUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy`
export const client = api.extend({
  prefixUrl: clientPrefixUrl,
  credentials: 'include',
  cache: 'no-store',
})
