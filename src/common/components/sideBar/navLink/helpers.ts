export const getBasePath = (path: string) => {
  const basePath = path.split('/').slice(0, 2)

  return basePath.join('/')
}
