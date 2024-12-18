import { CYRILLIC_PATTERN } from '@/common/constants'

const containsCyrillic = (text: string): boolean => {
  return CYRILLIC_PATTERN.test(text)
}

export const languageCharactersCalculation = (
  text: string,
  charactersCount: number
): number => {
  if (containsCyrillic(text)) {
    return charactersCount
  }

  return charactersCount * 1.1
}
