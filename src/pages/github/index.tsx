import { useEffect } from 'react'

import { Loader, Paths } from '@/common'
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
        authStore
          .me()
          .then((res) => router.push(`${Paths.profile}/${res?.userId}`))
      } else {
        throw new Error('no token')
      }
    }
  }, [router])

  return <Loader />
}

export default GitHubCallback
