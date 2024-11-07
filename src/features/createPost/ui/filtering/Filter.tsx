import * as React from 'react'

import { Typography } from '@/common'
import Image from 'next/image'

type Props = {
  filterName: string
  imageSrc: string
}
export const Filter = ({ filterName, imageSrc }: Props) => {
  return (
    <span className={'block text-center'}>
      <Image
        alt={filterName}
        className={'object-cover mb-1.5 w-[108px] h-[108px]'}
        height={108}
        src={imageSrc}
        width={108}
      />
      <Typography variant={'reg16'}>{filterName}</Typography>
    </span>
  )
}
