import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '@/apis/dashboard'
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
