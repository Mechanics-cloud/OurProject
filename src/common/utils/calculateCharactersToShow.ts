import {
  CYRILLIC_LENGTH,
  LATIN_LENGTH,
} from '@/features/newsFeed/model/constants'

export const calculateCharactersToShow = (
  description: string,
  userName: string
) => {
  const cyrillicRegex = /[а-яА-Я]/
  const baseLength = cyrillicRegex.test(description)
    ? CYRILLIC_LENGTH
    : LATIN_LENGTH

  return baseLength - userName.length
}
