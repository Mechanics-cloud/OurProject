import * as React from 'react'

import { Tabs, TabsType, useTranslation } from '@/common'
import {
  ClassicSettings,
  InstaFilters,
  addPostStore,
} from '@/features/createPost'
import { LocaleType } from '@locales/ru'
import { observer } from 'mobx-react-lite'

type FilterType = {
  name: string
}

const filtersData: FilterType[] = [
  { name: 'Normal' },
  { name: 'Calendon' },
  { name: 'Lark' },
  { name: 'Gingham' },
  { name: 'Moon' },
] as const

export const getFiltersTabs = (t: LocaleType): TabsType[] => {
  return [
    {
      content: <InstaFilters />,
      id: 'Filters',
      title: 'Filters',
    },
    {
      content: <ClassicSettings />,
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
