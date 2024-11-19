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
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      profileStore.getPhotoUser()
    }
  }, [inView])

  return (
    <>
      <div className={cn('grid gap-3 grid-cols-gallery w-full mb-4')}>
        {photos.map((item) => (
          <Link
            href={`/${item.id}`}
            key={item.id}
          >
            <Image
              alt={'imagePost'}
              height={228}
              priority
              src={item.images[0]?.url || ''}
              width={342}
            />
          </Link>
        ))}
      </div>
      <div
        className={'mt-10'}
        ref={ref}
      >
        {profileStore.isLoading ? (
          <Skeleton className={'w-full h-[228px]'} />
        ) : (
          <div className={'w-full h-[18px]'}></div>
        )}
      </div>
    </>
  )
})
