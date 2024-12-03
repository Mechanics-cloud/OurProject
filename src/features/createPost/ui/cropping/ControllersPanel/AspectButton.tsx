import { ComponentPropsWithoutRef } from 'react'
import * as React from 'react'

import { Typography, cn, typographyVariants } from '@/common'
import { ScaleSizeButtonType } from '@/features/createPost'

type Props = {
  isCurrent: boolean
} & ComponentPropsWithoutRef<'span'> &
  Omit<ScaleSizeButtonType, 'aspect'>

export const AspectButton = ({ icon, isCurrent, onClick, title }: Props) => {
  const Component = icon

  return (
    <span
      className={
        'flex justify-between gap-8 cursor-pointer hover:text-accent-500 transition'
      }
      onClick={onClick}
    >
      {isCurrent ? (
        <span
          className={cn(
            typographyVariants({ variant: 'h3' }),
            'text-light-100'
          )}
        >
          {title}
        </span>
      ) : (
        <Typography
          className={'text-light-900'}
          variant={'reg16'}
        >
          {title}
        </Typography>
      )}

      <Component className={'w-6 h-6'} />
    </span>
  )
}
