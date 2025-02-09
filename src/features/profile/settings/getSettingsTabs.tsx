import React from 'react'

import { Chrome, CreditCard, Person, Settings } from '@/assets/icons'
import { TabsType, Typography } from '@/common'
// import { GeneralInfoPage } from '@/features/profile'
import { Devices } from '@/features/profile/settings/devices'
import Management from '@/features/profile/settings/management/ui/management'
import { LocaleType } from '@locales/ru'

import { GeneralInfoPage } from './generalInfo'

export const getSettingsTabs = (
  t: LocaleType,
  isMobile: boolean
): TabsType[] => {
  return [
    {
      content: <GeneralInfoPage />,
      id: 'general',
      title: isMobile ? (
        <Settings className={'w-full'} />
      ) : (
        t.profileSettingsTabs.generalInfo
      ),
    },
    {
      content: <Devices />,
      id: 'devices',
      title: isMobile ? (
        <Chrome className={'w-full'} />
      ) : (
        t.profileSettingsTabs.devices
      ),
    },
    {
      content: <Typography variant={'reg16'}>Account Management</Typography>,
      id: 'management',
      title: isMobile ? (
        <Person className={'w-full'} />
      ) : (
        t.profileSettingsTabs.accountManagement
      ),
    },
    {
      content: <Typography variant={'reg16'}>My payments</Typography>,
      id: 'payments',
      title: isMobile ? (
        <CreditCard className={'w-full'} />
      ) : (
        t.profileSettingsTabs.myPayments
      ),
    },
  ]
}
