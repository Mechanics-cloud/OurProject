import React from 'react'

import { Chrome, CreditCard, Person, Settings } from '@/assets/icons'
import { TabsType, Typography } from '@/common'
import { GeneralInfoPage } from '@/features/profile'
import { Devices } from '@/features/profile/settings/devices/ui/Devices'
import { LocaleType } from '@locales/ru'

export const getSettingsTabs = (
  t: LocaleType,
  isMobile: boolean
): TabsType[] => {
  return [
    {
      content: <GeneralInfoPage />,
      id: 'tab1',
      title: isMobile ? <Settings className={'w-full'} /> : t.tabs.generalInfo,
    },
    {
      content: <Devices />,
      id: 'tab2',
      title: isMobile ? <Chrome className={'w-full'} /> : t.tabs.devices,
    },
    {
      content: <Typography variant={'reg16'}>Account Management</Typography>,
      id: 'tab3',
      title: isMobile ? (
        <Person className={'w-full'} />
      ) : (
        t.tabs.accountManagement
      ),
    },
    {
      content: <Typography variant={'reg16'}>My payments</Typography>,
      id: 'tab4',
      title: isMobile ? <CreditCard className={'w-full'} /> : t.tabs.myPayments,
    },
  ]
}
