import React from 'react'

import {
  FullScreenLoader,
  LayoutWithStore,
  Menu,
  Paths,
  SideBar,
} from '@/common'
import { NextPageWithLayout } from '@/common/HOC/types'
import { generalStore } from '@/core/store'
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
    const loading = authStore.isAuthenticated === 'pending'
    const currentAuthState = authStore.isAuthenticated

    if (currentAuthState === 'yes' && isNotForAuthorizedUsers) {
      router.replace(Paths.home)

      return
    }
    if (
      (currentAuthState === 'error' || authStore.isAuthenticated === 'no') &&
      !isPublic
    ) {
      router.replace(Paths.signIn)

      return
    }

    if (generalStore.user) {
      return (
        <LayoutWithStore className={'flex'}>
          <SideBar />
          <Menu className={'lg:hidden'} />
          <div className={'lg:pl-9 w-full lg:ml-56 pb-20'}>
            {loading ? <FullScreenLoader /> : <PageComponent {...props} />}
          </div>
        </LayoutWithStore>
      )
    }

    return (
      <LayoutWithStore>
        <div className={'lg:mx-24'}>
          {loading ? <FullScreenLoader /> : <PageComponent {...props} />}
        </div>
      </LayoutWithStore>
    )
  })
