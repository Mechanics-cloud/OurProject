import * as React from 'react'
import { ComponentPropsWithoutRef, createContext } from 'react'

import { Nullable, cn } from '@/common'
import { observer } from 'mobx-react-lite'
import { Swiper as SwiperInstance } from 'swiper'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'

import { useSwiperCover } from './useSwiperCover'

type SwiperContextValue = {
  goToSlide: (slideIndex: number) => void
}

export const SwiperContext = createContext<Nullable<SwiperContextValue>>(null)

export const SwiperCover = observer(
  ({ children, className }: ComponentPropsWithoutRef<'div'>) => {
    const { goToSlide, onSlideChange, swiperRef } = useSwiperCover()

    return (
      <SwiperContext.Provider value={{ goToSlide }}>
        <Swiper
          allowTouchMove={false}
          className={cn(
            'absolute h-full w-full top-0 left-0 m-0 shrink-0,',
            'swiper-nav-medium swiper-btn-bg-medium swiper-pagination-bottom-18 swiper-pagination-mobile-hidden',
            className
          )}
          effect={'fade'}
          grabCursor={false}
          keyboard={{
            enabled: true,
          }}
          modules={[Navigation, Pagination, EffectFade]}
          navigation
          noSwiping
          noSwipingSelector={'button'}
          onSlideChange={onSlideChange}
          onSwiper={(swiperInstance: SwiperInstance) => {
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
)
