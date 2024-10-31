import * as React from 'react'
import { PropsWithChildren } from 'react'

import { Loader } from '@/common'

type Props = {
  isLoading: boolean
}

export const AsyncComponent = ({
  children,
  isLoading,
}: PropsWithChildren<Props>) => {
  return isLoading ? <Loader /> : <>{children}</>
}
