import { request } from "@/utils";
import {
  SignInBody,
  VerifySignUpBody,
  VerifySignInBody,
  ResenOTPBody,
  SignInResponse,
  VerifySignUpResponse,
  VerifySignInResponse,
  ResenOTPResponse,
} from "@/types/auth";

export const signIn = (params: SignInBody): Promise<SignInResponse> =>
  request.post("/api/v1/users/login", params);

export const verifySignUp = (
  params: VerifySignUpBody,
): Promise<VerifySignUpResponse> =>
  request.put("/api/v1/auth/verify/otp", params);

export const verifySignIn = (
  params: VerifySignInBody,
): Promise<VerifySignInResponse> =>
  request.put("/api/v1/auth/signin/verify", params);

export const resendOTP = (params: ResenOTPBody): Promise<ResenOTPResponse> =>
  request.post("/api/v1/auth/resend/otp", params);
