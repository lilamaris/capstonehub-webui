import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, setAuthCookies, clearAuthCookies, TokenResponse } from './lib/cookies'
import { api } from './lib/http'

export async function middleware(req: NextRequest) {
  const protectedPaths = ['/console']
  const pathname = req.nextUrl.pathname

  const requiresAuth = protectedPaths.some((p) => pathname.startsWith(p))
  if (!requiresAuth) return NextResponse.next()

  console.log('Middleware checkpoint request cookies: ', req.cookies.getAll())
  const accessToken = req.cookies.get(ACCESS_TOKEN_NAME)?.value
  const refreshToken = req.cookies.get(REFRESH_TOKEN_NAME)?.value
  console.log('Middleware checkpoint: accessToken -> ', accessToken)

  // --- Step 1. /user/me 호출
  let resp = await api.get('v1/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
    throwHttpErrors: false,
  })

  console.log('Middleware checkpoint: response ok?', resp.ok, 'status', resp.status)

  // --- Step 2. Access Token 만료 시 refresh 시도
  if (resp.status === 401 && refreshToken) {
    console.log('Middleware detected expired access token, trying refresh...')

    let reason: any
    try {
      reason = await resp.clone().json()
    } catch {
      reason = null
    }

    console.log('Middleware: failed reason: ', reason)

    const refreshResp = await api.post('v1/auth/refresh', {
      body: JSON.stringify({ refreshToken }),
      headers: { 'Content-Type': 'application/json' },
      throwHttpErrors: false,
    })

    if (refreshResp.ok) {
      const newTokens = await refreshResp.json<TokenResponse>()
      console.log('Middleware: token refreshed successfully')

      // 새 토큰 쿠키로 저장
      const res = NextResponse.next()
      setAuthCookies(newTokens, res.cookies)

      // 새로운 access token으로 user/me 재시도
      resp = await api.get('v1/user/me', {
        headers: { Authorization: `Bearer ${newTokens.accessToken}` },
        throwHttpErrors: false,
      })

      if (!resp.ok) {
        console.log('Middleware: retry after refresh failed, redirecting')
        clearAuthCookies(res.cookies)
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }

      const user = await resp.json()
      const encoded = Buffer.from(JSON.stringify(user)).toString('base64')
      res.headers.set('x-user-context', encoded)
      return res
    } else {
      console.log('Middleware: refresh failed, clearing cookies')
      const res = NextResponse.redirect(new URL('/auth/signin', req.url))
      clearAuthCookies(res.cookies)
      return res
    }
  }

  // --- Step 3. 인증 실패 (refresh 불가)
  if (!resp.ok) {
    console.log('Middleware: user/me check failed')
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  // --- Step 4. 정상 인증
  const user = await resp.json()
  const res = NextResponse.next()

  // SSR에 유저 정보 전달 (JSON 직렬화 → Base64 인코딩)
  const encoded = Buffer.from(JSON.stringify(user)).toString('base64')
  res.headers.set('x-user-context', encoded)
  return res
}
