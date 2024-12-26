import { ScreenWidths } from '../enums'

export const getDeviceScreenWidth = (userAgent: string) => {
  const isTablet = /Tablet|iPad/i.test(userAgent)
  const isMobile = !isTablet && /Mobile|Android|iP(ad|hone|od)/i.test(userAgent)
  const isDesktop = !isMobile && !isTablet

  if (isDesktop) {
    return ScreenWidths.lg
  }
  if (isMobile) {
    return ScreenWidths.sm
  }
  if (isTablet) {
    return ScreenWidths.md
  }
}
