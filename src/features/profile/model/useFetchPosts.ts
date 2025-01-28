import { RefObject, useEffect, useRef, useState } from 'react'

import { hydrateProfileStore } from '@/features/profile'

type ReturnType = {
  isLoading: boolean
  ref: RefObject<HTMLDivElement>
}

export const useFetchPosts = (
  inView?: boolean,
  stopRequest?: boolean
): ReturnType => {
  const ref = useRef<HTMLDivElement>(null)
  const [triggerLoading, setTriggerLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async (signal: AbortSignal) => {
      await hydrateProfileStore?.getUserPhoto(signal)
    }

    const triggerRerender = () => {
      if (!ref.current) {
        return 0
      }
      const windowHeight = document.documentElement.clientHeight
      const containerRect = ref.current.getBoundingClientRect()
      const spaceBelow = windowHeight - containerRect.bottom > 40

      if (spaceBelow && !stopRequest) {
        setTriggerLoading((prev) => !prev)
      }
    }

    const controller = new AbortController()

    const signal = controller.signal

    if (inView) {
      fetchPosts(signal).then(() => {
        triggerRerender()
      })
    }

    return () => {
      controller.abort()
    }
  }, [inView, triggerLoading, stopRequest])

  return {
    isLoading: triggerLoading,
    ref,
  }
}
