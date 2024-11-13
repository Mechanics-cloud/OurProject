import * as React from 'react'

import { addPostPhotoStore } from '@/features/createPost/model/addPostPhotoStore'
import { observer } from 'mobx-react-lite'

import { Filter } from './Filter'

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

export const InstaFilters = observer(() => {
  const photos = addPostPhotoStore.photos
  const currentSliderIndex = addPostPhotoStore.currentSliderIndex || 0

  return (
    <span
      className={'flex flex-wrap gap-x-6 gap-y-5 pt-6 px-[53px] self-start'}
    >
      {filtersData.map((filter, index) => (
        <Filter
          filterName={filter.name}
          imageSrc={photos[currentSliderIndex].url}
          key={index}
          onClick={() => {}}
        />
      ))}
    </span>
  )
})
