import * as React from 'react'
import { ComponentProps, ReactNode } from 'react'

import { Button, Typography, cn, useToggle, useTranslation } from '@/common'
import { languageCharactersCalculation } from 'src/common/components/textUnfolding/languageCharactersCalculation'

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
  const { state: showMore, toggle: toggleShowMore } = useToggle()
  const charactersCountToShow = languageCharactersCalculation(
    children,
    charactersToShow
  )
  const isLongEnough = children.length > charactersCountToShow

  return (
    <Typography
      className={cn('relative break-all', className, 'pb-6')}
      variant={'reg14'}
    >
      {link && <>{link}&nbsp;</>}
      {showMore
        ? children
        : `${
            children.substring(0, charactersCountToShow) +
            (isLongEnough ? '...' : '')
          }`}
      {isLongEnough && (
        <>
          &nbsp;
          <Button
            className={cn('focus-within:outline-0 underline p-0 float-right')}
            onClick={toggleShowMore}
            variant={'text'}
          >
            {showMore ? t.showText.less : t.showText.more}
          </Button>
        </>
      )}
    </Typography>
  )
}
