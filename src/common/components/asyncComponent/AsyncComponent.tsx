import * as React from 'react'
import { PropsWithChildren, ReactNode } from 'react'

import { Loader } from '@/common'

type Props = {
  isLoading: boolean
  loader?: ReactNode
}

export const AsyncComponent = ({
  children,
  isLoading,
  loader = Loader(),
}: PropsWithChildren<Props>) => {
  return isLoading ? loader : <>{children}</>
}
