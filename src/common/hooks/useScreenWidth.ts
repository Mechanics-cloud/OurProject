import { useEffect, useState } from 'react'

import { ScreenWidths } from '@/common/enums'
import { useDebounce } from '@/common/hooks/useDebounce'

export const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint: number = ScreenWidths.lg

  const debouncedWidth = useDebounce(width)
  const handleWindowResize = () => setWidth(window.innerWidth)

  const isTablet = debouncedWidth < breakpoint

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return { isTablet }
}
