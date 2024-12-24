import React, { useEffect } from 'react'

import { LayoutWithStore, SideBar, getFromLocalStorage } from '@/common'
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
          <div className={'lg:pl-9 w-full lg:h-headCalc'}>
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
