import * as React from 'react'
import {
  ComponentPropsWithoutRef,
  createContext,
  useCallback,
  useRef,
} from 'react'

import { Nullable, cn } from '@/common'
import { addPostStore } from '@/features/createPost/model/addPostStore'
import { observer } from 'mobx-react-lite'
import {
  EffectFade,
  HashNavigation,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper } from 'swiper/react'

type SwiperContextValue = {
  goToSlide: (slideIndex: number) => void
}

export const SwiperContext = createContext<Nullable<SwiperContextValue>>(null)

export const SwiperCover = observer(
  ({ children, className }: ComponentPropsWithoutRef<'div'>) => {
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

    return (
      <SwiperContext.Provider value={{ goToSlide }}>
        <Swiper
          allowTouchMove={false}
          className={cn(
            'absolute h-full w-full top-0 left-0 m-0 shrink-0,',
            'addPost',
            className
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
          onSlideChange={handleSlideChange}
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
)
