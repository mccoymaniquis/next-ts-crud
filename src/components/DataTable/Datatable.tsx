import { ReactElement } from 'react'
import ReactPaginate from 'react-paginate'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

interface DataTableProps {
  data: any[]
  columns: any[]
  isPagination?: boolean
  currentPage: number
  setCurrentPage: (page: number) => void
  limit: number
  totalPage: number
  totalCount: number
  isLoading: boolean
}

export type defaultValues = {
  data: any[]
}

const DataTable = (props: DataTableProps): ReactElement => {
  const {
    data,
    columns,
    isPagination = true,
    currentPage,
    limit,
    totalPage,
    totalCount,
    isLoading,
    setCurrentPage,
  } = props
  const table = useReactTable({
    data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  })

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1)
  }
  const showNextButton = currentPage !== totalPage
  const showPrevButton = currentPage !== 1

  console.log(data)

  return (
    <>
      <div className='px-2 '>
        <div className='overflow-x-auto'>
          <table className='min-w-full table-fixed border-collapse'>
            <thead className='bg-gray-800 text-white'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`py-2 px-4 border border-gray-900 `}
                      style={{ width: header.getSize() }}
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
                      className={`py-2 px-4 border border-gray-900 text-center`}
                      style={{
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.length === 0 && (
          <div className='p-4 text-[20px] font-semibold text-center'>
            NO DATA
          </div>
        )}
        {isLoading && (
          <div className='flex justify-center mt-4'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900'></div>
          </div>
        )}
        {data.length === 0 ||
          (isPagination && (
            <div className='flex flex-col md:flex-row items-center justify-between mt-4'>
              <div className=''>
                {`Showing ${currentPage * limit - limit + 1} - 
                    ${
                      currentPage === totalPage
                        ? totalCount
                        : currentPage * limit
                    } 
                    of ${totalCount}`}
              </div>
              <div>
                <ReactPaginate
                  breakLabel={<div className='mr-4 mb-2'>{'...'}</div>}
                  nextLabel={
                    showNextButton ? (
                      <div className='hover:bg-gray-900 w-10 h-10 pt-2 rounded-md hover:text-white text-center border-gray-900 border'>
                        {'>'}
                      </div>
                    ) : null
                  }
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  pageCount={totalPage}
                  forcePage={currentPage - 1}
                  previousLabel={
                    showPrevButton ? (
                      <div className='hover:bg-gray-900 w-10 h-10 pt-2 rounded-md hover:text-white text-center border-gray-900 border mr-3'>
                        {'<'}
                      </div>
                    ) : null
                  }
                  renderOnZeroPageCount={null}
                  className='flex items-end justify-end text-black '
                  pageClassName='hover:bg-gray-900 hover:text-white w-10 h-10 flex items-center justify-center rounded-md mr-3 text-[14px] font-medium border-gray-900 border'
                  activeClassName='bg-gray-900 text-white'
                />
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default DataTable
