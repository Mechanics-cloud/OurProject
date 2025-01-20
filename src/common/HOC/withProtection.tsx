import React, { useEffect } from 'react'

import {
  BaseLayoutWithStore,
  FullScreenLoader,
  Paths,
  ProtectedLayout,
} from '@/common'
import { NextPageWithLayout } from '@/common/HOC/types'
import { authStore } from '@/features/auth'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

interface WithProtectionOptions {
  isNotForAuthorizedUsers?: boolean
  isPublic?: boolean
}

export const withProtection = <P extends object>(
  PageComponent: NextPageWithLayout<P>,
  options: WithProtectionOptions = {
    isNotForAuthorizedUsers: false,
    isPublic: false,
  }
): NextPageWithLayout<P> =>
  observer((props) => {
    const { isNotForAuthorizedUsers, isPublic } = options
    const router = useRouter()
    const currentAuthState = authStore.isAuthenticated

    useEffect(() => {
      const onRedirect = async () => {
        if (currentAuthState === 'yes' && isNotForAuthorizedUsers) {
          await router.replace(Paths.home)
        }
        if (
          (currentAuthState === 'error' ||
            authStore.isAuthenticated === 'no') &&
          !isPublic
        ) {
          await router.replace(Paths.signIn)
        }
      }

      onRedirect()
    }, [isNotForAuthorizedUsers, isPublic, router, currentAuthState])

    if (
      (currentAuthState === 'yes' && isNotForAuthorizedUsers) ||
      (currentAuthState === 'no' && !isPublic) ||
      currentAuthState === 'pending'
    ) {
      return (
        <BaseLayoutWithStore>
          <FullScreenLoader />
        </BaseLayoutWithStore>
      )
    }

    return (
      <ProtectedLayout>
        <PageComponent {...props} />
      </ProtectedLayout>
    )
  })
