type Key = 'accessToken' | 'accountType'

export const setToLocalStorage = (key: Key, value: string) => {
  localStorage.setItem(key, value)
}

export const removeFromLocalStorage = (key: Key) => {
  localStorage.removeItem(key)
}

export const getFromLocalStorage = (key: Key) => {
  return localStorage.getItem(key)
}
