import React from 'react'

import { Overlay } from '@/common'
import { Post } from '@/features/posts/ui/PostModal/Post/Post'
import { observer } from 'mobx-react-lite'

type Props = {
  userProfileId: number
}

export const PostModal = observer(({ userProfileId }: Props) => (
  <Overlay
    className={'flex justify-center items-center'}
    isVisible
  >
    <Post userId={userProfileId} />
  </Overlay>
))
