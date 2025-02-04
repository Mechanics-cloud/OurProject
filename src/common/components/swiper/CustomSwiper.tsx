import { ImageUrl, cn, useTranslation } from '@/common'
import Image from 'next/image'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'

import { useSwiper } from './useSwiper'

type ImagesTypes = {
  images: Array<{ url: ImageUrl }>
} & Omit<SwiperProps, 'images'>

const CustomSwiper = ({ className, images, ...restProps }: ImagesTypes) => {
  const { t } = useTranslation()
  const { swiperRef } = useSwiper()

  return (
    <Swiper
      className={cn('h-full w-full', className)}
      effect={'fade'}
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
      ref={swiperRef}
      {...restProps}
      spaceBetween={30}
      watchSlidesProgress
    >
      {images.map((image) => (
        <SwiperSlide
          className={'relative w-full h-full'}
          key={String(image.url)}
        >
          <Image
            alt={t.basic.gallery}
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
