import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timerId)
  }, [value, delay])

  return debouncedValue
}
