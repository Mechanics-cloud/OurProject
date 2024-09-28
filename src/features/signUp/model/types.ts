import { SignUpFields } from '@/features/signUp/model/singUpSchema'

export type SignUpRequestData = {
  baseUrl: string
} & Omit<SignUpFields, 'agreesToTOS' | 'confirm'>
