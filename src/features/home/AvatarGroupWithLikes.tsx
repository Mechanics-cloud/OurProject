import { useEffect, useMemo } from 'react'

import { observer } from 'mobx-react-lite'
import Image from 'next/image'

import { Item } from './home.types'
import { LikesStore } from './posts/postsStore'

// type AvatarGroupWithLikesType = {
//   likesCount: number
//   postId: number
// }

type ItemProps = {
  item: Item
}
// { likesCount, postId }
export const AvatarGroupWithLikes = observer(({ item }: ItemProps) => {
  const likesStore = useMemo(() => new LikesStore(), [])

  useEffect(() => {
    likesStore.getPostLikes(item.id)
  }, [item.likesCount, likesStore])

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
        {item.likesCount} &ldquo;
        <b>{item.likesCount === 1 ? 'Like' : 'Likes'}</b>
        &rdquo;
      </span>
    </div>
  )
})
