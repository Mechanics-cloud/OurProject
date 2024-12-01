import React, { useEffect } from 'react'

import { Loader } from '@/common'
import { observer } from 'mobx-react-lite'
import { NextRouter, useRouter } from 'next/router'

import homePageStore from '../model/homePageStore'
import PostItem from './PostItem'
import { PostSkeleton } from './PostSkeleton'

export const Home = observer(() => {
  const state = homePageStore.publicationsFollowers?.items
  const router: NextRouter = useRouter()

  useEffect(() => {
    homePageStore.getPostsPublicationsFollowers()
  }, [])

  if (homePageStore.isLoading) {
    return (
      <>
        <Loader />
        <PostSkeleton />
      </>
    )
  }

  if (state?.length === 0 && !homePageStore.isLoading) {
    return (
      <div
        className={
          'w-[491px] h-40 border-b mt-[24px] ml-[10.9375rem] flex justify-center items-center bg-dark-100'
        }
      >
        На данный момент нет постов
      </div>
    )
  }

  return state?.map((item) => (
    <PostItem
      item={item}
      key={item.id}
      router={router}
    />
  ))
})
