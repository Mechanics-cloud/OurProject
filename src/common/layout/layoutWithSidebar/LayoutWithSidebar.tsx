import { PropsWithChildren } from 'react'

import { Layout, SideBar } from '@/common'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Layout className={'flex h-full'}>
      <SideBar />
      <div className={'pl-9 border-l-2 border-dark-300 w-full'}>{children}</div>
    </Layout>
  )
}
