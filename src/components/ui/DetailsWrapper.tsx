import React, { ReactElement, ReactNode } from 'react'
interface DetailProps {
  label: string
  content: string | number
}

interface DetailRowProps {
  children: ReactNode
}

export const DetailRow = (props: DetailRowProps): ReactElement => {
  const { children } = props

  return <div className='grid grid-col-1 md:grid-cols-2'>{children}</div>
}

export const Detail = (props: DetailProps): ReactElement => {
  const { label, content } = props

  return (
    <DetailRow>
      <div className='flex flex-row space-x-4'>
        <div>
          <p className='text-neutral-300 text-[14px] font-normal'>{label}</p>
        </div>
        <div>
          <p className='text-[16px] font-medium'>{content}</p>
        </div>
      </div>
    </DetailRow>
  )
}
