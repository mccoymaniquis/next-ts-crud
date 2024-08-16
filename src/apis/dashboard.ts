import { request } from '@/utils'

interface dashboardProps {
  page: number
  limit: number
}
export type User = {
  id: number
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  age: number
}
export type TableData = {
  data: User[]
  totalCount: number
  totalPage: number
  limit: number
}
export type ResultData = {
  result: TableData
}
export const getDashboard = (props: dashboardProps): Promise<ResultData> => {
  const { page = 1, limit = 10 } = props
  return request.get(`/api/v1/users/list?page=${page}&limit=${limit}`)
}
