import { ForgotPasswordFields } from '@/features/auth'
import { SignUpFields } from '@/features/auth/model/signUp/singUpSchema'

type BaseUrl = Record<'baseUrl', string>

export type SignUpRequestData = BaseUrl &
  Omit<SignUpFields, 'agreesToTOS' | 'confirm'>

export type RecoveryPasswordData = BaseUrl & ForgotPasswordFields

export type EmailResendRequestData = { email: string } & BaseUrl
