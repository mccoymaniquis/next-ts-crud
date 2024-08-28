import React, { ReactElement, useState } from 'react'
import ViewModal from './ViewModal'
import UpdateModal from './UpdateModal'
interface ActionButtonProps {
  id: number
}
const ActionButton = (props: ActionButtonProps): ReactElement => {
  const { id } = props
  const [isView, setIsView] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  // const [viewModal, setViewModal] = useState(false)
  const handleUpdate = (id: number) => {
    // Implement the update logic here
    console.log(`Update user with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    // Implement the delete logic here
    const confirmUpdate = window.confirm(
      'Are you sure you want to delete this user?'
    )
    if (confirmUpdate) console.log(`Delete user with id: ${id}`)
  }

  return (
    <>
      <div className='flex flex-row flex-between gap-2'>
        <button
          className='px-4 py-2 bg-blue text-white rounded w-[100px]'
          onClick={() => setIsView(true)}
        >
          View
        </button>
        <button
          className='px-4 py-2 bg-blue text-white rounded w-[100px]'
          onClick={() => setIsUpdate(true)}
        >
          Update
        </button>
        <button
          className='px-4 py-2 bg-red-500 text-white rounded w-[100px]'
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
      {isView && (
        <ViewModal isOpen={isView} onClose={() => setIsView(false)} id={id} />
      )}

      {isUpdate && (
        <UpdateModal
          isOpen={isUpdate}
          onClose={() => setIsUpdate(false)}
          id={id}
        />
      )}
    </>
  )
}

export default ActionButton
