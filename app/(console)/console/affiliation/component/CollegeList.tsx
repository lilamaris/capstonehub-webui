import { College } from '@/lib/domain/schema'
import { httpClient } from '@/lib/http/client'

export default async function CollegeList() {
  const data = await httpClient.get<College[]>('college').then((res) => res.data)

  console.log(data)
  return <div>I'm college!;</div>
}
