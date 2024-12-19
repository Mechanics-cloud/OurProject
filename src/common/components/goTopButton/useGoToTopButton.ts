import { RefObject, useEffect, useState } from 'react'

import { Nullable, useTranslation } from '@/common'
import { Variants, useAnimationControls, useScroll } from 'framer-motion'

const scrollToTopVariants: Variants = {
  hide: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
}

export const useGoToTopButton = (
  scrollInElementRef: Nullable<RefObject<HTMLDivElement>> = null
) => {
  const { t } = useTranslation()
  const controls = useAnimationControls()
  const { scrollYProgress } = useScroll()

  const isBrowser = typeof window !== 'undefined'

  const [scrollHeight, setScrollHeight] = useState(
    scrollInElementRef?.current?.scrollHeight ?? 0
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (scrollInElementRef?.current) {
        setScrollHeight(scrollInElementRef.current.scrollHeight)
      }
    })

    if (scrollInElementRef?.current) {
      observer.observe(scrollInElementRef.current, {
        childList: true,
        subtree: true,
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [scrollInElementRef])

  useEffect(() => {
    const scrollableHeight = scrollInElementRef
      ? scrollHeight
      : document.documentElement.clientHeight
    const isShowButton =
      scrollableHeight - document.documentElement.clientHeight > 0

    if (isShowButton) {
      controls.start('show')
    } else {
      controls.start('hide')
    }

    return () => {
      scrollYProgress.destroy()
    }
  }, [controls, scrollHeight, scrollInElementRef, scrollYProgress])

  const onScrollToTop = () => {
    if (scrollInElementRef && scrollInElementRef.current) {
      scrollInElementRef.current.scrollTo({ behavior: 'smooth', top: 0 })

      return
    }
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  return {
    controls,
    isBrowser,
    onScrollToTop,
    scrollToTopVariants,
    t,
  }
}
