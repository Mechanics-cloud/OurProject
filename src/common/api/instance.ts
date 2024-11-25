import { Paths } from '@/common'
import { updateToken } from '@/common/api/utils/updateToken'
import { StatusCode, StorageKeys } from '@/common/enums'
import { Environments } from '@/common/enviroments'
import axios, { AxiosResponse, isAxiosError } from 'axios'

import { CommonEndpoints } from './common.endpoints'

export const instance = axios.create({
  baseURL: Environments.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

//TODO фикс появления ошибки, на первом запросе при обновлении токена

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: unknown) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error)
    }

    if (error.response?.status !== StatusCode.Unauthorized) {
      return Promise.reject(error)
    }

    if (error.config?.url === CommonEndpoints.updateToken) {
      const { clearAllData } = await import('@/common/utils/clearAllData')

      await clearAllData(Paths.signIn)

      return Promise.reject(error)
    }

    try {
      return await updateToken(error.config)
    } catch (updateError) {
      return Promise.reject(updateError)
    }
  }
)

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(StorageKeys.AccessToken)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
