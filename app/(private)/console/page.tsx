import { useServerSession } from '@/lib/session'
import { UserDetail } from './components/user-detail'

interface User {
  id: string
  name: string
  email: string
  role: string
}
export default async function Page() {
  return (
    <div>
      <h1>Hello</h1>
      <UserDetail />
    </div>
  )
}
