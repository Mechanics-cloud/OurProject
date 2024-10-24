import React from 'react'

import { Tabs, TabsType, Typography, useTranslation } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { GeneralInfo } from '@/features/profile/settings/generalInfo/ui/GeneralInfo'

const Settings = () => {
  const { t } = useTranslation()

  const tabsData: TabsType[] = [
    {
      content: <GeneralInfo />,
      id: 'tab1',
      title: t.tabs.generalInfo,
    },
    {
      content: <Typography variant={'reg16'}>Devices</Typography>,
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

  return (
    <div className={'mt-[42px]'}>
      <Tabs tabsData={tabsData} />
    </div>
  )
}

export default withProtection(Settings)
