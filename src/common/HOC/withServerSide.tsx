import React, { useEffect } from 'react'

import { LayoutWithStore, Menu, SideBar, getFromLocalStorage } from '@/common'
import { StorageKeys } from '@/common/enums'
import { generalStore } from '@/core/store'
import { profileStore } from '@/features/profile'
import { observer } from 'mobx-react-lite'

import { NextPageWithLayout } from './types'

export const withServerSide = <P extends object>(
  PageComponent: NextPageWithLayout<P>
): NextPageWithLayout<P> =>
  observer((props) => {
    useEffect(() => {
      if (getFromLocalStorage(StorageKeys.AccessToken)) {
        profileStore.getProfile()
      }
    }, [])

    if (generalStore.user) {
      return (
        <LayoutWithStore className={'flex'}>
          <SideBar />
          <Menu />
          <div className={'lg:pl-9 w-full lg:h-headCalc lg:ml-56 pb-20'}>
            <PageComponent {...props} />
          </div>
        </LayoutWithStore>
      )
    }

    return (
      <LayoutWithStore>
        <div className={'mx-24'}>
          <PageComponent {...props} />
        </div>
      </LayoutWithStore>
    )
  })
