import { SignUpFields } from '@/pages/auth/sign-up/_singUpSchema'

export type SignUpRequestData = {
  baseUrl: string
} & Omit<SignUpFields, 'agreesToTOS' | 'confirm'>
