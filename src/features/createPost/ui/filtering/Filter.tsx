import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'

import { Typography, cn } from '@/common'
import Image from 'next/image'

type Props = {
  filterName: string
  imageSrc: string
} & ComponentPropsWithoutRef<'span'>
export const Filter = ({ className, filterName, imageSrc, onClick }: Props) => {
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
        className={'object-cover mb-1.5 w-[108px] h-[108px] '}
        height={108}
        src={imageSrc}
        width={108}
      />
      <Typography variant={'reg16'}>{filterName}</Typography>
    </span>
  )
}
