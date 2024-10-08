import React, { ReactElement, ReactNode, useEffect, useState } from 'react'

import { Loader, Paths } from '@/common'
import authStore from '@/features/auth/model/authStore'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type Props = {
  accessLevel?: 'anonymous' | 'user'
}

export const withProtection = <P extends object>(
  PageComponent: NextPageWithLayout<P>
): NextPageWithLayout<P> => {
  const WrappedComponent: NextPageWithLayout<P> = (props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (!authStore.profile) {
        router.push(Paths.signIn)
      } else {
        setLoading(false)
      }
    }, [router])

    if (loading) {
      return <Loader />
    }

    return <PageComponent {...props} />
  }

  if (PageComponent.getLayout) {
    WrappedComponent.getLayout = PageComponent.getLayout
  }

  return WrappedComponent
}
