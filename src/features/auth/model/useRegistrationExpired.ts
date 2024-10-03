import { useState } from 'react'
import { toast } from 'react-toastify'

import { Environments } from '@/common/enviroments'
import { generalStore } from '@/common/modal/store'
import { Paths } from '@/common/paths'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { signUpApi } from '@/features/auth/api'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useRegistrationExpired = () => {
  const { query } = useRouter()
  const isLoadingStore = generalStore
  const [isOpen, setIsOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  const emailCheck = z.string().email()

  const onModalClose = () => {
    setIsOpen(false)
    router.push(Paths.signIn)
  }

  const onResendHandler = () => {
    if (!query.email) {
      toast.error('Something went wrong')
    }
    try {
      const email = emailCheck.parse(query.email)

      setUserEmail(email)
      const baseUrl = Environments.BASE_URL as string

      isLoadingStore.turnOnLoading()
      signUpApi
        .emailResending({ baseUrl, email })
        .then(() => {
          setIsOpen(true)
        })
        .catch((error) => {
          responseErrorHandler(error)
        })
        .finally(() => {
          isLoadingStore.turnOffLoading()
        })
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  return {
    isOpen,
    onModalClose,
    onResendHandler,
    userEmail,
  }
}
