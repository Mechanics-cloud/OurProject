import React, { ReactElement, ReactNode, useEffect } from 'react'

import { LayoutWithStore } from '@/common'
import { authStore } from '@/features/auth'
import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'

type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

export const withServerSide = <P extends object>(
  PageComponent: NextPageWithLayout<P>
): NextPageWithLayout<P> =>
  observer((props) => {
    useEffect(() => {
      const controller = new AbortController()
      const authMe = async () => {
        await authStore.me()
      }

      authMe()

      return () => {
        controller.abort()
      }
    }, [])

    return (
      <LayoutWithStore>
        <div className={'mx-24'}>
          <PageComponent {...props} />
        </div>
      </LayoutWithStore>
    )
  })
