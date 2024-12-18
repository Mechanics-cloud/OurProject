import React, { ReactElement, ReactNode, useEffect } from 'react'

import {
  FullScreenLoader,
  LayoutWithStore,
  Paths,
  SideBar,
  getFromLocalStorage,
} from '@/common'
import { StorageKeys } from '@/common/enums'
import { generalStore } from '@/core/store'
import { authStore } from '@/features/auth'
import { profileStore } from '@/features/profile'
import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

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

    useEffect(() => {
      const onRedirect = async () => {
        if (authStore.isAuthenticated === 'pending') {
          return
        }
        if (authStore.isAuthenticated === 'yes' && isNotForAuthorizedUsers) {
          await router.replace(Paths.home)
        }
        if (
          (authStore.isAuthenticated === 'error' ||
            authStore.isAuthenticated === 'no') &&
          !isPublic
        ) {
          await router.replace(Paths.signIn)
        }
      }

      onRedirect()
    }, [isNotForAuthorizedUsers, isPublic, router, authStore.isAuthenticated])

    useEffect(() => {
      if (getFromLocalStorage(StorageKeys.AccessToken)) {
        profileStore.getProfile()
      }
    }, [])

    if (generalStore.user) {
      return (
        <LayoutWithStore className={'flex'}>
          <SideBar />
          <div
            className={
              'lg:pl-9 w-full lg:border-l-2 lg:border-dark-300 lg:h-headCalc'
            }
          >
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
