import type { ErrorResponse } from "@/types/apis";
import type {
  SignInBody,
  VerifySignUpBody,
  VerifySignInBody,
  ResenOTPBody,
  SignInResponse,
  VerifySignUpResponse,
  VerifySignInResponse,
  ResenOTPResponse,
} from "@/types/auth";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useCookie } from "react-use";
import { useRouter } from "next/router";

import { signIn, verifySignUp, verifySignIn, resendOTP } from "@/apis";

export const useSignIn = (): UseMutationResult<
  SignInResponse,
  ErrorResponse,
  SignInBody
> => {
  return useMutation({mutationFn: signIn, mutationKey: ['signIn']});
};

export const useVerifySignUp = (): UseMutationResult<
  VerifySignUpResponse,
  ErrorResponse,
  VerifySignUpBody
> => {
  const { push } = useRouter();

  return useMutation({mutationFn: verifySignUp, mutationKey: ['verifySignUp'],
    onSuccess: async () => {
      push("/signin");
    },
  });
};

export const useVerifySignIn = (): UseMutationResult<
  VerifySignInResponse,
  ErrorResponse,
  VerifySignInBody
> => {
  const [, updateCookie] = useCookie(process.env.NEXT_PUBLIC_COOKIE_NAME);

  return useMutation({mutationFn: verifySignIn, mutationKey: ['verifySignIn'],
    onSuccess: async (data) => {
      updateCookie(data.token);
      window.location.href = "/profile";
    },
  });
};

export const useResendOTP = (): UseMutationResult<
  ResenOTPResponse,
  ErrorResponse,
  ResenOTPBody
> => {
  return useMutation({mutationFn: resendOTP, mutationKey: ['resendOTP']});
};
