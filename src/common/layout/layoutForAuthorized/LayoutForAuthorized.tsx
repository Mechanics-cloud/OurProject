import { PropsWithChildren, useEffect, useState } from 'react'

import { Layout, Loader, Menu, SideBar } from '@/common'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { profileStore } from '@/features/profile'
import { NextPage } from 'next'

export const LayoutForAuthorized: NextPage<PropsWithChildren> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { isTablet } = useScreenWidth()

  useEffect(() => {
    profileStore.getProfile().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Layout className={'flex'}>
      {isTablet ? <Menu /> : <SideBar />}
      <div
        className={
          isTablet
            ? 'w-full'
            : 'pl-9 w-full border-l-2 border-dark-300 h-headCalc'
        }
      >
        {children}
      </div>
    </Layout>
  )
}
