import { toast } from 'react-toastify'

import { isAxiosError } from 'axios'

export const handleServerError = (error: unknown) => {
  if (isAxiosError(error) && error.response?.data?.messages) {
    toast.error(error.response.data.messages[0].message)
  } else {
    toast.error('Something went wrong')
  }
}
