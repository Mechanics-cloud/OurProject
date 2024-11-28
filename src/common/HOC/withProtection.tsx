import React, { ReactElement, ReactNode, useEffect } from 'react'

import { FullScreenLoader, LayoutWithStore, Paths, SideBar } from '@/common'
import { generalStore } from '@/core/store'
import { authStore } from '@/features/auth'
import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

export const withProtection = <P extends object>(
  PageComponent: NextPageWithLayout<P>,
  isPublic: boolean = false,
  isNotForAuthorizedUsers: boolean = false
): NextPageWithLayout<P> =>
  observer((props) => {
    const isLoading = generalStore.isLoading
    const router = useRouter()

    useEffect(() => {
      const controller = new AbortController()
      const authMe = async () => {
        generalStore.turnOnLoading()
        await authStore.me()
        if (generalStore.user && isNotForAuthorizedUsers) {
          await router.replace(Paths.profile)
        }
        if (!generalStore.user && !isPublic) {
          await router.replace(Paths.signIn)
        }
      }

      authMe().finally(() => generalStore.turnOffLoading())

      return () => {
        controller.abort()
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
            {isLoading ? <FullScreenLoader /> : <PageComponent {...props} />}
          </div>
        </LayoutWithStore>
      )
    }

    return (
      <LayoutWithStore>
        <div className={'mx-24'}>
          {isLoading ? <FullScreenLoader /> : <PageComponent {...props} />}
        </div>
      </LayoutWithStore>
    )
  })
