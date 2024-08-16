'use client'
import { ReactElement, useState, useEffect } from 'react'
import { useGetDashboard } from '@/react-query/queries'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

interface dashboardProps {
  page?: number
  limit?: number
}

export type User = {
  id: number
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  age: number
}

const Dashboard = (props: dashboardProps): ReactElement => {
  const { page = 1, limit = 10 } = props
  const { data } = useGetDashboard({ page, limit })

  const tableData = data?.result?.data || []

  const columnHelper = createColumnHelper<User>()

  const columns = [
    columnHelper.accessor('id', {
      header: () => 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor(
      (row) => `${row.firstName} ${row.middleName} ${row.lastName}`,
      {
        id: 'fullName',
        header: () => 'Fullname',
        cell: (info) => info.getValue(),
      }
    ),
    columnHelper.accessor('dateOfBirth', {
      header: () => 'Birthday',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('age', {
      header: () => 'Age',
      cell: (info) => info.getValue(),
    }),
  ]

  const table = useReactTable({
    data: tableData,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <div className='py-4'>
        <span className='text-[24px]'>Dashboard</span>
      </div>
      <div className='rounded-lg border border-gray-500'>
        <table className='w-full bg-white border-collapse overflow-y-auto'>
          <thead className='bg-gray-800 text-white'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='py-2 px-4 border border-gray-500'
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='bg-gray-100'>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className='py-2 px-4 border border-gray-500 text-center text-wrap'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Dashboard
