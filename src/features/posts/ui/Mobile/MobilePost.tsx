import React, { PropsWithChildren } from 'react'

import {
  MobileContent,
  PostStoreProvider,
  PublicPostInfo,
} from '@/features/posts'
import { ProfileData } from '@/features/profile'

type Props = { screenSize?: number } & ProfileData &
  PropsWithChildren &
  PublicPostInfo

export const MobilePost = ({ comments, post, screenSize }: Props) => {
  return (
    <PostStoreProvider initialState={{ comments, post }}>
      <MobileContent screenSize={screenSize} />
    </PostStoreProvider>
  )
}
