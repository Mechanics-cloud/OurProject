import { useEffect, useState } from 'react'

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

    const handleEmailConfirmation = async () => {
      const confirmationCode = query.code as string

      try {
        await authApi.emailConfirmation(confirmationCode)
        setIsConfirm(true)
      } catch (error) {
        responseErrorHandler(error)
        push({
          pathname: Paths.registrationEmailResending,
          query: { code: confirmationCode, email: query.email as string },
        })
      }
    }

    handleEmailConfirmation()

    return () => {
      controller.abort()
    }
  }, [query.code, query.email, push])

  return {
    isConfirm,
  }
}
