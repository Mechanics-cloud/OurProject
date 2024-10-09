import { useEffect } from 'react'

import { Loader } from '@/common'
import { StorageKeys } from '@/common/enums'
import authStore from '@/features/auth/model/authStore'
import { useRouter } from 'next/router'

const GitHubCallback = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.accessToken) {
      const { accessToken } = router.query

      if (accessToken) {
        localStorage.setItem(StorageKeys.AccessToken, accessToken as string)
        authStore.me(accessToken as string).then(() => router.push('/profile'))
      } else {
        console.warn('No token')
      }
    }
  }, [router, router.query])

  return <Loader />
}

export default GitHubCallback
