import * as React from 'react'

import { addPostStore } from '@/features/createPost'
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
  const photos = addPostStore.photos
  const currentSliderIndex = addPostStore.currentSliderIndex || 0

  return (
    <div className={'flex flex-wrap gap-x-6 gap-y-5 pt-6 px-[53px] self-start'}>
      {filtersData.map((filter, index) => (
        <Filter
          filterName={filter.name}
          imageSrc={
            photos[currentSliderIndex].croppedImgData.photoUrl ??
            photos[currentSliderIndex].url
          }
          key={index}
          onClick={() => {}}
        />
      ))}
    </div>
  )
})
