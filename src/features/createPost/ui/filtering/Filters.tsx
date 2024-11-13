import * as React from 'react'

import { Button, Tabs, TabsType, useTranslation } from '@/common'
import { addPostPhotoStore } from '@/features/createPost/model/addPostPhotoStore'
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
      id: 'tab1',
      title: 'Filters',
    },
    {
      content: (
        <div>
          <p>I recommend you to stop</p>
          <Button>Stop here</Button>
        </div>
      ),
      id: 'tab2',
      title: 'Settings',
    },
  ]
}

export const Filters = observer(() => {
  const { t } = useTranslation()
  const addCurrentSliderIndex = addPostPhotoStore.addCurrentSliderIndex

  addCurrentSliderIndex(0)

  return (
    <span className={'border-l-[1px] border-dark-100'}>
      <Tabs tabsData={getFiltersTabs(t)}></Tabs>
    </span>
  )
})
