import { useEffect, useState } from 'react'

import { authStore } from '@/features/auth'

export const useMe = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const controller = new AbortController()

    authStore.me().finally(() => setLoading(false))

    return () => {
      controller.abort()
    }
  }, [])

  return { loading }
}
