import React from 'react'
import { useInView } from 'react-intersection-observer'

import { ImageOutline } from '@/assets/icons'
import { PathService, Paths, Skeleton, cn } from '@/common'
import { HydrateProfileStore, useFetchPosts } from '@/features/profile'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import { NoPosts } from './NoPosts'

type Props = {
  store: HydrateProfileStore
}

const options = {
  threshold: 0.5,
  triggerOnce: false,
}

export const PhotoProfilePostsGallery = observer(({ store }: Props) => {
  const { isLoading, isUpdatePost, postsData, stopRequest } = store
  const { inView, ref: skeletonRef } = useInView(options)
  const { ref: containerRef } = useFetchPosts(inView, stopRequest)

  return (
    <>
      {postsData.items.length ? (
        <>
          <div
            className={cn(
              'grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full h-full'
            )}
            ref={containerRef}
          >
            {isUpdatePost && <Skeleton className={'rounded-none'} />}
            {postsData.items.map((post) => (
              <Link
                href={PathService.generatePath(Paths.userPost, {
                  postId: post.id,
                  userId: post.ownerId,
                })}
                key={post.id}
              >
                <div className={'relative'}>
                  <Image
                    alt={'image'}
                    className={'w-full h-auto object-cover'}
                    height={228}
                    priority
                    src={post.images[0]?.url || ''}
                    width={342}
                  />
                  {post.images.length > 1 && (
                    <div
                      className={
                        'absolute bottom-1 left-1 bg-dark-700 text-white px-1.5 py-[2px] text-sm flex items-center gap-1 rounded-sm opacity-60'
                      }
                    >
                      <ImageOutline className={'size-3.5'} />
                      {post.images.length}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div
            className={`w-full ${stopRequest ? 'h-[1px]' : 'h-[75px]'}`}
            ref={skeletonRef}
          >
            {isLoading && <Skeleton className={'w-full h-[228px] mt-3'} />}
          </div>
        </>
      ) : (
        <NoPosts />
      )}
    </>
  )
})
