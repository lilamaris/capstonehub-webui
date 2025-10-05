import ky from 'ky'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export interface ErrorResponse {
  error: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
  atMaxAge: number
  rtMaxAge: number
}

export const API_URL = process.env.API_URL || 'http://localhost:8080/api'
export const ACCESS_TOKEN_NAME = 'access_tok'
export const REFRESH_TOKEN_NAME = 'refresh_tok'

export const getAccessToken = async () => {
  return (await cookies()).get(ACCESS_TOKEN_NAME)?.value
}

export const getRefreshToken = async () => {
  return (await cookies()).get(REFRESH_TOKEN_NAME)?.value
}

export const setResponseToken = (response: NextResponse, tokens: TokenResponse) => {
  response.cookies.set(ACCESS_TOKEN_NAME, tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: tokens.atMaxAge,
    path: '/',
  })

  response.cookies.set(REFRESH_TOKEN_NAME, tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: tokens.rtMaxAge,
    path: '/',
  })

  return response
}

export const setContextToken = async (tokens: TokenResponse) => {
  const ck = await cookies()

  ck.set(ACCESS_TOKEN_NAME, tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: tokens.atMaxAge,
    path: '/',
  })
  ck.set(REFRESH_TOKEN_NAME, tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: tokens.rtMaxAge,
    path: '/',
  })
}

export const refresh = async (): Promise<TokenResponse | null> => {
  const refreshToken = await getRefreshToken()

  const body = JSON.stringify({ refreshToken })
  return await base.post('v1/auth/refresh', { body }).json<TokenResponse>()
}

export const withAuth = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<{ response: Response; newTokens?: TokenResponse }> => {
  let accessToken = await getAccessToken()
  let response = await base(endpoint, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
    throwHttpErrors: false,
  })

  if (response.status === 401) {
    const newTokens = await refresh()

    if (newTokens) {
      response = await base(endpoint, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${newTokens.accessToken}` },
      })
      return { response, newTokens }
    }
  }

  return { response }
}

export const base = ky.create({ prefixUrl: API_URL, headers: { 'Content-Type': 'application/json' } })
