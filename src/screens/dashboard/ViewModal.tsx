import { ReactElement } from 'react'
import Modal from 'components/Modal'
import { useGetUserById } from 'react-query/queries'
import { Detail, DetailRow } from 'components/ui/DetailsWrapper'
import Skeleton from 'components/ui/Skeleton'
interface ViewModalProps {
  isOpen: boolean
  onClose: () => void
  id: number
}
export type User = {
  id: number
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  age: number
}
const ViewModal = (props: ViewModalProps): ReactElement => {
  const { isOpen, onClose, id } = props
  const { data, isLoading } = useGetUserById(id) || {}

  const result = data?.result as User

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalSizeClass='max-w-[780px] h-auto'
      title={'Details Information'}
    >
      {isLoading ? (
        <div className='space-y-4'>
          <div className='w-full flex flex-row flex-between space-x-4'>
            <Skeleton className='w-full h-[24px] rounded-md' />
            <Skeleton className='w-full h-[24px] rounded-md' />
          </div>
          <div className='w-full flex flex-row flex-between space-x-4'>
            <Skeleton className='w-full h-[24px] rounded-md' />
            <Skeleton className='w-full h-[24px] rounded-md' />
          </div>
          <div className='w-full flex flex-row flex-between space-x-4'>
            <Skeleton className='w-full h-[24px] rounded-md' />
          </div>
        </div>
      ) : (
        <>
          <DetailRow>
            <Detail label={'Firstname'} content={result?.firstName || '-'} />
            <Detail label={'MiddleName'} content={result?.middleName || '-'} />
          </DetailRow>
          <DetailRow>
            <Detail label={'LastName'} content={result?.lastName || '-'} />
            <Detail label={'Age'} content={result?.age || '-'} />
          </DetailRow>
          <Detail label={'Birthdate'} content={result?.dateOfBirth || '-'} />
        </>
      )}

      {/* <div className='mt-[15px] flex justify-between'>
        <div
          className={`animate-pulse bg-neutral-100 w-full h-[24px] max-w-[250px] rounded-md mr-[10px]`}
        ></div>
        <div
          className={`animate-pulse bg-neutral-100 w-full h-[24px] max-w-[250px] rounded-md`}
        ></div>
      </div> */}
    </Modal>
  )
}

export default ViewModal
