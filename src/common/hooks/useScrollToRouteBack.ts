import { useEffect } from 'react'

import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from '@/common'
import { StorageKeys } from '@/common/enums'
import { NextRouter, useRouter } from 'next/router'

export const useScrollToRouteBack = () => {
  const router: NextRouter = useRouter()

  useEffect(() => {
    const onRouteChangeStart = () => {
      setToLocalStorage(StorageKeys.ScrollPosition, window.scrollY.toString())
    }

    const onRouteChangeComplete = () => {
      const savedPosition = getFromLocalStorage(StorageKeys.ScrollPosition)

      if (savedPosition) {
        const targetPosition = parseInt(savedPosition, 10)

        const restoreScroll = () => {
          window.scrollTo({ behavior: 'auto', top: targetPosition })
          if (window.scrollY === targetPosition) {
            removeFromLocalStorage(StorageKeys.ScrollPosition)
          }
        }

        if (document.body.scrollHeight > targetPosition) {
          restoreScroll()
        } else {
          const observer = new MutationObserver(() => {
            if (document.body.scrollHeight >= targetPosition) {
              restoreScroll()
              observer.disconnect()
            }
          })

          observer.observe(document.body, { childList: true, subtree: true })

          return () => observer.disconnect()
        }
      }
    }

    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])
}
