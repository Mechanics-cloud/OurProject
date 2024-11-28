import React from 'react'

import {
  Tabs,
  TabsType,
  useScreenWidth,
  useTranslation,
  withProtection,
} from '@/common'
import { getSettingsTabs } from '@/features/profile'

const Settings = () => {
  const { t } = useTranslation()
  const { isMobile, isTablet } = useScreenWidth()

  const tabsData: TabsType[] = getSettingsTabs(t, isMobile)

  return (
    <div className={'md:mt-[42px] mt-5'}>
      <Tabs tabsData={tabsData} />
    </div>
  )
}

export default withProtection(Settings)
