import React, { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Skeleton, cn } from '@/common'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import { profileStore } from '../settings'

export const PhotoProfilePostsGallery = observer(() => {
  const photos = profileStore?.photos
  const [isNeedLoading, setIsNeedLoading] = useState(0)

  const fetchPosts = useCallback(
    async (signal: AbortSignal) => {
      await profileStore.getPhotoUser({ signal })
      setIsNeedLoading((prevState) => prevState + 1)
    },
    [setIsNeedLoading]
  )

  const { inView, ref } = useInView({
    threshold: 0.1,
  })

  useEffect(() => {
    const controller = new AbortController()

    const signal = controller.signal

    if (inView) {
      fetchPosts(signal)
    }

    return () => {
      controller.abort()
    }
  }, [inView, fetchPosts])

  useEffect(() => {
    const imageContainer = document.querySelector('.imageContainer')
    const controller = new AbortController()
    const signal = controller.signal

    if (!isNeedLoading || !imageContainer) {
      return
    }
    if (imageContainer.clientHeight < document.body.clientHeight - 300) {
      fetchPosts(signal)
    }

    return () => {
      controller.abort()
    }
  }, [isNeedLoading, fetchPosts])

  return (
    <>
      <div
        className={cn(
          'grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full h-full',
          'imageContainer'
        )}
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
          profileStore.stopRequest ? 'h-[1px]' : 'h-[15px]'
        }`}
        ref={ref}
      >
        {profileStore.isLoading && <Skeleton className={'w-full h-[228px]'} />}
      </div>
    </>
  )
})
