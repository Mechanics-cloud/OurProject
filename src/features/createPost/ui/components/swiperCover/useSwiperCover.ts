import { useCallback, useRef } from 'react'

import { Nullable } from '@/common'
import { addPostStore } from '@/features/createPost'
import { Swiper as SwiperInstance } from 'swiper'

export const useSwiperCover = () => {
  const swiperRef = useRef<Nullable<SwiperInstance>>(null)
  const addCurrentSliderIndex = addPostStore.photos.setCurrentIndex

  const onSlideChange = (swiper: SwiperInstance) => {
    addCurrentSliderIndex(swiper.activeIndex)
  }

  const goToSlide = useCallback((index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }, [])

  return { goToSlide, onSlideChange, swiperRef }
}
