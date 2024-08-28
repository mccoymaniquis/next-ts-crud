import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import { UserData } from '@/types'
import { updateUser } from 'apis'

interface SuccessResponse {
  result: string
}
interface ErrorResponse {
  error: string
}

export const useUpdateUser = (): UseMutationResult<
  SuccessResponse,
  ErrorResponse,
  UserData
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['dashboard'] })
    },
  })
}
