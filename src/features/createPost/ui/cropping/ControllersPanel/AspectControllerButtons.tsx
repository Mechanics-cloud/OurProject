import * as React from 'react'
import { ComponentPropsWithoutRef, ElementType } from 'react'

import {
  BookPhotoOutline,
  ImageOutline,
  LandscapePhotoOutline,
  SquarePhotoOutline,
} from '@/assets/icons'
import { Typography, cn, typographyVariants } from '@/common'
import { addPostStore } from '@/features/createPost/model/addPostPhotoStore'
import { observer } from 'mobx-react-lite'

type ScaleSizeButtonType = {
  aspect: number
  icon: ElementType
  title: string
}

type Props = {
  id: string
}

export const AspectControllerButtons = observer(({ id }: Props) => {
  //todo перевод
  const sizes: ScaleSizeButtonType[] = [
    {
      aspect: addPostStore.getOriginAspect(id),
      icon: ImageOutline,
      title: 'Оригинал',
    },
    { aspect: 1, icon: SquarePhotoOutline, title: '1:1' },
    { aspect: 0.8, icon: BookPhotoOutline, title: '4:5' },
    { aspect: 1.7, icon: LandscapePhotoOutline, title: '16:9' },
  ]

  const changeAspect = addPostStore.changeAspect
  const currentRatio = addPostStore.getAspect(id)

  return (
    <>
      {sizes.map((el, index) => (
        <ScaleSizeButton
          icon={el.icon}
          isCurrent={currentRatio === el.aspect}
          key={index}
          onClick={() => changeAspect(id, el.aspect)}
          title={el.title}
        />
      ))}
    </>
  )
})

type ScaleSizeButtonPropsType = {
  isCurrent: boolean
} & ComponentPropsWithoutRef<'span'> &
  Omit<ScaleSizeButtonType, 'aspect'>

const ScaleSizeButton = ({
  icon,
  isCurrent,
  onClick,
  title,
}: ScaleSizeButtonPropsType) => {
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
