import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Skeleton, cn } from '@/common'
import { profileStore } from '@/features/profile'
import { NoPosts } from '@/features/profile/ui/NoPosts'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

export const PhotoProfilePostsGallery = observer(() => {
  const photos = profileStore?.photos
  const [isNeedLoading, setIsNeedLoading] = useState(true)
  const isNoPostsToShow = profileStore.stopRequest && photos?.length === 0

  const { inView, ref } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  const { inView: inViewWhole, ref: refWhole } = useInView({
    initialInView: false,
    threshold: 1,
    triggerOnce: true,
  })

  useEffect(() => {
    const fetchPosts = async (signal: AbortSignal) => {
      await profileStore.getUserPhoto({ signal })
      if (inViewWhole && isNeedLoading) {
        setIsNeedLoading(false)
      }
    }
    const controller = new AbortController()

    const signal = controller.signal

    if (inView || isNeedLoading) {
      fetchPosts(signal)
    }

    return () => {
      controller.abort()
    }
  }, [inView, isNeedLoading, inViewWhole])

  return (
    <>
      {isNoPostsToShow ? (
        <NoPosts />
      ) : (
        <>
          <div
            className={cn(
              'grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full h-full',
              'imageContainer'
            )}
            ref={refWhole}
          >
            {photos.map((item) => (
              <Link
                href={`/${item.id}`}
                key={item.id}
              >
                <Image
                  alt={'image'}
                  className={'w-full h-auto object-cover'}
                  height={228}
                  priority
                  src={item.images[0]?.url || ''}
                  width={342}
                />
              </Link>
            ))}
          </div>
          <div
            className={`w-full ${
              profileStore.stopRequest ? 'h-[1px]' : 'h-[75px]'
            }`}
            ref={ref}
          >
            {profileStore.isLoading && (
              <Skeleton className={'w-full h-[228px] mt-3'} />
            )}
          </div>
        </>
      )}
    </>
  )
})
