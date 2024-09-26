import { StatusCode } from '@/assets/types/enums'
import { SignUpFields } from '@/pages/auth/sign-up/_singUpSchema'

export type SignUpRequestData = {
  baseUrl: string
} & Omit<SignUpFields, 'agreesToTOS' | 'confirm'>

export type SignUpResponseType<T = Array<{}>> = {
  error: string
  messages: T
  statusCode: StatusCode
}
