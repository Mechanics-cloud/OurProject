import React from 'react'

import { TabsType, Typography } from '@/common'
import { GeneralInfo } from '@/features/profile'
import { Devices } from '@/features/profile/settings/devices/ui/Devices'
import { LocaleType } from '@locales/ru'

export const getSettingsTabs = (t: LocaleType): TabsType[] => {
  return [
    {
      content: <GeneralInfo />,
      id: 'tab1',
      title: t.tabs.generalInfo,
    },
    {
      content: <Devices />,
      id: 'tab2',
      title: t.tabs.devices,
    },
    {
      content: <Typography variant={'reg16'}>Account Management</Typography>,
      id: 'tab3',
      title: t.tabs.accountManagement,
    },
    {
      content: <Typography variant={'reg16'}>My payments</Typography>,
      id: 'tab4',
      title: t.tabs.myPayments,
    },
  ]
}
