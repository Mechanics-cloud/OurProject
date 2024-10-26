import { useEffect, useState } from 'react'

import Image from 'next/image'

import { getAvatarImages } from './posts/getAvatarImages'

type AvatarGroupWithLikesType = {
  id: number
  likesCount: number
}

export const AvatarGroupWithLikes = ({
  id,
  likesCount,
}: AvatarGroupWithLikesType) => {
  const [avatarImages, setAvatarImages] = useState<null | string[]>(null)

  useEffect(() => {
    getAvatarImages(id).then((avatars) => setAvatarImages(avatars))
  }, [id])

  return (
    <div className={'w-full h-6 flex gap-4 mt-3 mb-6'}>
      <div className={'flex'}>
        {avatarImages &&
          avatarImages.map((avaUrl: string, i: number) => {
            return (
              <Image
                alt={'Avatar'}
                className={`size-6 rounded-full ${i > 0 ? `-ml-2` : ''}`}
                height={192}
                key={i}
                src={avaUrl}
                width={192}
              />
            )
          })}
      </div>
      <span className={'text-[14px] leading-[24px]'}>
        {likesCount} &ldquo;<b>{likesCount === 1 ? 'Like' : 'Likes'}</b>&rdquo;
      </span>
    </div>
  )
}
