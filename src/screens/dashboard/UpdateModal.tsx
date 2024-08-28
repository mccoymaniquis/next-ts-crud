import { ReactElement, useEffect } from 'react'
import Modal from 'components/Modal'
import { useGetUserById } from 'react-query/queries'
import { useForm, SubmitHandler } from 'react-hook-form'
import Form from '@forms/Form'
import Input from '@forms/Input'
import Button from '@forms/Button'
import { FormInputWrapper } from 'components/ui/FormWrapper'
import { userSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserData, FormUserValues } from '@/types'
import { useUpdateUser } from 'react-query/mutations/dashboard'

interface UpdateModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
}

const UpdateModal = (props: UpdateModalProps): ReactElement => {
  const { isOpen, onClose, id } = props
  const { data } = useGetUserById(id) || {}

  const result = data?.result as UserData

  const method = useForm<FormUserValues>({
    defaultValues: result,
    resolver: zodResolver(userSchema),
  })

  const { reset } = method

  useEffect(() => {
    if (data) {
      reset(result)
    }
  }, [data, reset, result])

  const updateUser = useUpdateUser()

  const onSubmit: SubmitHandler<FormUserValues> = (data) => {
    const newData = { ...data, id }
    console.log(newData)
    updateUser.mutate(newData, {
      onSuccess: (responseData) => {
        alert('Succesfully updated')
      },
      onError: (error) => {
        console.error('update error:', error)
      },
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalSizeClass='max-w-[780px] h-auto'
      title={'Update Information'}
    >
      <Form methods={method} onSubmit={onSubmit}>
        <FormInputWrapper>
          <Input name='firstName' label='Firstname' required />
          <Input name='middleName' label='Middlename' />
        </FormInputWrapper>
        <Input name='lastName' label='Lastname' required />
        <Input name='dateOfBirth' label='Birthdate' required />
        <Button label='Update' type='submit' />
      </Form>
    </Modal>
  )
}

export default UpdateModal
