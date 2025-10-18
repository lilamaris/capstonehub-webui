'use client'

import { client } from '@/lib/http'
import { useEffect, useState } from 'react'

export interface Faculty {
  id: string
  name: string
}

export const FacultyList = () => {
  const [faculties, setFaculties] = useState<Faculty[] | null>(null)

  useEffect(() => {
    client.get<Faculty[]>('v1/faculty').json<Faculty[]>().then(setFaculties)
  }, [])

  if (!faculties) return <p>Failed to fetch faculties...</p>
  return (
    <ul>
      {faculties.map((faculty) => (
        <li>{faculty.name}</li>
      ))}
    </ul>
  )
}
