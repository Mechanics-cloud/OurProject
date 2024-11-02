import * as React from 'react'
import { ComponentProps, useState } from 'react'

import { Button, Typography, cn, useTranslation } from '@/common'

type Props = {
  charactersToShow?: number
  children: string
} & ComponentProps<'p'>
export const TextUnfolding = ({
  charactersToShow = 250,
  children,
  className,
}: Props) => {
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState<Boolean>(false)
  const isLongEnough = children.length > charactersToShow

  return (
    <Typography
      className={cn('relative pb-6', className)}
      variant={'reg14'}
    >
      {showMore
        ? children
        : `${
            children.substring(0, charactersToShow) +
            (isLongEnough ? '...' : '')
          }`}
      {isLongEnough && (
        <>
          <span className={'inline-block w-2'}></span>
          <Button
            className={'focus-within:outline-0 underline p-0'}
            onClick={() => {
              setShowMore((prevState) => !prevState)
            }}
            variant={'text'}
          >
            {showMore ? t.showText.less : t.showText.more}
          </Button>
        </>
      )}
    </Typography>
  )
}
