import React, { PropsWithChildren } from 'react'

import { PostStoreProvider, PublicPostInfo } from '@/features/posts'
import { MobileContent } from '@/features/posts/ui/Mobile/MobileContent'
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
