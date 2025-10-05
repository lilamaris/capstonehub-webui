import ky from 'ky'

const proxyBase = ky.create({
  prefixUrl: '/api/proxy',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
})

const api = {
  get: <T>(url: string, options?: RequestInit) => proxyBase.get(url, options).json<T>(),
  post: <T>(url: string, body?: any, options?: RequestInit) =>
    proxyBase.post(url, { ...options, json: body }).json<T>(),
  put: <T>(path: string, body?: any, options?: RequestInit) =>
    proxyBase.put(path, { ...options, json: body }).json<T>(),
  delete: <T>(path: string, options?: RequestInit) => proxyBase.delete(path, options).json<T>(),
}

export default api
