type Key = 'accessToken'

export const setToLocalStorage = (key: Key, value: string) => {
  localStorage.setItem(key, value)
}

export const removeFromLocalStorage = (key: Key) => {
  localStorage.removeItem(key)
}
