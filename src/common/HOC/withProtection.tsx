'use client'

import React, { ReactElement, ReactNode, useEffect, useState } from 'react'

import { Layout, LayoutWithSidebar, Loader, Paths } from '@/common'
import authStore from '@/features/auth/model/authStore'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

export const withProtection = <P extends object>(
  PageComponent: NextPageWithLayout<P>,
  isPublic: boolean = true
): NextPageWithLayout<P> => {
  return (props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      authStore
        .me()
        .then(() => {
          if (!authStore.profile && !isPublic) {
            router.push(Paths.signIn)
          }
        })
        .catch(() => {
          if (!isPublic) {
            router.push(Paths.signIn)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }, [router])

    if (loading) {
      return (
        <Layout>
          <Loader />
        </Layout>
      )
    }

    if (authStore.profile) {
      return (
        <LayoutWithSidebar>
          <PageComponent {...props} />
        </LayoutWithSidebar>
      )
    }

    return (
      <Layout>
        <div className={'mx-24'}>
          <PageComponent {...props} />
        </div>
      </Layout>
    )
  }
}
