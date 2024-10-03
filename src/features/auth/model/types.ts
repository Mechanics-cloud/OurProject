import { SignUpFields } from '@/features/auth/model/singUpSchema'

type BaseUrl = {
  baseUrl: string
}

export type SignUpRequestData = BaseUrl &
  Omit<SignUpFields, 'agreesToTOS' | 'confirm'>

export type EmailResendRequestData = { email: string } & BaseUrl

export type EmailConfirmationRequestData = {
  confirmationCode: string
  email: string
}
