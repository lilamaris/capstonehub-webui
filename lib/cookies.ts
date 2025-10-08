import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export interface ErrorResponse {
  error: string
}

export interface TokenResponse {
  accessToken: string
  refreshToken: string
  atMaxAge?: number
  rtMaxAge?: number
}

const isProd = process.env.NODE_ENV === 'production'
export const ACCESS_TOKEN_NAME = process.env.ACCESS_TOKEN_NAME || 'access_token'
export const REFRESH_TOKEN_NAME = process.env.REFRESH_TOKEN_NAME || 'refresh_tok'

const base = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
}

export const setAuthCookies = async (tokens: TokenResponse, cookieStore?: ResponseCookies) => {
  const c = cookieStore ?? (await cookies())
  c.set(ACCESS_TOKEN_NAME, tokens.accessToken, { ...base, maxAge: tokens.atMaxAge })
  c.set(REFRESH_TOKEN_NAME, tokens.refreshToken, { ...base, maxAge: tokens.rtMaxAge })
}

export const clearAuthCookies = async (cookieStore?: ResponseCookies) => {
  const c = cookieStore ?? (await cookies())
  c.delete(ACCESS_TOKEN_NAME)
  c.delete(REFRESH_TOKEN_NAME)
}

export const readAuthTokenFromCookies = async (): Promise<{ accessToken?: string; refreshToken?: string }> => {
  const c = await cookies()
  const accessToken = c.get(ACCESS_TOKEN_NAME)?.value
  const refreshToken = c.get(REFRESH_TOKEN_NAME)?.value

  return { accessToken, refreshToken }
}
