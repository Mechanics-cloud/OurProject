import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { cn } from '@/common'
import { instance } from '@/features/auth'
import Image from 'next/image'
import Link from 'next/link'

import { Data, Foto } from './types'

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Foto[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const { inView, ref } = useInView({
    threshold: 0.1, // Отслеживаем, когда 10% элемента видно
  })

  useEffect(() => {
    if (inView && !isLoading) {
      loadMorePhotos()
    }
  }, [inView])

  const loadMorePhotos = async () => {
    setIsLoading(true)
    const newPhotos = await fetchPhotos(page)

    setPhotos((prevPhotos: any) => [...prevPhotos, ...newPhotos])
    setPage((prevPage) => prevPage + 1)
    setIsLoading(false)
  }

  const fetchPhotos = async (page: number) => {
    // Пример запроса к API
    const dataRequest = await instance.get<Data>(`/v1/posts/SashkaEKB`, {
      // const dataRequest = await instance.get<Data>(`/v1/posts/Evgenia`, {
      params: {
        endCursorPostId: 0,
        pageNumber: page,
        pageSize: 8,
      },
    })

    return dataRequest.data.items.map((item) => ({
      id: item.id,
      images: item.images,
    }))
  }

  // console.log(photos)

  return (
    <div>
      <div className={cn('grid gap-3 grid-cols-gallery w-full mb-4')}>
        {photos.map((item) => (
          <Link
            href={`/${item.id}`}
            key={item.id}
          >
            <Image
              alt={'imagePost'}
              height={228}
              src={item.images[0]?.url || ''}
              width={342}
            />
          </Link>
        ))}
      </div>
      <div
        className={'loading-indicator'}
        ref={ref}
      >
        {isLoading ? 'Loading...' : 'Больше нет постов'}
      </div>
    </div>
  )
}

export default PhotoGallery
