import React, { useEffect, useState } from 'react'

import { Loader, Paths } from '@/common'
import { generalStore } from '@/core/store'
import authStore from '@/features/auth/model/authStore'
import { NextPageWithLayout } from '@/pages/_app'
import { observer } from 'mobx-react-lite'
import Router from 'next/router'

export const withRedirectForAuthorize = <P extends object>(
  Component: NextPageWithLayout<P>
) => {
  const WrapComponent: NextPageWithLayout<P> = (props) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      authStore.me().finally(() => setLoading(false))
      if (generalStore.user) {
        Router.push(Paths.profile)
      }
    }, [])

    if (loading) {
      return <Loader />
    }

    return <Component {...props} />
  }

  if (Component.getLayout) {
    WrapComponent.getLayout = Component.getLayout
  }

  return observer(WrapComponent)
}
