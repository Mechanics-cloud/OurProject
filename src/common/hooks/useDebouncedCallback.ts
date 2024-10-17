import { useCallback, useEffect, useRef } from 'react'

export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay = 1000
) => {
  const inDebounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (inDebounce.current) {
        clearTimeout(inDebounce.current)
      }
      inDebounce.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  useEffect(() => {
    return () => {
      if (inDebounce.current) {
        clearTimeout(inDebounce.current)
      }
    }
  }, [])

  return debouncedCallback
}
