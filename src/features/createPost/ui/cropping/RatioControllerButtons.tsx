import * as React from 'react'
import { ElementType } from 'react'

import {
  BookPhotoOutline,
  ImageOutline,
  LandscapePhotoOutline,
  SquarePhotoOutline,
} from '@/assets/icons'
import { typographyVariants } from '@/common'

type ScaleSizeButtonType = {
  icon: ElementType
  title: string
}

export const RatioControllerButtons = () => {
  //todo перевод
  const sizes: ScaleSizeButtonType[] = [
    { icon: ImageOutline, title: 'Оригинал' },
    { icon: SquarePhotoOutline, title: '1:1' },
    { icon: BookPhotoOutline, title: '4:5' },
    { icon: LandscapePhotoOutline, title: '16:9' },
  ]

  return (
    <>
      {sizes.map((button, index) => (
        <ScaleSizeButton
          icon={button.icon}
          key={index}
          title={button.title}
        />
      ))}
    </>
  )
}

const ScaleSizeButton = ({ icon, title }: ScaleSizeButtonType) => {
  const Component = icon

  return (
    <span className={'flex justify-between gap-8'}>
      <span className={typographyVariants({ variant: 'h3' })}>{title}</span>
      <Component className={'w-6 h-6'} />
    </span>
  )
}
