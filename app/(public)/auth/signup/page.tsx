import Link from 'next/link'
import { Package2Icon } from 'lucide-react'

import SignupForm from './components/form'
import TermsAndService from '@/components/terms'
import { SITE } from '@/const/site'

export default async function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <header className="flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Package2Icon className="size-4" />
            </div>
            {SITE.name}
          </Link>
        </header>
        <main className="flex flex-col gap-6">
          <SignupForm />
          <TermsAndService />
        </main>
      </div>
    </div>
  )
}
