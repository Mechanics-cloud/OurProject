import React from 'react'

import { Tabs, TabsType, cn, useTranslation } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { getSettingsTabs } from '@/features/profile'

const Settings = () => {
  const { t } = useTranslation()
  const { isMobile, isTablet } = useScreenWidth()

  const tabsData: TabsType[] = getSettingsTabs(t, isMobile)

  return (
    <div className={cn('mt-[42px]', isTablet && 'mt-5')}>
      {isTablet && <p className={'text-center mb-5'}>Back to Profile</p>}
      <Tabs tabsData={tabsData} />
    </div>
  )
}

export default withProtection(Settings)
