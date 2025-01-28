import { Nullable, setToLocalStorage } from '@/common'
import { instance } from '@/common/api'
import { CommonEndpoints } from '@/common/api/common.endpoints'
import { StorageKeys } from '@/common/enums'
import { InternalAxiosRequestConfig } from 'axios'

let isRefreshing = false

let refreshPromise: Nullable<Promise<string>> = null

export const updateToken = async (params?: InternalAxiosRequestConfig) => {
  try {
    if (isRefreshing && refreshPromise) {
      const newToken = await refreshPromise

      if (params) {
        params.headers.Authorization = `Bearer ${newToken}`

        return instance.request(params)
      }

      return
    }

    isRefreshing = true
    refreshPromise = instance.post(CommonEndpoints.updateToken).then((res) => {
      const newToken = res.data.accessToken

      setToLocalStorage(StorageKeys.AccessToken, newToken)

      return newToken
    })

    const newToken = await refreshPromise

    if (params) {
      params.headers.Authorization = `Bearer ${newToken}`

      return instance.request(params)
    }
  } catch (error) {
    return Promise.reject(error)
  } finally {
    isRefreshing = false
    refreshPromise = null
  }
}
