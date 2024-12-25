import * as React from 'react'

import { ScrollArea } from '@/common'
import { addPostStore } from '@/features/createPost'
import { instFiltersData } from '@/features/createPost/model/constants'
import { observer } from 'mobx-react-lite'

import { InstFilter } from './InstFilter'

export const InstFilters = observer(() => {
  const photos = addPostStore.photos.toArray
  // const addInstFilter = addPostStore.addInstFilter
  const currentSliderIndex = addPostStore.currentSliderIndex || 0
  const addInstFilter =
    addPostStore.photos.toArray[currentSliderIndex].addInstFilter

  return (
    <ScrollArea className={'md:h-[430px]'}>
      <div
        className={
          'flex flex-wrap gap-x-6 gap-y-5 pt-6 pl-[54px] pr-[36px] self-start justify-center overflow-y-hidden'
        }
      >
        {instFiltersData.map((filter, index) => (
          <InstFilter
            filterName={filter.name}
            filterSettings={filter.style}
            imageSrc={
              photos[currentSliderIndex].preparedImgData.photoUrl ??
              photos[currentSliderIndex].url
            }
            key={index}
            onClick={() => {
              addInstFilter(filter.style)
            }}
          />
        ))}
      </div>
    </ScrollArea>
  )
})
