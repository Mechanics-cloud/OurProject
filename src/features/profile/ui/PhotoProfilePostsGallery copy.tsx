import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { Skeleton, cn } from '@/common'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import { profileStore } from '../settings'

export const PhotoProfilePostsGallery = observer(() => {
  const photos = profileStore?.photos

  const { inView, ref } = useInView({
    threshold: 0.5,
  })

  useEffect(() => {
    const windowHeight = document.documentElement.clientHeight

    const controller = new AbortController()
    const signal = controller.signal

    if (inView && windowHeight > 965) {
      profileStore.getPhotoUser({ pageSize: 16, signal })
    } else if (inView) {
      profileStore.getPhotoUser({ signal })
    }

    return () => {
      controller.abort()
    }
  }, [inView])

  return (
    <>
      <div
        className={cn(
          'grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full'
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
          profileStore.stopRequest ? 'h-[1px]' : 'h-[115px]'
        }`}
        ref={ref}
      >
        {profileStore.isLoading && <Skeleton className={'w-full h-[228px]'} />}
      </div>
    </>
  )
})
