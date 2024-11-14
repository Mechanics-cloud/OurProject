import * as React from 'react'

import { Button, Tabs, TabsType, useTranslation } from '@/common'
import { addPostPhotoStore } from '@/features/createPost/model/addPostPhotoStore'
import { ClassicSettings } from '@/features/createPost/ui/filtering/ClassicSettings'
import { InstaFilters } from '@/features/createPost/ui/filtering/InstaFilters'
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
  const addCurrentSliderIndex = addPostPhotoStore.addCurrentSliderIndex

  addCurrentSliderIndex(0)

  return (
    <div className={'border-l-[1px] border-dark-100 w-full'}>
      <Tabs tabsData={getFiltersTabs(t)} />
    </div>
  )
})
