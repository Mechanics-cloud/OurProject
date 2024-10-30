import { useEffect, useState } from 'react'

import authStore from '@/features/auth/model/authStore'

export const useMe = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    authStore.me().finally(() => setLoading(false))

    return () => {
      controller.abort()
    }
  }, [])

  return { loading }
}
