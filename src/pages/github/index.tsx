import { useEffect } from 'react'

import { Loader, Paths } from '@/common'
import { setAccessToken } from '@/common/utils/setAccessToken'
import authStore from '@/features/auth/model/authStore'
import { useRouter } from 'next/router'

const GitHubCallback = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.accessToken) {
      const { accessToken } = router.query

      if (accessToken) {
        setAccessToken(accessToken as string)
        authStore.me().then(() => router.push(Paths.profile))
      } else {
        throw new Error('no token')
      }
    }
  }, [router])

  return <Loader />
}

export default GitHubCallback
