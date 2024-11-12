import * as React from 'react'

import { addPostPhotoStore } from '@/features/createPost/model/addPostPhotoStore'
import { observer } from 'mobx-react-lite'

import { Filter } from './Filter'

type Props = { src: string }

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

export const Filters = observer(({ src }: Props) => {
  const photos = addPostPhotoStore.photos

  return (
    <span
      className={'flex flex-wrap gap-x-6 gap-y-5 mt-6 px-[54px] self-start'}
    >
      {filtersData.map((filter, index) => (
        <Filter
          filterName={filter.name}
          imageSrc={src}
          key={index}
        />
      ))}
    </span>
  )
})
