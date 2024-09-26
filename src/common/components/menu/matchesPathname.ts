export const matchesPathname = (asPath: string, pathname: string) => {
  if (asPath === pathname) {
    return true
  }
  const baseAsPath = removeTrailingSlash(asPath.split('?')[0] as string)
  const basePathname = removeTrailingSlash(pathname.split('?')[0] as string)

  if (baseAsPath === basePathname) {
    return true
  }
  const basePathRegex = new RegExp(
    `^${basePathname.replace(/(\[[a-zA-Z0-9-]+])+/g, '[a-zA-Z0-9-]+')}$`
      .replace(/\[\[\.\.\.[a-zA-Z0-9-]+]]/g, '?.*')
      .replace(/\[\.\.\.[a-zA-Z0-9-]+]/g, '.*')
  )

  return basePathRegex.test(baseAsPath)
}

const removeTrailingSlash = (val: string) =>
  val.endsWith('/') ? val.substring(0, val.length - 1) : val
