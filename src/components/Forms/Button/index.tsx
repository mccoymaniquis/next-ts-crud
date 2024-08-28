import React, { ReactElement } from 'react'

interface InputProps {
  label: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const Button: React.FC<InputProps> = (props: InputProps): ReactElement => {
  const { label, type = 'button', className } = props

  return (
    <button
      className={`rounded-sm btn btn-sm btn-secondary p-2 w-full ${className}`}
      type={type}
    >
      {label}
    </button>
  )
}

export default Button
