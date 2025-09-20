import { Suspense } from 'react'
import CollegeList from './component/CollegeList'
import CreateCollegeForm from './component/CreateCollegeForm'

export default function AffiliationMainPage() {
  return (
    <div>
      <header>
        <h1>Colleges</h1>
      </header>
      <main>
        <Suspense fallback={<div>is Loading!!</div>}>
          <CollegeList />
        </Suspense>
        <CreateCollegeForm />
      </main>
    </div>
  )
}
