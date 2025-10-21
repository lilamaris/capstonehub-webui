'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { createDepartmentSchema, CreateDepartment, Department } from '../schema'
import { useApiMutation } from '@/hooks/useApi'
import { mutate } from 'swr'

export interface DepartmentFormProps {
  defaultValues?: CreateDepartment
  mutator: ReturnType<typeof useApiMutation<CreateDepartment, Department>>
}

export const CreateForm = ({ ...props }: DepartmentFormProps) => {
  const { defaultValues = { name: '' }, mutator } = props

  const router = useRouter()
  const form = useForm<CreateDepartment>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues,
  })

  const handleSubmit = async (values: CreateDepartment) => {
    const newDept = await mutator.mutate(values)
    await mutate('department:list', undefined, { revalidate: true })
    if (mutator.error) {
      toast('Error while create department.', { description: `Message: ${mutator.error}` })
    } else if (newDept) {
      toast('Department has been created.', { description: `Id: ${newDept.id}` })
      router.push('/console/department')
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
              <FormLabel>Name of Department</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
              <FormDescription>This is the name that will be displayed for the department</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
