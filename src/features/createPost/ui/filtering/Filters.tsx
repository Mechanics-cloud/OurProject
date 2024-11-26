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
      title: t.createPost.filtering.filters,
    },
    {
      content: <ClassicFilters />,
      id: 'Settings',
      title: t.createPost.filtering.settings,
    },
  ]
}

export const Filters = observer(() => {
  const { t } = useTranslation()
  const addCurrentSliderIndex = addPostStore.addCurrentSliderIndex

  addCurrentSliderIndex(0)

  return (
    <div className={'border-l-[1px] border-dark-100 w-full p-b-3'}>
      <Tabs tabsData={getFiltersTabs(t)} />
    </div>
  )
})
