import { useEffect, useState } from 'react'

import { responseErrorHandler, setToLocalStorage } from '@/common'
import { StorageKeys } from '@/common/enums'
import { authStore } from '@/features/auth'
import { useRouter } from 'next/router'

export const useGitHubCallback = () => {
  const router = useRouter()
  const [isLoginViaGithub, setIsLoginViaGithub] = useState<boolean>(true)

  useEffect(() => {
    const { accessToken } = router.query
    const gitHubAuth = async () => {
      if (router.isReady) {
        if (accessToken) {
          setToLocalStorage(StorageKeys.AccessToken, accessToken as string)
          try {
            await authStore.me()
          } catch (error) {
            responseErrorHandler(error)
            setIsLoginViaGithub(false)
          }
        } else {
          responseErrorHandler(new Error('Авторизация через GitHub невозможна'))
          setIsLoginViaGithub(false)
        }
      }
    }

    gitHubAuth()
  }, [router])

  return { isLoginViaGithub }
}
