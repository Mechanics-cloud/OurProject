import React from 'react'

import { BaseLayoutWithStore, Menu, SideBar, cn } from '@/common'
import { generalStore } from '@/core/store'
import { observer } from 'mobx-react-lite'

type Props = {
  children: React.ReactNode
}

export const ProtectedLayout = observer(({ children }: Props) => {
  const user = generalStore.user

  return (
    <BaseLayoutWithStore className={cn(user ? 'flex' : '')}>
      {user ? (
        <>
          <SideBar />
          <Menu className={'lg:hidden'} />
          <div className={'lg:pl-9 w-full lg:ml-56 pb-20'}>{children}</div>
        </>
      ) : (
        <div className={'lg:mx-24'}>{children}</div>
      )}
    </BaseLayoutWithStore>
  )
})
