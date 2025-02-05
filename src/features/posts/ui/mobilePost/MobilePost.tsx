import React, { PropsWithChildren } from 'react'

import {
  PostContent,
  PostInfoHeader,
  PostSlider,
  PostStoreProvider,
  PublicPostInfo,
  SocialGroup,
} from '@/features/posts'
import { ProfileData } from '@/features/profile'

type Props = { screenSize?: number } & ProfileData &
  PropsWithChildren &
  PublicPostInfo

export const MobilePost = ({ comments, post, screenSize }: Props) => {
  return (
    <PostStoreProvider initialState={{ comments, post }}>
      <div className={'w-full h-full flex flex-col items-center'}>
        <PostInfoHeader />
        <PostSlider />
        <SocialGroup />
        <PostContent screenSize={screenSize} />
      </div>
    </PostStoreProvider>
  )
}
