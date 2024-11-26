import { toast } from 'react-toastify'

import { ErrorResponse } from '@/common/types'
import { SignUpFields } from '@/features/auth/model'
import { isAxiosError } from 'axios'
import { z } from 'zod'

/**
 *
 * @param error - Some error (zod, axios or code)
 * @param setError - Unnecessary parameter for from error handling
 */

export const responseErrorHandler = (error: unknown, setError?: Function) => {
  const basicErrorMessage = 'Something went wrong'

  if (error instanceof z.ZodError) {
    toast.error(error.errors[0].message)

    return
  }

  if (!isAxiosError(error) || !error.response?.data?.messages) {
    toast.error(basicErrorMessage)

    return
  }

  const errorData = error.response?.data as ErrorResponse

  if (!setError) {
    toast.error(errorData.messages[0]?.message ?? basicErrorMessage)

    return
  }

  errorData.messages.forEach(({ field, message }) => {
    setError(field as keyof SignUpFields, { message })
  })
}
