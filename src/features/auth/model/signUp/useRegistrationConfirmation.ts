import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Paths } from '@/common/paths'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { authApi } from '@/features/auth/api'
import { useRouter } from 'next/router'

export const useRegistrationConfirmation = () => {
  const { push, query } = useRouter()
  const [isConfirm, setIsConfirm] = useState(false)

  useEffect(() => {
    if (!query.code || !query.email) {
      return
    }
    const controller = new AbortController()

    try {
      const confirmationCode = query.code as string
      const email = query.email as string

      authApi
        .emailConfirmation({ confirmationCode, email })
        .then((res) => {
          setIsConfirm(true)
          toast(res.status)
        })
        .catch((error) => {
          responseErrorHandler(error)
          push({
            pathname: Paths.registrationEmailResending,
            query: { code: confirmationCode, email },
          })
        })
    } catch (error) {
      responseErrorHandler(error)
    }

    return () => {
      controller.abort()
    }
  }, [query.code, query.email, push])

  return {
    isConfirm,
  }
}
