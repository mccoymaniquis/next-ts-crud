import type { ErrorResponse } from '@/types/apis'
import type { SignInBody, SignInResponse } from '@/types/auth'

import { useMutation, UseMutationResult } from '@tanstack/react-query'

import { signIn } from '@/apis'

export const useSignIn = (): UseMutationResult<
  SignInResponse,
  ErrorResponse,
  SignInBody
> => {
  return useMutation({ mutationFn: signIn, mutationKey: ['signIn'] })
}
