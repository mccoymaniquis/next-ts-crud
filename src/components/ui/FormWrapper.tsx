import React, { ReactElement, ReactNode } from 'react'

export const FormInputWrapper = (props: {
  children: ReactNode
}): ReactElement => {
  const { children } = props

  return <div className='grid grid-col-1 md:grid-cols-2 gap-4'>{children}</div>
}
