export const calculateCharactersToShow = (
  description: string,
  userName: string
) => {
  return description.length - userName.length
}
