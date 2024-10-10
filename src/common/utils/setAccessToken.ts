import { StorageKeys } from '@/common/enums'

export const setAccessToken = (accessToken?: string) => {
  accessToken
    ? localStorage.setItem(StorageKeys.AccessToken, accessToken)
    : localStorage.removeItem(StorageKeys.AccessToken)
}
