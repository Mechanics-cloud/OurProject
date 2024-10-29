import { PropsWithChildren, useEffect, useState } from 'react'

import { Layout, Loader, SideBar } from '@/common'
import { ProfileStore } from '@/features/profile'
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
    <Layout className={'flex h-full'}>
      <SideBar />
      <div className={'pl-9 border-l-2 border-dark-300 w-full'}>{children}</div>
    </Layout>
  )
}
