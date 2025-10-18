import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import { Fragment } from 'react'

export default function Page() {
  return (
    <Fragment>
      <section>
        <header>Managed academic resources</header>
        <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-3">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total faculty</CardDescription>
              <CardTitle>5</CardTitle>
              <CardAction>
                <ArrowUpRight />
              </CardAction>
            </CardHeader>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Department</CardDescription>
              <CardTitle>7</CardTitle>
              <CardAction>
                <ArrowUpRight />
              </CardAction>
            </CardHeader>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total AcademicUnit</CardDescription>
              <CardTitle>2</CardTitle>
              <CardAction>
                <ArrowUpRight />
              </CardAction>
            </CardHeader>
          </Card>
        </div>
      </section>
      <section>
        <header>Managed student summary</header>
      </section>
    </Fragment>
  )
}
