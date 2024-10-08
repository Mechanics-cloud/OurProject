import { PropsWithChildren, ReactElement } from 'react'

import { Layout, SideBar } from '@/common'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Layout>
      <SideBar />
      <div className={'ml-[220px] pl-9'}>{children}</div>
    </Layout>
  )
}

export function getLayoutWithSidebar(page: ReactElement) {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}
