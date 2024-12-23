import { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>
