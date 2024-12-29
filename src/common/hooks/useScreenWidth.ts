import { useEffect, useState } from 'react'

import { ScreenWidths } from '@/common/enums'

import { useDebounce } from './useDebounce'

export const useScreenWidth = (serverScreenSize?: number) => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : serverScreenSize || 0
  )
  const breakpoint: number = ScreenWidths.lg
  const smallBreakpoint = ScreenWidths.sm

  const debouncedWidth = useDebounce(width)

  const isTablet = debouncedWidth < breakpoint
  const isMobile = debouncedWidth < smallBreakpoint

  useEffect(() => {
    const onWindowResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  return { isMobile, isTablet }
}
