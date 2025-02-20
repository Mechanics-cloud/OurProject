import { useEffect, useRef } from 'react'

import { SwiperRef } from 'swiper/react'

export const useSwiper = () => {
  const swiperRef = useRef<SwiperRef | null>(null)

  useEffect(() => {
    const swiper = swiperRef.current?.swiper

    if (!swiper) {
      return
    }

    const onArrowClick = (e: MouseEvent) => {
      e.stopPropagation()
    }

    const nextButton = swiper.navigation.nextEl
    const prevButton = swiper.navigation.prevEl

    if (nextButton) {
      nextButton.addEventListener('click', onArrowClick)
    }
    if (prevButton) {
      prevButton.addEventListener('click', onArrowClick)
    }

    return () => {
      if (nextButton) {
        nextButton.removeEventListener('click', onArrowClick)
      }
      if (prevButton) {
        prevButton.removeEventListener('click', onArrowClick)
      }
    }
  }, [])

  return { swiperRef }
}
