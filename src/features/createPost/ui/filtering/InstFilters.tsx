import * as React from 'react'

import { ScrollArea } from '@/common'
import { createPostStore } from '@/features/createPost'
import { instFiltersData } from '@/features/createPost/model/constants'
import { observer } from 'mobx-react-lite'

import { InstFilter } from './InstFilter'

export const InstFilters = observer(() => {
  const photo = createPostStore.images.getByCurrentIndex()

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
            imageSrc={photo.preparedImgData.photoUrl ?? photo.url}
            key={index}
            onClick={() => {
              photo.filter.addInstFilter(filter.style)
            }}
          />
        ))}
      </div>
    </ScrollArea>
  )
})
