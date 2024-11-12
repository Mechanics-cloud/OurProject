import React from 'react'

import {
  GeneralInfo,
  GeneralInfoLoading,
  profileStore,
} from '@/features/profile'
import { observer } from 'mobx-react-lite'

export const GeneralInfoPage = observer(() => {
  const { isProfileLoading } = profileStore

  return isProfileLoading ? <GeneralInfoLoading /> : <GeneralInfo />
})
