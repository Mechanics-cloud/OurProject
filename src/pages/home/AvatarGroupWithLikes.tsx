import { useEffect, useMemo } from 'react'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'

import { LikesStore } from './posts/postsStore'

type AvatarGroupWithLikesType = {
  likesCount: number
  postId: number
}

export const AvatarGroupWithLikes = observer(
  ({ likesCount, postId }: AvatarGroupWithLikesType) => {
    const likesStore = useMemo(() => new LikesStore(), [])

    useEffect(() => {
      likesStore.getComments(postId)
    }, [postId, likesStore])

    return (
      <div className={'w-full h-6 flex gap-4 mt-3 mb-6'}>
        <div className={'flex'}>
          {likesStore.getAvatarImages &&
            likesStore.getAvatarImages.map((avaUrl: string, i: number) => {
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
          {likesCount} &ldquo;<b>{likesCount === 1 ? 'Like' : 'Likes'}</b>
          &rdquo;
        </span>
      </div>
    )
  }
)
