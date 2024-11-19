import * as React from 'react'

import { ScrollArea } from '@/common'
import { addPostStore, instFiltersData } from '@/features/createPost'
import { observer } from 'mobx-react-lite'
import { InstFilter } from 'src/features/createPost/ui/filtering/InstFilter'

export const InstFilters = observer(() => {
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
          <InstFilter
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
