import { useQuery } from '@tanstack/react-query'
import { getDashboard, getUserById } from '@/apis/dashboard'
interface dashboardProps {
  page: number
  limit: number
}

export const useGetDashboard = (props: dashboardProps) => {
  const { page = 1, limit = 10 } = props
  return useQuery({
    queryKey: ['dashboard', page, limit],
    queryFn: () => getDashboard(props),
  })
}

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ['list-user', id],
    queryFn: () => getUserById(id),
  })
}
