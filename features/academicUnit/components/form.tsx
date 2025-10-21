'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mutate } from 'swr'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useApiMutation } from '@/hooks/useApi'
import { AcademicUnit, schemaMap, SchemaOf, ValueOf } from '../schema'
import { useEffect, useMemo } from 'react'
import { toast } from 'sonner'
import { DatePicker } from '@/components/date-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFacultyList } from '@/features/faculty/hooks/useFaculty'
import { useDepartmentList } from '@/features/department/hooks/useDepartment'
import { Skeleton } from '@/components/ui/skeleton'

export function CreateTimelineForm({
  mutator,
}: {
  mutator: ReturnType<typeof useApiMutation<ValueOf<'create'>, AcademicUnit>>
}) {
  const { data: faculties, isLoading: facLoading } = useFacultyList()
  const { data: departments, isLoading: deptLoading } = useDepartmentList()

  const router = useRouter()
  const form = useForm<ValueOf<'create'>>({
    resolver: zodResolver(schemaMap['create']),
    defaultValues: { facultyId: '', departmentId: '', validAt: new Date() } as ValueOf<'create'>,
  })

  const handleSubmit = async (values: ValueOf<'create'>) => {
    const newTimeline = await mutator.mutate(values)
    await mutate('academicUnit:list', undefined, { revalidate: true })
    if (mutator.error) {
      toast('Error while create academic unit', { description: `Message: ${mutator.error}` })
    } else if (newTimeline) {
      toast('Academic Unit has been created.', { description: `Id: ${newTimeline.id}` })
      router.push('/console/academic-unit')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="facultyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty</FormLabel>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {facLoading ? (
                      <Skeleton className="h-4" />
                    ) : (
                      faculties &&
                      faculties.map((faculty) => (
                        <SelectItem key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is the name that will be displayed for the faculty</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {deptLoading ? (
                      <Skeleton className="h-4" />
                    ) : (
                      departments &&
                      departments.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is the name that will be displayed for the faculty</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="validAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valid start date</FormLabel>
              <FormControl>
                <DatePicker onChange={field.onChange} defaultValue={field.value} />
              </FormControl>
              <FormDescription>This is the name that will be displayed for the faculty</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
