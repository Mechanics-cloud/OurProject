import { RefObject, useEffect, useRef, useState } from 'react'

type ReturnType<T> = {
  ref: RefObject<T>
  visible: boolean
}

type IntersectionObserverCallback = {
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void
}

type IntersectionObserverInit = {
  root?: Document | Element | null
  rootMargin?: string
  threshold?: number | number[]
}

const defaultOptions = {
  threshold: 0.1,
}

export const useElementOnScreen = <T extends HTMLElement>(
  options: IntersectionObserverInit = defaultOptions
): ReturnType<T> => {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries

      setVisible(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(callback, options)
    const currentRef = ref.current

    currentRef && observer.observe(currentRef)

    return () => {
      currentRef && observer.unobserve(currentRef)
    }
  }, [ref, options])

  return {
    ref,
    visible,
  }
}
