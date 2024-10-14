import { ForgotPasswordFields } from '@/features/auth'
import { SignUpFields } from '@/features/auth/model/signUp/singUpSchema'

type BaseUrl = Record<'baseUrl', string>
export type Email = Record<'email', string>

export type SignUpRequestData = BaseUrl &
  Omit<SignUpFields, 'agreesToTOS' | 'confirm'>

export type RecoveryPasswordData = BaseUrl & ForgotPasswordFields

export type NewPasswordData = { newPassword: string; recoveryCode: string }

export type EmailResendRequestData = BaseUrl & Email

export type EmailConfirmationRequestData = {
  confirmationCode: string
} & Email
