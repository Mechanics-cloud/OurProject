import { PropsWithChildren, useEffect } from 'react'

import { Layout, Menu, SideBar } from '@/common'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { profileStore } from '@/features/profile'
import { NextPage } from 'next'

export const LayoutForAuthorized: NextPage<PropsWithChildren> = ({
  children,
}) => {
  const { isTablet } = useScreenWidth()

  useEffect(() => {
    profileStore.getProfile()
  }, [])

  return (
    <Layout className={'flex'}>
      {isTablet ? <Menu /> : <SideBar />}
      <div
        className={
          'lg:pl-9 w-full lg:border-l-2 lg:border-dark-300 lg:h-headCalc'
        }
      >
        {children}
      </div>
    </Layout>
  )
}
