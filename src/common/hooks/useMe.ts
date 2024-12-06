import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useTranslation } from '@/common'
import { authStore } from '@/features/auth'

export const useMe = () => {
  const { t } = useTranslation()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    authStore
      .me()
      .catch(() => {
        toast.success(t.auth.welcome, { closeButton: false })
      })
      .finally(() => setLoading(false))

    return () => {
      controller.abort()
    }
  }, [t.auth.welcome])

  return { loading }
}
