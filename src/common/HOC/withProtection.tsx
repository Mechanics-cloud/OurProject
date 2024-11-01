import React, { ReactElement, ReactNode } from 'react'

import { Layout, LayoutForAuthorized, Paths } from '@/common'
import { generalStore } from '@/core/store'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

export const withProtection =
  <P extends object>(
    PageComponent: NextPageWithLayout<P>,
    isPublic: boolean = false
  ): NextPageWithLayout<P> =>
  (props) => {
    const router = useRouter()

    if (!generalStore.user && !isPublic) {
      router.push(Paths.signIn)
    }

    if (generalStore.user) {
      return (
        <LayoutForAuthorized>
          <PageComponent {...props} />
        </LayoutForAuthorized>
      )
    }

    if (isPublic && !generalStore.user) {
      return (
        <Layout>
          <div className={'mx-24'}>
            <PageComponent {...props} />
          </div>
        </Layout>
      )
    }

    return (
      <Layout>
        <></>
      </Layout>
    )
  }
