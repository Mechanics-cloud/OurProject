import { toast } from 'react-toastify'

import { Environments } from '@/common/enviroments'
import { generalStore } from '@/common/modal/store'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { signUpApi } from '@/features/auth/api'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useRegistrationExpired = () => {
  const { query } = useRouter()
  const isLoadingStore = generalStore

  const emailCheck = z.string().email()

  const onResendHandler = () => {
    if (!query.email) {
      toast.error('Something went wrong')
    }
    try {
      const email = emailCheck.parse(query.email)
      const baseUrl = Environments.BASE_URL as string

      isLoadingStore.turnOnLoading()
      signUpApi
        .emailResending({ baseUrl, email })
        .then((res) => {
          toast.info('Ok')
        })
        .catch((error) => {
          responseErrorHandler(error)
        })
        .finally(() => {
          isLoadingStore.turnOffLoading()
        })
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message)
      } else {
        toast.error((error as Error).message)
      }
    }
  }

  return {
    onResendHandler,
  }
}
