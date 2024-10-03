import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Paths } from '@/common/paths'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { authApi } from '@/features/auth/api'
import { useRouter } from 'next/router'

export const useRegistrationConfirmation = () => {
  const { push, query } = useRouter()

  useEffect(() => {
    if (!query.code || !query.email) {
      push(Paths.signUp)

      return
    }
    const controller = new AbortController()

    try {
      const confirmationCode = query.code as string
      const email = query.email as string

      authApi
        .emailConfirmation({ confirmationCode, email })
        .then((res) => {
          toast(res.status)
        })
        .catch((error) => {
          responseErrorHandler(error)
          push(Paths.registrationEmailResending)
        })
    } catch (error) {
      responseErrorHandler(error)
    }

    return () => {
      controller.abort()
    }
  }, [query.code, query.email, push])
}
