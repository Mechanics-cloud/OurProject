import React from 'react'

import { Chrome, CreditCard, Person, Settings } from '@/assets/icons'
import { TabsType, Typography } from '@/common'
import { GeneralInfoPage, Subscription } from '@/features/profile'
import { Devices } from '@/features/profile/settings/devices'
import { LocaleType } from '@locales/ru'

import { PaymentTable } from './payments'
import { BankRedirectButtons } from './subscription/ui/components/BankRedirectButtons'

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
      content: <Subscription />,
      id: 'management',
      title: isMobile ? (
        <Person className={'w-full'} />
      ) : (
        t.profileSettingsTabs.accountManagement
      ),
    },
    {
      content: <PaymentTable />,
      id: 'payments',
      title: isMobile ? (
        <CreditCard className={'w-full'} />
      ) : (
        t.profileSettingsTabs.myPayments
      ),
    },
  ]
}
