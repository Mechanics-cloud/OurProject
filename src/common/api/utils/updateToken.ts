import { setToLocalStorage } from '@/common'
import { instance } from '@/common/api'
import { CommonEndpoints } from '@/common/api/common.endpoints'
import { StorageKeys } from '@/common/enums'
import { InternalAxiosRequestConfig } from 'axios'

export const updateToken = async (params?: InternalAxiosRequestConfig) => {
  try {
    if (localStorage.getItem(StorageKeys.AccessToken)) {
      const newToken = await instance
        .post(CommonEndpoints.updateToken)
        .then((res) => res.data.accessToken)

      setToLocalStorage(StorageKeys.AccessToken, newToken)

      if (params) {
        params.headers.Authorization = `Bearer ${newToken}`

        return await instance.request(params)
      }
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
