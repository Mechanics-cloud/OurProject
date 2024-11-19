import * as React from 'react'

import { ScrollArea } from '@/common'
import { addPostStore, instFiltersData } from '@/features/createPost'
import { observer } from 'mobx-react-lite'

import { Filter } from './Filter'

export const InstaFilters = observer(() => {
  const photos = addPostStore.photos
  const addFilter = addPostStore.addFilter
  const currentSliderIndex = addPostStore.currentSliderIndex || 0

  return (
    <ScrollArea className={'h-[450px]'}>
      <div
        className={
          'flex flex-wrap gap-x-6 gap-y-5 pt-6 pl-[54px] pr-[36px] self-start'
        }
      >
        {instFiltersData.map((filter, index) => (
          <Filter
            filterName={filter.name}
            filterSettings={filter.style}
            imageSrc={
              photos[currentSliderIndex].croppedImgData.photoUrl ??
              photos[currentSliderIndex].url
            }
            key={index}
            onClick={() => {
              addFilter(currentSliderIndex, filter.style)
            }}
          />
        ))}
      </div>
    </ScrollArea>
  )
})
