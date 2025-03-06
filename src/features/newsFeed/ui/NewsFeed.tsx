import React, { useEffect } from 'react'

import { DefaultPaths, Loader, Typography } from '@/common'
import { newsFeedStore } from '@/features/newsFeed'
import { EmptyFeed } from '@/features/newsFeed/ui/EmptyFeed'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { NextRouter, useRouter } from 'next/router'

import PostItem from './PostItem'
import { PostSkeleton } from './PostSkeleton'

export const NewsFeed = observer(() => {
  const { getPostsPublicationsFollowers, publicationsFollowers } = newsFeedStore
  const router: NextRouter = useRouter()

  useEffect(() => {
    const controller = new AbortController()

    getPostsPublicationsFollowers(controller.signal)

    return () => controller.abort()
  }, [getPostsPublicationsFollowers])

  if (!publicationsFollowers) {
    return null
  }

  return (
    <>
      {publicationsFollowers.case({
        fulfilled: (publicationsFollowers) => {
          return (
            <>
              {publicationsFollowers.items.length === 0 ? (
                <EmptyFeed />
              ) : (
                publicationsFollowers.items.map((item) => {
                  return (
                    <PostItem
                      item={item}
                      key={item.id}
                      router={router}
                    />
                  )
                })
              )}
            </>
          )
        },
        pending: () => {
          return (
            <>
              <Loader />
              <PostSkeleton />
            </>
          )
        },
        rejected: (e: AxiosError) => {
          if (e.status === 404) {
            router.replace(DefaultPaths.clientError)
          } else if (e.status === 500) {
            router.replace(DefaultPaths.serverError)
          }

          return (
            <div className={'w-full h-full flex justify-center items-center'}>
              <Typography variant={'h2'}>Error</Typography>
            </div>
          )
        },
      })}
    </>
  )
})
