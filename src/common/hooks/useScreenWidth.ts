import { useEffect, useState } from 'react'

import { ScreenWidths } from '@/common/enums'
import { useDebounce } from '@/common/hooks/useDebounce'

export const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint: number = ScreenWidths.lg
  const smallBreakpoint = ScreenWidths.sm

  const debouncedWidth = useDebounce(width)

  const isTablet = debouncedWidth < breakpoint
  const isMobile = debouncedWidth < smallBreakpoint

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return { isMobile, isTablet }
}
