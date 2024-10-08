'use client'
import { ReactElement, useState } from 'react'
import { useGetDashboard } from '@/react-query/queries'
import { createColumnHelper, ColumnDef } from '@tanstack/react-table'
import { UserData } from '@/types'
import DataTable from 'components/DataTable/Datatable'
import ActionButton from './ActionButton'
interface DashboardProps {
  page?: number
  limit?: number
}
const Dashboard = (props: DashboardProps): ReactElement => {
  const { page = 1, limit = 10 } = props
  const [currentPage, setCurrentPage] = useState(page)
  const { data, isLoading } = useGetDashboard({ page: currentPage, limit })

  const tableData = data?.result?.data || []

  const columnHelper = createColumnHelper<UserData>()

  const columns: ColumnDef<UserData, any>[] = [
    columnHelper.accessor(
      (row) => `${row.firstName} ${row.middleName} ${row.lastName}`,
      {
        id: 'fullName',
        header: () => 'Fullname',
        cell: (info) => info.getValue(),
        size: 500,
      }
    ),
    columnHelper.accessor('dateOfBirth', {
      header: () => 'Birthday',
      cell: (info) => info.getValue(),
      size: 200,
    }),
    columnHelper.accessor('age', {
      header: () => 'Age',
      cell: (info) => info.getValue(),
      size: 50,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => 'Actions',
      cell: (info) => {
        const userId = info.row.original.id
        // return (
        //   <div className='flex flex-row flex-between gap-2'>
        //     <button
        //       className='px-4 py-2 bg-blue text-white rounded w-[100px]'
        //       onClick={() => handleView(userId)}
        //     >
        //       View
        //     </button>
        //     <button
        //       className='px-4 py-2 bg-blue text-white rounded w-[100px]'
        //       onClick={() => handleUpdate(userId)}
        //     >
        //       Update
        //     </button>
        //     <button
        //       className='px-4 py-2 bg-red-500 text-white rounded w-[100px]'
        //       onClick={() => handleDelete(userId)}
        //     >
        //       Delete
        //     </button>
        //   </div>
        // )
        return <ActionButton id={userId} />
      },
      size: 280,
    }),
  ]

  return (
    <div className='p-4 '>
      <div className='py-4'>
        <span className='text-[24px]'>Dashboard</span>
      </div>
      <DataTable
        data={tableData}
        columns={columns}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        totalPage={data?.result?.totalPage || 1}
        totalCount={data?.result?.totalCount || 0}
        isLoading={isLoading}
      />
    </div>
  )
}
export default Dashboard
