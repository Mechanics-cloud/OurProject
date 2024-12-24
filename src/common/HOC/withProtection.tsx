import React, { useEffect } from 'react'

import {
  FullScreenLoader,
  LayoutWithStore,
  Paths,
  SideBar,
  getFromLocalStorage,
} from '@/common'
import { NextPageWithLayout } from '@/common/HOC/types'
import { StorageKeys } from '@/common/enums'
import { generalStore } from '@/core/store'
import { authStore } from '@/features/auth'
import { profileStore } from '@/features/profile'
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
    const loading = authStore.isAuthenticated === 'pending'
    const currentAuthState = authStore.isAuthenticated

    useEffect(() => {
      const onRedirect = async () => {
        if (currentAuthState === 'pending') {
          return
        }
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

    useEffect(() => {
      if (getFromLocalStorage(StorageKeys.AccessToken)) {
        profileStore.getProfile()
      }
    }, [])

    if (generalStore.user) {
      return (
        <LayoutWithStore className={'flex'}>
          <SideBar />
          <div className={'lg:pl-9 w-full lg:h-headCalc lg:ml-56'}>
            {loading ? <FullScreenLoader /> : <PageComponent {...props} />}
          </div>
        </LayoutWithStore>
      )
    }

    return (
      <LayoutWithStore>
        <div className={'mx-24'}>
          {loading ? <FullScreenLoader /> : <PageComponent {...props} />}
        </div>
      </LayoutWithStore>
    )
  })
