import { useEffect, useMemo } from 'react'

import { Typography, useTranslation } from '@/common'
import { observer } from 'mobx-react-lite'
import Image, { StaticImageData } from 'next/image'

import { LikesStore } from '../model'
import { Item } from '../model/newsFeed.types'

type ItemProps = {
  item: Item
}

export const AvatarGroupWithLikes = observer(({ item }: ItemProps) => {
  const { t } = useTranslation()

  const likesStore = useMemo(() => new LikesStore(), [])
  const firstThreeAvatarImages = likesStore.avatarImages
  const likesCount = item.likesCount
  const postId = item.id

  const like = item.likesCount === 1 ? t.homePage.like : t.homePage.likes

  useEffect(() => {
    likesStore.getPostLikes(postId)
  }, [likesCount, postId, likesStore])

  return (
    <div
      className={`w-full h-6 flex mt-3 mb-6 ${
        firstThreeAvatarImages ? 'gap-4' : ''
      }`}
    >
      <div className={'flex'}>
        {firstThreeAvatarImages &&
          firstThreeAvatarImages.map(
            (avaUrl: StaticImageData | string, i: number) => {
              return (
                <Image
                  alt={'Avatar'}
                  className={`size-6 rounded-full ${i > 0 ? `-ml-2` : ''}`}
                  height={45}
                  key={i}
                  src={avaUrl}
                  width={45}
                />
              )
            }
          )}
      </div>
      <span className={'text-[14px] leading-[24px]'}>
        {item.likesCount} &ldquo;
        <Typography
          className={'inline'}
          variant={'bold14'}
        >
          {like}
        </Typography>
        &rdquo;
      </span>
    </div>
  )
})
