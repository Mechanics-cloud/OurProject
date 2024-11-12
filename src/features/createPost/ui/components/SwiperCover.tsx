import * as React from 'react'
import { ReactNode, createContext, useCallback, useRef } from 'react'

import { Nullable, cn } from '@/common'
import {
  EffectFade,
  HashNavigation,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper } from 'swiper/react'

type Props = {
  children: ReactNode
}

type SwiperContextValue = {
  goToSlide: (slideIndex: number) => void
}

export const SwiperContext = createContext<Nullable<SwiperContextValue>>(null)

export const SwiperCover = ({ children }: Props) => {
  const swiperRef = useRef<typeof Swiper>(null)
  const goToSlide = useCallback((index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }, [])

  return (
    <SwiperContext.Provider value={{ goToSlide }}>
      <Swiper
        allowTouchMove={false}
        className={cn(
          'absolute h-full w-full top-0 left-0 m-0 shrink-0,',
          'addPost'
        )}
        effect={'fade'}
        grabCursor={false}
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
        onSwiper={(swiperInstance: typeof Swiper) => {
          swiperRef.current = swiperInstance
        }}
        pagination={{
          clickable: true,
        }}
        simulateTouch={false}
        spaceBetween={30}
        touchStartPreventDefault={false}
        watchSlidesProgress
      >
        {children}
      </Swiper>
    </SwiperContext.Provider>
  )
}
