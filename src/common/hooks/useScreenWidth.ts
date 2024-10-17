import { useCallback, useEffect, useState } from 'react'

import { ScreenWidths } from '@/common/enums'
import { useDebouncedCallback } from '@/common/hooks/useDebouncedCallback'

export const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint: number = ScreenWidths.lg
  const isTablet = width < breakpoint

  const handleWindowResize = useCallback(() => {
    setWidth(window.innerWidth)
  }, [])

  const debouncedHandleWindowResize = useDebouncedCallback(handleWindowResize)

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleWindowResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleWindowResize)
    }
  }, [debouncedHandleWindowResize])

  return { isTablet }
}
