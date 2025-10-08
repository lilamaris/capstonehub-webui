// app/dashboard/page.tsx
'use client'

import { useSession } from '@/lib/auth/client'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Not authenticated</div>
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <p>Role: {session.user.role}</p>
    </div>
  )
}
