import React from 'react'

import { Close } from '@/assets/icons'
import { Nullable, Overlay } from '@/common'
import { Post, PostComments } from '@/features/posts'
import { PostContent } from '@/features/posts/ui/PostModal/Content/PostContent'

type Props = {
  comments: Nullable<PostComments>
  onClose: VoidFunction
  post: Nullable<Post>
}

export const PostModal = ({ comments, onClose, post }: Props) => (
  <Overlay
    className={'flex justify-center items-center'}
    isVisible
  >
    <div className={'relative container mx-auto w-[972px] h-[564px]'}>
      <PostContent
        comments={comments}
        post={post}
      />
      <Close
        className={'absolute w-6 h-6 -top-8 -right-10 cursor-pointer'}
        onClick={onClose}
      />
    </div>
  </Overlay>
)
