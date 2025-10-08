import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex gap-2">
      HelloWorld!
      <Link href="/auth/signin">Signin</Link>
      <Link href="/console">Console</Link>
    </div>
  )
}
