import React, { useEffect } from 'react'

import { FullScreenLoader, Paths, ProtectedLayout } from '@/common'
import { NextPageWithLayout } from '@/common/HOC/types'
import { authStore } from '@/features/auth'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

interface WithProtectionOptions {
  isPublic?: boolean
}

export const withProtection = <P extends object>(
  PageComponent: NextPageWithLayout<P>,
  options: WithProtectionOptions = {
    isPublic: false,
  }
): NextPageWithLayout<P> =>
  observer((props) => {
    const { isPublic } = options
    const router = useRouter()
    const currentAuthState = authStore.isAuthenticated

    const isUserAuthorized = currentAuthState === 'authenticated' && isPublic

    const isUserUnauthorized =
      (currentAuthState === 'error' ||
        currentAuthState === 'notAuthenticated') &&
      !isPublic

    const loadingCondition =
      isUserAuthorized || isUserUnauthorized || currentAuthState === 'pending'

    useEffect(() => {
      if (isUserAuthorized) {
        router.replace(Paths.home)
      }
      if (isUserUnauthorized) {
        router.replace(Paths.signIn)
      }
    }, [isUserAuthorized, isUserUnauthorized, router])

    return (
      <ProtectedLayout>
        {loadingCondition ? <FullScreenLoader /> : <PageComponent {...props} />}
      </ProtectedLayout>
    )
  })
