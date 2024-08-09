export type SignInBody = {
  username: string
  password: string
}

export type VerifySignUpBody = {
  requestId: string
  otp: string
}

export type VerifySignInBody = {
  requestId: string
  otp: string
}

export type ResenOTPBody = {
  email: string
}

// export type SignInResponse = {
//   token(
//     NEXT_PUBLIC_COOKIE_NAME: string,
//     token: any,
//     arg2: { expires: number; secure: boolean; sameSite: 'Lax' }
//   ): unknown
// }

export type SignInResponse = {
  token: string
}

export type VerifySignUpResponse = {
  message: string
}

export type VerifySignInResponse = {
  token: string
  user: string
}

export type ResenOTPResponse = {
  cartId: string
  code: string
  file: string
  message: string
  requestId: string
  token: string
}

export type Decoded = {
  sub: string
  iat: number
  exp: number
}
