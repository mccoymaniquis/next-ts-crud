import { request } from '@/utils'

import type { TableDataResponse, UserResponse } from '@/types/apis'

interface dashboardProps {
  page: number
  limit: number
}

interface data {
  id: number
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  age: number
}

export type result = {
  result: string
}

export const getDashboard = (
  props: dashboardProps
): Promise<TableDataResponse> => {
  const { page = 1, limit = 10 } = props
  return request.get(`/api/v1/users/list`, { params: { page, limit } })
}

export const getUserById = (id: number): Promise<UserResponse> => {
  return request.get(`/api/v1/users/list/user`, { params: { id } })
}

export const updateUser = (params: data): Promise<result> => {
  const { id, ...rest } = params
  return request.put(`/api/v1/users/update-user?id=${id}`, rest)
}
