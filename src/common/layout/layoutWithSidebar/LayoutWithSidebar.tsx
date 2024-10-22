import { PropsWithChildren, ReactElement, useEffect, useState } from 'react'

import { Layout, Loader, SideBar } from '@/common'
import ProfileStore from '@/features/profile/model/profileStore'
import { NextPage } from 'next'

export const LayoutWithSidebar: NextPage<PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ProfileStore.getProfile().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }

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
