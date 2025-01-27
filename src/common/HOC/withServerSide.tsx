import React from 'react'

import {
  BaseLayoutWithStore,
  FullScreenLoader,
  ProtectedLayout,
} from '@/common'
import { generalStore } from '@/core/store'
import { observer } from 'mobx-react-lite'

import { NextPageWithLayout } from './types'

export const withServerSide = <P extends object>(
  PageComponent: NextPageWithLayout<P>
): NextPageWithLayout<P> =>
  observer((props) => {
    const isLoadingStore = generalStore.isLoading

    return isLoadingStore ? (
      <BaseLayoutWithStore>
        <FullScreenLoader />
      </BaseLayoutWithStore>
    ) : (
      <ProtectedLayout>
        <PageComponent {...props} />
      </ProtectedLayout>
    )
  })
