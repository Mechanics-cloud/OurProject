import Image, { StaticImageData } from 'next/image'
import {
  EffectFade,
  HashNavigation,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/swiper-bundle.css'

type ImageType = {
  createdAt?: string
  fileSize?: number
  height?: number
  uploadId?: string
  url: StaticImageData | string
  width?: number
}

type ImagesTypes = {
  images: Array<ImageType>
}
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
          {/* <div className={'flex h-full w-auto items-center justify-center'}> */}
          <Image
            alt={''}
            className={'block h-full w-full object-cover'}
            src={image.url}
          />
          {/* </div> */}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
