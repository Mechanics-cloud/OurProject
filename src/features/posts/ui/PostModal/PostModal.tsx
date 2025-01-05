import React from 'react'

import { Close } from '@/assets/icons'
import { Nullable, Overlay, PathService, Paths } from '@/common'
import { Post, PostComments } from '@/features/posts'
import { PostContent } from '@/features/posts/ui/PostModal/Content/PostContent'
import Link from 'next/link'

type Props = {
  comments: Nullable<PostComments>
  post: Nullable<Post>
}

export const PostModal = ({ comments, post }: Props) => {
  return (
    <Overlay
      className={'flex justify-center items-center'}
      isVisible
    >
      <div className={'relative container mx-auto w-[972px] h-[564px]'}>
        <PostContent
          comments={comments}
          post={post}
        />
        <Link
          href={PathService.generatePath(Paths.userProfile, {
            userId: post?.ownerId,
          })}
        >
          <Close
            className={'absolute w-6 h-6 -top-8 -right-10 cursor-pointer'}
          />
        </Link>
      </div>
    </Overlay>
  )
}
