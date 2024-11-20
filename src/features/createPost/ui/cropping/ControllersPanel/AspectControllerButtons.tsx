import * as React from 'react'

import {
  BookPhotoOutline,
  ImageOutline,
  LandscapePhotoOutline,
  SquarePhotoOutline,
} from '@/assets/icons'
import {
  AspectButton,
  ScaleSizeButtonType,
  addPostStore,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

type Props = {
  id: string
}

export const AspectControllerButtons = observer(({ id }: Props) => {
  const changeAspect = addPostStore.changeAspect
  const currentRatio = addPostStore.getAspect(id)
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

  return (
    <>
      {sizes.map((el, index) => (
        <AspectButton
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
