import React from 'react'

import { Tabs, TabsType, Typography } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { GeneralInfo } from 'src/features/profile/ui/general-info'

const tabsData: TabsType[] = [
  {
    content: <GeneralInfo />,
    id: 'tab1',
    title: 'General Information',
  },
  {
    content: <Typography variant={'reg16'}>Devices</Typography>,
    id: 'tab2',
    title: 'Devices',
  },
  {
    content: <Typography variant={'reg16'}>Account Management</Typography>,
    id: 'tab3',
    title: 'Account Management',
  },
  {
    content: <Typography variant={'reg16'}>My payments</Typography>,
    id: 'tab4',
    title: 'My payments',
  },
]

const Settings = () => {
  return (
    <div className={'mt-[42px]'}>
      <Tabs tabsData={tabsData} />
    </div>
  )
}

export default withProtection(Settings, false)
