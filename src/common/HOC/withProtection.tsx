import React, { useEffect } from 'react'

import { FullScreenLoader, ProtectedPaths, PublicPaths } from '@/common'
import { NextPageWithLayout } from '@/common/HOC/types'
import { authStore } from '@/features/auth'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

export const withProtection = <P extends object>(
  PageComponent: NextPageWithLayout<P>
): NextPageWithLayout<P> =>
  observer((props) => {
    const router = useRouter()

    const isProtectedRoute = Object.values(ProtectedPaths).includes(
      router.pathname
    )
    const isPublicRoute = Object.values(PublicPaths).includes(router.pathname)

    const isUserAuthorized = authStore.isAuthenticated === 'authenticated'

    const isUserUnauthorized =
      authStore.isAuthenticated === 'error' ||
      authStore.isAuthenticated === 'notAuthenticated'

    const loadingCondition =
      authStore.isAuthenticated === 'pending' ||
      (isUserAuthorized && isPublicRoute) ||
      (isUserUnauthorized && isProtectedRoute)

    useEffect(() => {
      if (isUserAuthorized && isPublicRoute) {
        router.replace(ProtectedPaths.home)
      }
      if (isUserUnauthorized && isProtectedRoute) {
        router.replace(PublicPaths.signIn)
      }
    }, [
      isProtectedRoute,
      isPublicRoute,
      isUserAuthorized,
      isUserUnauthorized,
      router,
    ])

    return (
      <>
        {loadingCondition ? <FullScreenLoader /> : <PageComponent {...props} />}
      </>
    )
  })
