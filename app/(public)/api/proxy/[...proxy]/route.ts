import { base, getAccessToken, refresh, setResponseToken, withAuth } from '@/lib/proxy/util'
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
  const endpoint = `${pathSegments.join('/')}`
  const searchParams = request.nextUrl.searchParams.toString()
  const fullEndpoint = searchParams ? `${endpoint}?${searchParams}` : endpoint

  try {
    const body = request.method !== 'GET' ? await request.text() : undefined

    const { response, newTokens } = await withAuth(fullEndpoint, {
      method: request.method,
      headers: { 'Content-Type': request.headers.get('Content-Type') || 'application/json' },
      body,
    })

    const data = await response.text()

    let nextResponse = new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    })
    if (newTokens) {
      nextResponse = setResponseToken(nextResponse, newTokens)
    }

    return nextResponse
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 500 })
  }
}
