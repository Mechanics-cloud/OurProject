'use client'

import React, { ReactElement, ReactNode } from 'react'

import { Layout, LayoutForAuthorized, Paths } from '@/common'
import authStore from '@/features/auth/model/authStore'
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

    if (!authStore.profile && !isPublic) {
      router.push(Paths.signIn)
    }

    if (authStore.profile) {
      return (
        <LayoutForAuthorized>
          <PageComponent {...props} />
        </LayoutForAuthorized>
      )
    }

    if (isPublic && !authStore.profile) {
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
