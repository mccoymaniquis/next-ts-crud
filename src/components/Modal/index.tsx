import { ReactElement, ReactNode } from 'react'
import CloseIcon from 'public/icons/close.svg'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  modalSizeClass?: string
}
const Modal = ({
  isOpen = false,
  onClose,
  children,
  title = '',
  modalSizeClass = '',
}: ModalProps): ReactElement => {
  // const handleClose = (event: any) => {
  //   if (event.target.id === 'wrapper') {
  //     onClose()
  //   }
  // }
  return (
    <>
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.50)] backdrop-blur-sm '
          role='dialog'
          aria-modal='true'
          id='wrapper'
        >
          <div
            className={`relative w-full bg-white rounded-md ${modalSizeClass}`}
          >
            <div className='flex w-full bg-gray-800 rounded-t-md justify-between px-4'>
              <div className='text-2xl font-bold py-2 text-white'>{title}</div>
              <div className='py-2'>
                <CloseIcon
                  className='text-white cursor-pointer'
                  height={30}
                  width={30}
                  onClick={onClose}
                />
              </div>
            </div>
            <div className='p-4'>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
