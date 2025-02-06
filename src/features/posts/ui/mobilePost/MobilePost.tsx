import React, { PropsWithChildren } from 'react'

import { PostStoreProvider, PublicPostInfo } from '@/features/posts'
import { MobileContent } from '@/features/posts/ui/mobilePost/MobileContent'
import { ProfileData } from '@/features/profile'

type Props = { screenSize?: number } & ProfileData &
  PropsWithChildren &
  PublicPostInfo

export const MobilePost = ({ comments, post }: Props) => {
  return (
    <PostStoreProvider initialState={{ comments, post }}>
      <MobileContent />
    </PostStoreProvider>
  )
}
