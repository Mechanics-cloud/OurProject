import * as React from 'react'

import { Tabs, TabsType, useTranslation } from '@/common'
import {
  ClassicFilters,
  InstFilters,
  addPostStore,
} from '@/features/createPost'
import { LocaleType } from '@locales/ru'
import { observer } from 'mobx-react-lite'

export const getFiltersTabs = (t: LocaleType): TabsType[] => {
  return [
    {
      content: <InstFilters />,
      id: 'Filters',
      title: 'Filters',
    },
    {
      content: <ClassicFilters />,
      id: 'Settings',
      title: 'Settings',
    },
  ]
}

export const Filters = observer(() => {
  const { t } = useTranslation()
  const addCurrentSliderIndex = addPostStore.addCurrentSliderIndex

  addCurrentSliderIndex(0)

  return (
    <div className={'border-l-[1px] border-dark-100 w-full'}>
      <Tabs tabsData={getFiltersTabs(t)} />
    </div>
  )
})
