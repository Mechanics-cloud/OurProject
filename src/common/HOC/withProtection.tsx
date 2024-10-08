'use client'

import React, { ReactElement, ReactNode, useEffect, useState } from 'react'

import { Paths } from '@/common'
import withLayout from '@/common/layout/withLayout'
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
  const WrappedComponent: NextPageWithLayout<P> = (props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (!authStore.profile && !isPublic) {
        router.push(Paths.signIn).catch(() => setLoading(false))
      } else {
        setLoading(false)
      }
    }, [router])

    if (loading) {
      return null
    }

    return <PageComponent {...props} />
  }

  WrappedComponent.getLayout = (page) => {
    if (authStore.profile) {
      return withLayout('user')(page)
    }

    return withLayout()(page)
  }

  return WrappedComponent
}
