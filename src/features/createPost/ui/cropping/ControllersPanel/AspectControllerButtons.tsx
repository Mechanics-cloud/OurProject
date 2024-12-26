import * as React from 'react'

import {
  BookPhotoOutline,
  ImageOutline,
  LandscapePhotoOutline,
  SquarePhotoOutline,
} from '@/assets/icons'
import { useTranslation } from '@/common'
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
  const { t } = useTranslation()
  const cropObject = addPostStore.images.getItemById(id)?.crop
  const sizes: ScaleSizeButtonType[] = [
    {
      aspect: addPostStore.images.getItemById(id)?.getOriginAspect() || 1,
      icon: ImageOutline,
      title: t.createPost.cropping.originalRatio,
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
          isCurrent={cropObject?.getAspect() === el.aspect}
          key={index}
          onClick={() => cropObject?.changeAspect(el.aspect)}
          title={el.title}
        />
      ))}
    </>
  )
})
