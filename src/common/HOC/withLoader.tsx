import React from 'react'

import { FullScreenLoader, ProtectedLayout } from '@/common'
import { generalStore } from '@/core/store'
import { observer } from 'mobx-react-lite'

import { NextPageWithLayout } from './types'

export const withLoader = <P extends object>(
  PageComponent: NextPageWithLayout<P>
): NextPageWithLayout<P> =>
  observer((props) => {
    const loading = generalStore.isLoading

    return (
      <ProtectedLayout>
        {loading ? <FullScreenLoader /> : <PageComponent {...props} />}
      </ProtectedLayout>
    )
  })
