import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { getFromLocalStorage, useTranslation } from '@/common'
import { StorageKeys } from '@/common/enums'
import { authStore } from '@/features/auth'
import { runInAction } from 'mobx'

export const useMe = () => {
  const { t } = useTranslation()

  useEffect(() => {
    if (getFromLocalStorage(StorageKeys.AccessToken)) {
      authStore.me().catch(() => {
        toast.success(t.basic.welcome, { closeButton: false })
      })
    } else {
      runInAction(() => {
        authStore.isAuthenticated = 'no'
      })
    }
  }, [t.basic.welcome])
}
