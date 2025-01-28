import React from 'react'

import { Overlay } from '@/common'
import { PostStoreProvider, PublicPostInfo } from '@/features/posts'
import { Post } from '@/features/posts/ui/PostModal/Post/Post'

type Props = {
  userProfileId: number
} & PublicPostInfo

export const PostModal = ({ comments, post, userProfileId }: Props) => (
  <Overlay
    className={'flex justify-center items-center'}
    isVisible
  >
    <PostStoreProvider initialState={{ comments, post }}>
      <Post userId={userProfileId} />
    </PostStoreProvider>
  </Overlay>
)
