'use server'

import { redirect } from 'next/navigation'

import { ActionState } from '@/lib/type'
import z from 'zod'
import { setAuthCookies, TokenResponse } from '@/lib/cookies'
import { api } from '@/lib/http'

const ERROR_MESSAGE = '입력 정보가 올바르지 않습니다. 다시 확인해주세요.'

const schema = z.object({
  email: z.email({ error: 'Email is not valid' }),
  password: z.string().min(1, { error: 'Password is required' }),
})
export default async function signinAction(state: ActionState<typeof schema>, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      // errors: z.treeifyError(validatedFields.error).properties,
      message: ERROR_MESSAGE,
    }
  }

  const { email, password } = parsed.data

  const body = JSON.stringify({ email, password })
  const tokens = await api.post('v1/auth/signin', { body }).json<TokenResponse>()
  console.log(tokens)
  await setAuthCookies(tokens)
  return redirect('/')
}
