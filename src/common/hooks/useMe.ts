import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { getFromLocalStorage, useTranslation } from '@/common'
import { StorageKeys } from '@/common/enums'
import { authStore } from '@/features/auth'
import { profileStore } from '@/features/profile'
import { runInAction } from 'mobx'

export const useMe = () => {
  const { t } = useTranslation()

  useEffect(() => {
    const accessToken = getFromLocalStorage(StorageKeys.AccessToken)
    const authMe = async () => {
      if (accessToken) {
        try {
          await authStore.me()
          await profileStore.getProfile()
        } catch (e) {
          toast.success(t.basic.welcome, { closeButton: false })
        }
      } else {
        runInAction(() => {
          authStore.isAuthenticated = 'notAuthenticated'
        })
      }
    }

    authMe()
  }, [t.basic.welcome])
}
