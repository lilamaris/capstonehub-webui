'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { createFacultySchema, CreateFaculty, Faculty } from '../schema'
import { useApiMutation } from '@/hooks/useApi'
import { mutate } from 'swr'

export interface FacultyFormProps {
  defaultValues?: CreateFaculty
  mutator: ReturnType<typeof useApiMutation<CreateFaculty, Faculty>>
}

export const CreateForm = ({ ...props }: FacultyFormProps) => {
  const { defaultValues = { name: '' }, mutator } = props

  const router = useRouter()
  const form = useForm<CreateFaculty>({
    resolver: zodResolver(createFacultySchema),
    defaultValues,
  })

  const handleSubmit = async (values: CreateFaculty) => {
    const newFaculty = await mutator.mutate(values)
    await mutate('faculty:list', undefined, { revalidate: true })
    if (mutator.error) {
      toast('Error while create faculty.', { description: `Message: ${mutator.error}` })
    } else if (newFaculty) {
      toast('Faculty has been created.', { description: `Id: ${newFaculty.id}` })
      router.push('/console/faculty')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Faculty</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
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
