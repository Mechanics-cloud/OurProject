import { useEffect, useMemo } from 'react'

import { BasicPost, ImageUrl, Typography, useTranslation } from '@/common'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'

import { LikesStore } from '../model'

type Props = {
  item: BasicPost
}

export const AvatarGroupWithLikes = observer(({ item }: Props) => {
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
          firstThreeAvatarImages.map((avaUrl: ImageUrl, i: number) => {
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
          })}
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
