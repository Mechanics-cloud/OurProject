import React from 'react'

import { AddComment } from '@/features/posts/ui/PostModal/Content/AddComment'
import { CommentList } from '@/features/posts/ui/PostModal/Content/CommentList'
import { Description } from '@/features/posts/ui/PostModal/Content/Description'
import { SocialGroup } from '@/features/posts/ui/PostModal/Content/SocialGroup'
import { PostInfoHeader } from '@/features/posts/ui/PostModal/Header/PostInfoHeader'
import { PostSlider } from '@/features/posts/ui/PostModal/Slider/PostSlider'
import { observer } from 'mobx-react-lite'
import { StaticImageData } from 'next/image'

type Props = {
  avatarOwner: StaticImageData | string
  description: string | undefined
}

export const PostInfo = observer(({ avatarOwner, description }: Props) => {
  return (
    <div className={'flex w-full h-full border border-dark-100'}>
      <div className={'flex w-full h-full'}>
        <PostSlider />
        <div className={'flex flex-col w-full h-full bg-dark-300'}>
          <PostInfoHeader />
          {description && (
            <Description
              avatarOwner={avatarOwner}
              description={description}
            />
          )}
          <CommentList />
          <SocialGroup />
          <AddComment />
        </div>
      </div>
    </div>
  )
})
