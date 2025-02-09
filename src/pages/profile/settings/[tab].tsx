import React, { useState } from 'react'

import {
  Tabs,
  TabsType,
  useScreenWidth,
  useTranslation,
  withProtection,
} from '@/common'
import { getSettingsTabs } from '@/features/profile'
import { useRouter } from 'next/router'

const Settings = () => {
  const { t } = useTranslation()
  const { isMobile } = useScreenWidth()

  const router = useRouter()
  const { tab } = router.query

  const tabsData: TabsType[] = getSettingsTabs(t, isMobile)

  const [currentTab, setCurrentTab] = useState<string | undefined>(
    Array.isArray(tab) ? tab[0] : tab
  )

  const onChangeTab = (newTab: string | undefined) => {
    setCurrentTab(newTab)
    router.push(`/profile/settings/${newTab}`)
  }

  return (
    <div className={'md:mt-[42px] mt-5 md:mb-24 mb-0'}>
      <Tabs
        onValueChange={onChangeTab}
        tabsData={tabsData}
        value={currentTab}
      />
    </div>
  )
}

export default withProtection(Settings)
