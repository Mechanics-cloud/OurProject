import React, { PropsWithChildren } from 'react'

import { Overlay } from '@/common'
import {
  ModalWrapper,
  PostStoreProvider,
  PublicPostInfo,
} from '@/features/posts'
import { ProfileData } from '@/features/profile'

type Props = { screenSize?: number } & ProfileData &
  PropsWithChildren &
  PublicPostInfo
export const ContentModal = ({
  comments,
  post,
  screenSize,
  userProfile,
}: Props) => {
  return (
    <PostStoreProvider initialState={{ comments, post }}>
      <Overlay
        className={'flex items-center justify-center'}
        isVisible={!!post}
      >
        <ModalWrapper userProfileId={userProfile.id} />
      </Overlay>
    </PostStoreProvider>
  )
}
