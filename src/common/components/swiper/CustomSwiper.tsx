import { ImageUrl, cn } from '@/common'
import Image from 'next/image'
import {
  EffectFade,
  HashNavigation,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'

type ImagesTypes = {
  className?: string
  images: Array<{ url: ImageUrl }>
} & Omit<SwiperProps, 'className' | 'images'>

const CustomSwiper = ({ className, images, ...restProps }: ImagesTypes) => {
  if (images.length === 0) {
    return <p>Нет изображений для отображения</p>
    //TODO t.slider.noText - возможно вернуть заставку, что картинку поста неудалось загрузить
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
      modules={[Navigation, Pagination, EffectFade, HashNavigation]}
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
