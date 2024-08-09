import React, { ReactElement } from 'react'
import { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form'
import { FormProvider } from '../Forms/FormContext'

interface FormProps<T extends FieldValues> {
  children: React.ReactNode
  methods: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

const Form = <T extends FieldValues>(props: FormProps<T>): ReactElement => {
  const { children, methods, onSubmit } = props

  return (
    <FormProvider methods={methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-4'>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
