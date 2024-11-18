import * as React from 'react'

import { ScrollArea } from '@/common'
import { addPostStore } from '@/features/createPost'
import { observer } from 'mobx-react-lite'

import { Filter } from './Filter'

type FilterType = {
  name: string
  style: string
}

const filtersData: FilterType[] = [
  { name: 'Normal', style: '' },
  { name: '1977', style: 'filter-1977' },
  { name: 'Aden', style: 'filter-aden' },
  { name: 'Amaro', style: 'filter-amaro' },
  { name: 'Ashby', style: 'filter-ashby' },
  { name: 'Brooklyn', style: 'filter-brooklyn' },
  { name: 'Crema', style: 'filter-crema' },
  { name: 'Lofi', style: 'filter-lofi' },
  { name: 'Ludwi', style: 'filter-ludwi' },
  { name: 'Moon', style: 'filter-moon' },
  { name: 'Perpetua', style: 'filter-perpetua' },
  { name: 'Willow', style: 'filter-willow' },
  { name: 'Xpro', style: 'filter-xpro' },
] as const

export const InstaFilters = observer(() => {
  const photos = addPostStore.photos
  const currentSliderIndex = addPostStore.currentSliderIndex || 0

  return (
    <ScrollArea className={'h-[450px]'}>
      <div
        className={
          'flex flex-wrap gap-x-6 gap-y-5 pt-6 pl-[54px] pr-[36px] self-start'
        }
      >
        {filtersData.map((filter, index) => (
          <Filter
            filterName={filter.name}
            filterSettings={filter.style}
            imageSrc={
              photos[currentSliderIndex].croppedImgData.photoUrl ??
              photos[currentSliderIndex].url
            }
            key={index}
            onClick={() => {}}
          />
        ))}
      </div>
    </ScrollArea>
  )
})
