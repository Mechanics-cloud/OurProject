import { useEffect } from 'react'

import { Loader } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { authApi } from '@/features/auth/api/auth.api'
import { useRouter } from 'next/router'

const GitHubCallback = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.accessToken) {
      const { accessToken } = router.query

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken as string)
        authApi
          .me(accessToken as string)
          .then(() => router.push('/profile'))
          .catch((error) => responseErrorHandler('No access token'))
      } else {
        console.warn('No token')
      }
    }
  }, [router, router.query])

  return <Loader />
}

export default GitHubCallback
