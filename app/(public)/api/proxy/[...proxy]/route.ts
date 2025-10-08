import { clearAuthCookies, readAuthTokenFromCookies, setAuthCookies, TokenResponse } from '@/lib/cookies'
import { api } from '@/lib/http'
import { NextRequest, NextResponse } from 'next/server'

export type ProxyParam = { params: Promise<{ proxy: string[] }> }
export async function GET(request: NextRequest, { params }: ProxyParam) {
  const { proxy } = await params
  return await handleProxyRequest(request, proxy)
}

export async function POST(request: NextRequest, { params }: ProxyParam) {
  const { proxy } = await params
  return await handleProxyRequest(request, proxy)
}

export async function PUT(request: NextRequest, { params }: ProxyParam) {
  const { proxy } = await params
  return await handleProxyRequest(request, proxy)
}

export async function DELETE(request: NextRequest, { params }: ProxyParam) {
  const { proxy } = await params
  return await handleProxyRequest(request, proxy)
}

const handleProxyRequest = async (request: NextRequest, pathSegments: string[]) => {
  console.log('Trying Proxy BFF')

  const { accessToken, refreshToken } = await readAuthTokenFromCookies()
  console.log('Found Auth Tokens: ', accessToken, refreshToken)

  const endpoint = `${pathSegments.join('/')}`
  const searchParams = request.nextUrl.searchParams.toString()
  const fullEndpoint = searchParams ? `${endpoint}?${searchParams}` : endpoint

  try {
    const headers = new Headers({
      ...request.headers,
      'Content-Type': request.headers.get('Content-Type') || 'application/json',
      Authorization: `Bearer ${accessToken}`,
    })
    const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text()

    let response = await api(endpoint, {
      method: request.method,
      headers,
      body,
      redirect: 'manual',
      throwHttpErrors: false,
    })

    if (response.status === 401 && refreshToken) {
      let reason: any
      try {
        reason = await response.clone().json()
      } catch {
        reason = null
      }
      console.log('Reason: ', reason)

      response = await api.post('v1/auth/refresh', { body: JSON.stringify({ refreshToken }) })

      if (response.ok) {
        const newTokens = await response.json<TokenResponse>()
        await setAuthCookies(newTokens)
        headers.set('Authorization', `Bearer ${newTokens.accessToken}`)

        response = await api(fullEndpoint, {
          method: request.method,
          headers,
          body,
          redirect: 'manual',
        })
      } else {
        await clearAuthCookies()
      }
    }

    return response
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 500 })
  }
}
