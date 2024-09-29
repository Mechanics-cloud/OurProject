import { SignUpFields } from '@/features/auth/model/singUpSchema'

export type SignUpRequestData = {
  baseUrl: string
} & Omit<SignUpFields, 'agreesToTOS' | 'confirm'>
