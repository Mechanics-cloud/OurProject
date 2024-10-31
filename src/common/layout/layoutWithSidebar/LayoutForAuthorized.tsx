import { PropsWithChildren, useEffect, useState } from 'react'

import { Layout, Loader, SideBar } from '@/common'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { ProfileStore } from '@/features/profile'
import { NextPage } from 'next'

export const LayoutForAuthorized: NextPage<PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { isTablet } = useScreenWidth()

  useEffect(() => {
    ProfileStore.getProfile().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Layout className={'flex h-full'}>
      {!isTablet && <SideBar className={'mr-9 border-r-2 border-dark-300'} />}
      <div className={'w-full'}>{children}</div>
    </Layout>
  )
}
