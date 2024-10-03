import { toast } from 'react-toastify'

import { ErrorResponse } from '@/common/types'
import { isAxiosError } from 'axios'

export const responseErrorHandler = (error: unknown) => {
  const basicErrorMessage = 'Something went wrong'

  if (isAxiosError(error) && error.response?.data?.messages) {
    const errorData = error.response?.data as ErrorResponse

    toast.error(errorData.messages[0].message ?? basicErrorMessage)
  } else {
    toast.error((error as Error).message ?? basicErrorMessage)
  }
}
