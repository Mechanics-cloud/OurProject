import { ImageUrl, cn } from '@/common'
import Image from 'next/image'
import {
  EffectFade,
  HashNavigation,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'

type ImagesTypes = {
  className?: string
  images: Array<{ url: ImageUrl }>
}
const CustomSwiper = ({ className, images }: ImagesTypes) => {
  if (images.length === 0) {
    return <p>Нет изображений для отображения</p>
  }

  return (
    <Swiper
      className={cn('h-full w-full', className)}
      effect={'fade'}
      hashNavigation={{
        watchState: true,
      }}
      keyboard={{
        enabled: true,
      }}
      modules={[Navigation, Pagination, EffectFade]}
      navigation
      noSwiping
      noSwipingSelector={'button'}
      pagination={{
        clickable: true,
      }}
      spaceBetween={30}
      watchSlidesProgress
    >
      {images.map((image) => (
        <SwiperSlide
          className={'relative w-full h-full'}
          key={String(image.url)}
        >
          <Image
            alt={'picture from post'}
            className={'absolute inset-0 h-full w-full object-cover'}
            fill
            priority
            sizes={'(max-width: 768px) 100vw, 33vw'}
            src={image.url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CustomSwiper
