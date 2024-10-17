import { useEffect, useState } from 'react'

import { ScreenWidths } from '@/common/enums'

export const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint: number = ScreenWidths.lg
  const isTablet = width < breakpoint

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return { isTablet }
}
