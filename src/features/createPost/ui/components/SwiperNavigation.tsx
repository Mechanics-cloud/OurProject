import { ArrowIosBack, ArrowIosForward } from '@/assets/icons'
import { cn } from '@/common'

export const SwiperNavigation = ({ swiper }: { swiper: any }) => {
  const handlePrevClick = () => {
    if (swiper) {
      swiper.slidePrev()
    }

    return
  }

  const handleNextClick = () => {
    if (swiper) {
      swiper.slideNext()
    }

    return
  }

  return (
    <>
      <div
        className={cn('swiper-button-prev', 'w-12 h-12')}
        onClick={handlePrevClick}
      >
        <ArrowIosBack className={'h-4 w-4 '} />
      </div>
      <div
        className={cn('swiper-button-next', 'w-12 h-12')}
        onClick={handleNextClick}
      >
        <ArrowIosBack />
      </div>
    </>
  )
}
