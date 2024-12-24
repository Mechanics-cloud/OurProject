import { useState } from 'react'
import { toast } from 'react-toastify'

import { useModal, useTranslation } from '@/common'
import { Environments } from '@/common/enviroments'
import { Paths } from '@/common/paths'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { generalStore } from '@/core/store'
import { authApi } from '@/features/auth/api'
import { useRouter } from 'next/router'
import { z } from 'zod'

export const useRegistrationExpired = () => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const isLoadingStore = generalStore
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  const { isModalOpen, onModalClose, openModal } = useModal(async () => {
    await router.push(Paths.signIn)
  })

  const emailCheck = z.string().email()

  const onResendHandler = async () => {
    if (!query.email) {
      toast.error(t.basic.errors.unknown)
    }
    try {
      isLoadingStore.turnOnLoading()
      const email = emailCheck.parse(query.email)

      setUserEmail(email)
      const baseUrl = Environments.BASE_URL as string

      await authApi.emailResending({ baseUrl, email })
      openModal()
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      isLoadingStore.turnOffLoading()
    }
  }

  return {
    isModalOpen,
    onModalClose,
    onResendHandler,
    t,
    userEmail,
  }
}
