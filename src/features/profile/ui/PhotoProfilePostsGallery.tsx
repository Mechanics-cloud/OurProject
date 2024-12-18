import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { ImageOutline } from '@/assets/icons'
import { Skeleton, cn } from '@/common'
import { HydrateProfileStore, hydrateProfileStore } from '@/features/profile'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import { NoPosts } from './NoPosts'

type Props = {
  store: HydrateProfileStore
}

export const PhotoProfilePostsGallery = observer(({ store }: Props) => {
  const [triggerLoading, setTriggerLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isNoPostsToShow = !store.postsData.items.length
  const { inView, ref } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  })

  useEffect(() => {
    const fetchPosts = async (signal: AbortSignal) => {
      await hydrateProfileStore?.getUserPhoto(signal)
    }

    const triggerRerender = () => {
      if (!containerRef.current) {
        return 0
      }
      const windowHeight = document.documentElement.clientHeight
      const containerRect = containerRef.current.getBoundingClientRect()
      const spaceBelow = windowHeight - containerRect.bottom > 40

      if (spaceBelow && !store.stopRequest) {
        setTriggerLoading((prev) => !prev)
      }
    }

    const controller = new AbortController()

    const signal = controller.signal

    if (inView) {
      fetchPosts(signal).then(() => {
        triggerRerender()
      })
    }

    return () => {
      controller.abort()
    }
  }, [inView, triggerLoading, store.stopRequest])

  return (
    <>
      {isNoPostsToShow ? (
        <NoPosts />
      ) : (
        <>
          <div
            className={cn(
              'grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full h-full'
            )}
            ref={containerRef}
          >
            {store.isUpdatePost && <Skeleton className={'rounded-none'} />}
            {store.postsData.items.map((item) => (
              <Link
                href={`/${item.id}`}
                key={item.id}
              >
                <div className={'relative'}>
                  <Image
                    alt={'image'}
                    className={'w-full h-auto object-cover'}
                    height={228}
                    priority
                    src={item.images[0]?.url || ''}
                    width={342}
                  />
                  {item.images.length > 1 && (
                    <div
                      className={
                        'absolute bottom-1 left-1 bg-dark-700 text-white px-1.5 py-[2px] text-sm flex items-center gap-1 rounded-sm opacity-60'
                      }
                    >
                      <ImageOutline className={'size-3.5'} />
                      {item.images.length}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div
            className={`w-full ${store.stopRequest ? 'h-[1px]' : 'h-[75px]'}`}
            ref={ref}
          >
            {store.isLoading && (
              <Skeleton className={'w-full h-[228px] mt-3'} />
            )}
          </div>
        </>
      )}
    </>
  )
})
