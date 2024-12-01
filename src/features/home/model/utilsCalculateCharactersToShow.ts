const CYRILLIC_LENGTH = 145
const LATIN_LENGTH = 175

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
