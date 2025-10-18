import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, setAuthCookies, clearAuthCookies, TokenResponse } from './lib/cookies'
import { api } from './lib/http'

export async function middleware(req: NextRequest) {
  const protectedPaths = ['/console']
  const pathname = req.nextUrl.pathname

  const requiresAuth = protectedPaths.some((p) => pathname.startsWith(p))
  if (!requiresAuth) return NextResponse.next()

  const accessToken = req.cookies.get(ACCESS_TOKEN_NAME)?.value
  const refreshToken = req.cookies.get(REFRESH_TOKEN_NAME)?.value

  let resp = await api.get('v1/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
    throwHttpErrors: false,
  })

  if (resp.status === 401 && refreshToken) {
    let reason: any
    try {
      reason = await resp.clone().json()
    } catch {
      reason = null
    }

    const refreshResp = await api.post('v1/auth/refresh', {
      body: JSON.stringify({ refreshToken }),
      headers: { 'Content-Type': 'application/json' },
      throwHttpErrors: false,
    })

    if (refreshResp.ok) {
      const newTokens = await refreshResp.json<TokenResponse>()
      const res = NextResponse.next()
      setAuthCookies(newTokens, res.cookies)

      resp = await api.get('v1/user/me', {
        headers: { Authorization: `Bearer ${newTokens.accessToken}` },
        throwHttpErrors: false,
      })

      if (!resp.ok) {
        clearAuthCookies(res.cookies)
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }

      const user = await resp.json()
      const encoded = Buffer.from(JSON.stringify(user)).toString('base64')
      res.headers.set('x-user-context', encoded)
      return res
    } else {
      const res = NextResponse.redirect(new URL('/auth/signin', req.url))
      clearAuthCookies(res.cookies)
      return res
    }
  }

  if (!resp.ok) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  const user = await resp.json()
  const res = NextResponse.next()

  const encoded = Buffer.from(JSON.stringify(user)).toString('base64')
  res.headers.set('x-user-context', encoded)
  return res
}
