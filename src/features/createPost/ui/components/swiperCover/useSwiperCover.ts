import { useCallback, useRef } from 'react'

import { addPostStore } from '@/features/createPost'
import { Swiper } from 'swiper/react'

export const useSwiperCover = () => {
  const swiperRef = useRef<typeof Swiper>(null)
  const addCurrentSliderIndex = addPostStore.addCurrentSliderIndex

  const handleSlideChange = (swiper: typeof Swiper) => {
    addCurrentSliderIndex(swiper.activeIndex)
  }

  const goToSlide = useCallback((index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }, [])

  return { goToSlide, handleSlideChange, swiperRef }
}
