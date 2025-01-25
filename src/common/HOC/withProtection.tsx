import React, { useEffect } from 'react'

import { FullScreenLoader, Paths, ProtectedLayout } from '@/common'
import { NextPageWithLayout } from '@/common/HOC/types'
import { authStore } from '@/features/auth'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

interface WithProtectionOptions {
  forUnauthorizedUsers?: boolean
  isPublic?: boolean
}

export const withProtection = <P extends object>(
  PageComponent: NextPageWithLayout<P>,
  options: WithProtectionOptions = {
    forUnauthorizedUsers: false,
    isPublic: false,
  }
): NextPageWithLayout<P> =>
  observer((props) => {
    const { forUnauthorizedUsers, isPublic } = options
    const router = useRouter()
    const currentAuthState = authStore.isAuthenticated

    const isUserAuthorized =
      currentAuthState === 'authenticated' && forUnauthorizedUsers

    const isUserUnauthorized =
      (currentAuthState === 'error' ||
        currentAuthState === 'notAuthenticated') &&
      !isPublic

    const loadingCondition =
      isUserAuthorized || isUserUnauthorized || currentAuthState === 'pending'

    useEffect(() => {
      const onRedirect = async () => {
        if (isUserAuthorized) {
          await router.replace(Paths.home)
        }
        if (isUserUnauthorized) {
          await router.replace(Paths.signIn)
        }
      }

      onRedirect()
    }, [isUserAuthorized, isUserUnauthorized, router])

    return (
      <ProtectedLayout>
        {loadingCondition ? <FullScreenLoader /> : <PageComponent {...props} />}
      </ProtectedLayout>
    )
  })
