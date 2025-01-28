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

  if (isAxiosError(error)) {
    if (error.code === 'ERR_CANCELED') {
      return
    }

    let errorData
    let errorText

    if (error.response) {
      errorData = error.response?.data as ErrorResponse

      if (Array.isArray(errorData.messages)) {
        errorText =
          errorData.messages.length > 0
            ? errorData.messages[0].message
            : error.message
        if (setError) {
          errorData.messages.forEach(({ field, message }) => {
            setError(field as keyof SignUpFields, { message })
          })
        }
      } else {
        errorText = errorData.messages
      }
    } else {
      errorText = error.message
    }

    toast.error(errorText ?? basicErrorMessage)

    return
  }

  if (error instanceof z.ZodError) {
    toast.error(error.errors[0].message)

    return
  }

  if (error instanceof Error) {
    toast.error(error.message)

    return
  }

  toast.error(basicErrorMessage)

  return
}
