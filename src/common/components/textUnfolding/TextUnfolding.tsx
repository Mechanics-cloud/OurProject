import * as React from 'react'
import { ComponentProps, ReactNode, useState } from 'react'

import { Button, Typography, cn, useTranslation } from '@/common'

type Props = {
  charactersToShow?: number
  children: string
  link?: ReactNode
} & ComponentProps<'p'>
export const TextUnfolding = ({
  charactersToShow = 250,
  children,
  className,
  link,
}: Props) => {
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState<Boolean>(false)
  const isLongEnough = children.length > charactersToShow

  return (
    <Typography
      className={cn('relative', className, 'pb-6')}
      variant={'reg14'}
    >
      {link && <>{link}&nbsp;</>}
      {showMore
        ? children
        : `${
            children.substring(0, charactersToShow) +
            (isLongEnough ? '...' : '')
          }`}
      {isLongEnough && (
        <>
          &nbsp;
          <Button
            className={cn('focus-within:outline-0 underline p-0 float-right')}
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
