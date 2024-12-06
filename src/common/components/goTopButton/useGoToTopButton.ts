import { useEffect } from 'react'

import { useTranslation } from '@/common'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { Variants, useAnimationControls, useScroll } from 'framer-motion'

const scrollToTopVariants: Variants = {
  hide: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
}

export const useGoToTopButton = () => {
  const { t } = useTranslation()
  const { isTablet } = useScreenWidth()
  const controls = useAnimationControls()
  const { scrollYProgress } = useScroll()

  const isBrowser = typeof window !== 'undefined'

  useEffect(() => {
    const scrollableHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    if (scrollableHeight > 0) {
      scrollYProgress.on('change', (latestValue) => {
        if (latestValue > 0.5) {
          controls.start('show')
        } else {
          controls.start('hide')
        }
      })
    } else {
      controls.start('hide')
    }

    return () => {
      scrollYProgress.destroy()
    }
  }, [scrollYProgress, controls])

  function scrollToTopHandler() {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  return {
    controls,
    isBrowser,
    isTablet,
    scrollToTopHandler,
    scrollToTopVariants,
    t,
  }
}
