import { useEffect } from 'react'

import { FullScreenLoader, Paths, withProtection } from '@/common'
import { StorageKeys } from '@/common/enums'
import { setToLocalStorage } from '@/common/utils/localStorage'
import { authStore } from '@/features/auth'
import { useRouter } from 'next/router'

const GitHubCallback = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.accessToken) {
      const { accessToken } = router.query

      if (accessToken) {
        setToLocalStorage(StorageKeys.AccessToken, accessToken as string)
        authStore.me().then(() => router.push(`${Paths.home}`))
      } else {
        throw new Error('no token')
      }
    }
  }, [router])

  return <FullScreenLoader />
}

export default withProtection(GitHubCallback)
