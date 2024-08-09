import type { ErrorResponse } from '@/types/apis'
import type {
  SignInBody,
  VerifySignUpBody,
  VerifySignInBody,
  ResenOTPBody,
  SignInResponse,
  VerifySignUpResponse,
  VerifySignInResponse,
  ResenOTPResponse,
} from '@/types/auth'

import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { useCookie } from 'react-use'
import { useRouter } from 'next/router'

import { signIn, verifySignUp, verifySignIn, resendOTP } from '@/apis'

export const useSignIn = (): UseMutationResult<
  SignInResponse,
  ErrorResponse,
  SignInBody
> => {
  const sessionOptions = {
    cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME,
    cookieOptions: {
      maxAge: undefined,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'Lax' : 'strict',
    },
  } as const
  const [, updateCookie] = useCookie(sessionOptions.cookieName)

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data: SignInResponse) => {
      updateCookie(data.token, sessionOptions.cookieOptions)
      window.location.href = '/dashboard'
    },
    onError: (error: ErrorResponse) => {
      console.error('Sign in error:', error)
    },
  })
}

export const useVerifySignUp = (): UseMutationResult<
  VerifySignUpResponse,
  ErrorResponse,
  VerifySignUpBody
> => {
  const { push } = useRouter()

  return useMutation({
    mutationFn: verifySignUp,
    onSuccess: async () => {
      push('/signin')
    },
  })
}

export const useVerifySignIn = (): UseMutationResult<
  VerifySignInResponse,
  ErrorResponse,
  VerifySignInBody
> => {
  const sessionOptions = {
    cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME,
    cookieOptions: {
      maxAge: undefined,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'Lax' : 'none',
    },
  } as const
  const [, updateCookie] = useCookie(sessionOptions.cookieName)
  return useMutation({
    mutationFn: verifySignIn,
    onSuccess: async (data) => {
      updateCookie(data.token, sessionOptions.cookieOptions)
    },
  })
}

export const useResendOTP = (): UseMutationResult<
  ResenOTPResponse,
  ErrorResponse,
  ResenOTPBody
> => {
  return useMutation({ mutationFn: resendOTP, mutationKey: ['resendOTP'] })
}
