import { useEffect, useState } from 'react'

import { useTranslation } from '@/common'
import { Paths } from '@/common/paths'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { authApi } from '@/features/auth/api'
import { useRouter } from 'next/router'

export const useRegistrationConfirmation = () => {
  const { t } = useTranslation()
  const { isReady, push, query } = useRouter()
  const [isConfirm, setIsConfirm] = useState<
    'confirm' | 'error' | 'notConfirm' | 'pending'
  >('pending')
  const href = {
    pathname: Paths.signIn,
    query: {},
  }
  let text = t.registration.confirmation.text
  let title = t.registration.confirmation.title
  let buttonText = t.registration.confirmation.buttonTitle

  if (isConfirm === 'error') {
    href.pathname = Paths.signUp
    text = t.registration.error.errorText
    title = t.registration.error.title
    buttonText = t.registration.error.errorButton
  }

  if (isConfirm === 'notConfirm') {
    href.pathname = Paths.registrationEmailResending
    href.query = {
      code: query.code as string,
      email: query.email as string,
    }
    text = t.registration.error.notConfirmedText
    title = t.registration.error.title
    buttonText = t.registration.error.notConfirmedButton
  }

  useEffect(() => {
    const controller = new AbortController()

    if (isReady) {
      if (!query.code || !query.email) {
        setIsConfirm('error')
        responseErrorHandler(new Error(t.basic.errors.unknown))

        return
      }

      const onEmailConfirmation = async () => {
        const confirmationCode = query.code as string

        try {
          await authApi.emailConfirmation(confirmationCode, controller.signal)
          setIsConfirm('confirm')
        } catch (error) {
          setIsConfirm('notConfirm')
          responseErrorHandler(error)
        }
      }

      onEmailConfirmation()
    }

    return () => {
      controller.abort()
    }
  }, [query.code, query.email, push, isReady, t.basic.errors.unknown])

  return {
    buttonText,
    href,
    isConfirm,
    text,
    title,
  }
}
