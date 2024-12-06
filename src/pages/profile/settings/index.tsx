import React from 'react'

import { ArrowBackOutline } from '@/assets/icons'
import { Tabs, TabsType, cn, useTranslation } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { getSettingsTabs } from '@/features/profile'

const Settings = () => {
  const { t } = useTranslation()
  const { isMobile, isTablet } = useScreenWidth()

  const tabsData: TabsType[] = getSettingsTabs(t, isMobile)

  return (
    <div className={'md:mt-[42px] mt-5 md:mb-24 mb-0'}>
      <Tabs tabsData={tabsData} />
    </div>
  )
}

export default withProtection(Settings)
