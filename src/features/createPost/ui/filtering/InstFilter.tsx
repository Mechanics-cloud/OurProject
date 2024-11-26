import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'

import { Typography, cn } from '@/common'
import { FiltersState } from '@/features/createPost'
import { prepareFilterStyles } from '@/features/createPost/model/utils/prepareFilterStyles'
import Image from 'next/image'

type Props = {
  filterName: string
  filterSettings: FiltersState
  imageSrc: string
} & ComponentPropsWithoutRef<'span'>

export const InstFilter = ({
  className,
  filterName,
  filterSettings,
  imageSrc,
  onClick,
}: Props) => {
  return (
    <span
      className={cn(
        'block text-center hover:cursor-pointer transition hover:-translate-y-1.5 hover:text-accent-500',
        className
      )}
      onClick={onClick}
    >
      <Image
        alt={filterName}
        className={cn('object-cover mb-1.5 w-[108px] h-[108px]')}
        height={108}
        src={imageSrc}
        style={{ filter: prepareFilterStyles(filterSettings) }}
        width={108}
      />
      <Typography variant={'reg16'}>{filterName}</Typography>
    </span>
  )
}
