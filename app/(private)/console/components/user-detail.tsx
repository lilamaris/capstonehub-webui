'use client'

import { client } from '@/lib/http'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export const UserDetail = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    client.get<User>('v1/user/me').json<User>().then(setUser)
  }, [])

  if (!user) return <p>Loading ...</p>

  return (
    <ul>
      {JSON.stringify(user, null, 2)}
      <li>{user.id}</li>
      <li>{user.name}</li>
      <li>{user.email}</li>
      <li>{user.role}</li>
    </ul>
  )
}
