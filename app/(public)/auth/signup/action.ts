'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ActionState } from '@/lib/type'
import z from 'zod'
const ERROR_MESSAGE = '입력 정보가 올바르지 않습니다. 다시 확인해주세요.'

const signupSchema = z.object({
  email: z.email({ error: 'Email is not valid' }),
  name: z.string().min(1, { error: 'Name is required' }).max(20, { error: 'Name is must less then 20 characters' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
    .regex(/[A-Z]/, { message: '대문자를 포함해야 합니다.' })
    .regex(/[a-z]/, { message: '소문자를 포함해야 합니다.' })
    .regex(/[0-9]/, { message: '숫자를 포함해야 합니다.' })
    .regex(/[!@#$%^&*]/, { message: '특수문자를 포함해야 합니다.' }),
  confirmPassword: z.string().min(1, { message: '비밀번호 확인은 필수 입력 항목입니다.' }),
})

export default async function signupAction(state: ActionState<typeof signupSchema>, formData: FormData) {
  const form = Object.fromEntries(formData)
  const validatedFields = signupSchema.safeParse(form)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: ERROR_MESSAGE,
    }
  }

  const { email, password, name } = validatedFields.data

  try {
    const signupRes = await fetch('http://localhost:8080/api/v1/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    })

    if (!signupRes.ok) {
      throw new Error('Failed to signup')
    }

    const signinRes = await fetch('http://localhost:8080/api/v1/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })

    if (!signinRes.ok) {
      throw new Error('Failed to signin')
    }

    const token = await signinRes.text()
    const cookieStore = await cookies()
    cookieStore.set('session', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV == 'production',
      sameSite: 'lax',
    })
  } catch (err: any) {
    return { messasge: ERROR_MESSAGE }
  }

  return redirect('/')
}
