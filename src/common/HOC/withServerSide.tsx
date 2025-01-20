import React from 'react'

import { ProtectedLayout } from '@/common'
import { observer } from 'mobx-react-lite'

import { NextPageWithLayout } from './types'

export const withServerSide = <P extends object>(
  PageComponent: NextPageWithLayout<P>
): NextPageWithLayout<P> =>
  observer((props) => {
    return (
      <ProtectedLayout>
        <PageComponent {...props} />
      </ProtectedLayout>
    )
  })
