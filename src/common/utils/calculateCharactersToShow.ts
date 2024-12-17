export const calculateCharactersToShow = (
  fullText: number | string,
  userName: string
) => {
  const textLenght = typeof fullText === 'string' ? fullText.length : fullText

  return textLenght - userName.length
}
