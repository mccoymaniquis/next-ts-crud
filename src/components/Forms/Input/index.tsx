import React, { ReactElement } from 'react'
import { useFormContext } from '../FormContext'

interface InputProps {
  name: string
  label: string
  required?: boolean
  type?: string
}

const Input: React.FC<InputProps> = (props: InputProps): ReactElement => {
  const { name, label, required = false, type = 'text' } = props
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className='flex flex-col w-full font-custom text-black'>
      <label htmlFor={name} className='font-custom'>
        {label}
        {required && <span className='text-red-600'> *</span>}
      </label>
      <input
        className={`border rounded-sm p-2 text-black ${
          errors[name] && 'border-red-500'
        }`}
        id={name}
        type={type}
        {...register(name, { required: required && `${label} is required` })}
      />
      {errors[name] && (
        <p className='text-red-600 text-[14px]'>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}

export default Input
