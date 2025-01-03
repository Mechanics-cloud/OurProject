import { ImageUrl } from '@/common'
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
  images: Array<{ url: ImageUrl }>
}

//todo remove component
const Slider = ({ images }: ImagesTypes) => {
  if (images.length === 0) {
    return <p>Нет изображений для отображения</p>
  }

  return (
    <Swiper
      className={'h-full w-full'}
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
      spaceBetween={30}
      watchSlidesProgress
    >
      {images.map((image, index) => (
        <SwiperSlide
          className={'w-full'}
          key={index}
        >
          <Image
            alt={''}
            className={'block h-full w-full object-cover'}
            src={image.url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
