import React, { useEffect } from 'react'

import { Loader } from '@/common'
import { newsFeedStore } from '@/features/newsFeed'
import { EmptyFeed } from '@/features/newsFeed/ui/EmptyFeed'
import { observer } from 'mobx-react-lite'
import { NextRouter, useRouter } from 'next/router'

import PostItem from './PostItem'
import { PostSkeleton } from './PostSkeleton'

export const NewsFeed = observer(() => {
  const state = newsFeedStore.publicationsFollowers?.items
  const router: NextRouter = useRouter()
  const Component = state?.map((item) => (
    <PostItem
      item={item}
      key={item.id}
      router={router}
    />
  ))

  useEffect(() => {
    newsFeedStore.getPostsPublicationsFollowers()
  }, [])

  if (newsFeedStore.isLoading || !Component) {
    return (
      <>
        <Loader />
        <PostSkeleton />
      </>
    )
  }

  if (state?.length === 0 && !newsFeedStore.isLoading) {
    return <EmptyFeed />
  }

  return Component
})
