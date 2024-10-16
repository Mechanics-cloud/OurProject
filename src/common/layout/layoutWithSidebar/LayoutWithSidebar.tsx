import { PropsWithChildren, ReactElement } from 'react'

import { Layout, SideBar } from '@/common'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Layout className={'flex h-full '}>
      <SideBar className={''} />
      <div className={'pl-9 border-l-2 border-dark-300'}>{children}</div>
    </Layout>
  )
}

export function getLayoutWithSidebar(page: ReactElement) {
  return <LayoutWithSidebar>{page}</LayoutWithSidebar>
}
