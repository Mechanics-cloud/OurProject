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
export const ContentModal = ({ comments, post, userProfile }: Props) => {
  return (
    <Overlay
      className={'flex items-center justify-center'}
      isVisible={!!post}
    >
      <PostStoreProvider initialState={{ comments, post }}>
        <ModalWrapper userProfileId={userProfile.id} />
      </PostStoreProvider>
    </Overlay>
  )
}
