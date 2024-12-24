export const calculateCharactersToShow = (
  fullText: number | string,
  userName: string
) => {
  const textLength = typeof fullText === 'string' ? fullText.length : fullText

  return textLength - userName.length
}
