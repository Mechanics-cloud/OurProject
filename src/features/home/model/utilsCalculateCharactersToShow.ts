export const calculateCharactersToShow = (
  description: string,
  userName: string
) => {
  const cyrillicRegex = /[а-яА-Я]/
  const baseLength = cyrillicRegex.test(description) ? 145 : 175

  return baseLength - userName.length
}
