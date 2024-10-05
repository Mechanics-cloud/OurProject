import { PropsWithChildren, ReactElement } from 'react'

import { Layout, SideBar } from '@/common'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Layout>
      <SideBar />
      {children}
    </Layout>
  )
}

export function getLayoutWithSidebar(page: ReactElement) {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}
