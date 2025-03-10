import { useEffect } from 'react'

import { NextRouter, useRouter } from 'next/router'

export const useScrollToRouteBack = () => {
  const router: NextRouter = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      localStorage.setItem('scrollPosition', window.scrollY.toString())
    }

    const handleRouteChangeComplete = () => {
      const savedPosition = localStorage.getItem('scrollPosition')

      if (savedPosition) {
        const targetPosition = parseInt(savedPosition, 10)

        const restoreScroll = () => {
          window.scrollTo({ behavior: 'auto', top: targetPosition })
          if (window.scrollY === targetPosition) {
            localStorage.removeItem('scrollPosition')
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

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])
}
