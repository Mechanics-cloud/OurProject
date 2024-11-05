import React from 'react'

import { Tabs, TabsType, useTranslation } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { getSettingsTabs } from '@/features/profile'

const Settings = () => {
  const { t } = useTranslation()

  const tabsData: TabsType[] = getSettingsTabs(t)

  return (
    <div className={'mt-[42px]'}>
      <Tabs tabsData={tabsData} />
    </div>
  )
}

export default withProtection(Settings)
