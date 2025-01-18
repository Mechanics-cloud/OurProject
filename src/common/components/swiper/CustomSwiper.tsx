import { ImageUrl, Typography, cn, useTranslation } from '@/common'
import Image from 'next/image'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'

import noPostImage from '/src/assets/images/noUserPosts.svg'

type ImagesTypes = {
  images: Array<{ url: ImageUrl }>
} & Omit<SwiperProps, 'images'>

const CustomSwiper = ({ className, images, ...restProps }: ImagesTypes) => {
  const { t } = useTranslation()

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
      {...restProps}
      spaceBetween={30}
      watchSlidesProgress
    >
      {images.map((image) => (
        <SwiperSlide
          className={'w-full'}
          key={String(image.url)}
        >
          <Image
            alt={'picture from post'}
            className={'block h-full w-full object-cover'}
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
