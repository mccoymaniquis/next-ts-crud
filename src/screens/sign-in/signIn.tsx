'use client'
import { ReactElement, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useSignIn } from 'react-query/mutations/auth' // Assuming this is where your hook is defined
import { FormValues } from './utils/LoginFormValues'
import { initialValues } from './utils/InitialValues'
import Form from '@forms/Form'
import Input from '@forms/Input'

const Page = (): ReactElement => {
  const signIn = useSignIn() // Custom hook for signing in

  const methods = useForm<FormValues>({
    defaultValues: initialValues,
  })

  const [error, setError] = useState('')

  // Ensure the onSubmit function is typed as SubmitHandler<FormValues>
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signIn.mutate(data, {
      onSuccess: (responseData) => {
        // console.log('Sign in successful:')
        setError('')
      },
      onError: (error) => {
        // console.error('Sign in error:', error)
        setError(error.message)
        // Handle error (e.g., show error message)
      },
    })
  }

  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <div className='bg-white shadow-md rounded border p-24 w-[30rem]'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <Form methods={methods} onSubmit={onSubmit}>
          <Input name='username' label='Username' required />
          <Input name='password' label='Password' type='password' required />
          <div className='pt-1 text-red-500 text-[14px]'>{error}</div>
          <div className='flex justify-between items-end'>
            <button
              className='rounded-sm btn btn-sm btn-secondary w-[120px] p-2'
              type='submit'
            >
              Sign In
            </button>
            <a
              className='text-xs text-blue hover:text-sky-700 underline'
              href='#'
            >
              Forgot Password?
            </a>
          </div>
          <div className='flex justify-end'>
            <a
              className='text-xs text-blue hover:text-sky-700 underline'
              href='#'
            >
              Create Account
            </a>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Page
