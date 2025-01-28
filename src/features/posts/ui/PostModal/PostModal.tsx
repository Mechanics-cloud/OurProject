import React from 'react'

import { Close } from '@/assets/icons'
import { Overlay } from '@/common'
import { PublicPostInfo } from '@/features/posts'
import { PostContent } from '@/features/posts/ui/PostModal/Content/PostContent'

type Props = {
  onClose: () => void
} & PublicPostInfo

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
        className={'absolute w-6 h-6 -top-6 -right-6 cursor-pointer'}
        onClick={onClose}
      />
    </div>
  </Overlay>
)
