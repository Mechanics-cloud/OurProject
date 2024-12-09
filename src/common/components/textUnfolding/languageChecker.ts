import { cyrillicPattern } from '@/common/constants'

const containsCyrillic = (text: string): boolean => {
  return cyrillicPattern.test(text)
}

export const charactersCalculation = (
  text: string,
  charactersCount: number
): number => {
  if (containsCyrillic(text)) {
    return charactersCount
  }

  return charactersCount * 1.15
}
