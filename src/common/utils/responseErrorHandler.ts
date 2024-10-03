import { toast } from 'react-toastify'

import { ErrorResponse } from '@/common/types'
import { isAxiosError } from 'axios'

export const responseErrorHandler = (error: unknown) => {
  if (isAxiosError(error) && error.response?.data?.messages) {
    const errorData = error.response?.data as ErrorResponse

    toast.error(errorData.messages[0].message ?? 'Something went wrong')
  } else {
    toast.error((error as Error).message ?? 'Something went wrong')
  }
}
