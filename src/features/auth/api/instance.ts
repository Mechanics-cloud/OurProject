import { StatusCode, StorageKeys } from '@/common/enums'
import { Environments } from '@/common/enviroments'
import { Endpoints, authStore } from '@/features/auth'
import axios, { AxiosResponse, isAxiosError } from 'axios'

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
    if (isAxiosError(error)) {
      if (error.response?.status === StatusCode.Unauthorized) {
        if (error.config?.url === Endpoints.updateToken) {
          return Promise.reject(error)
        } else {
          try {
            return await authStore.updateToken(error.config)
          } catch (updateError) {
            return Promise.reject(updateError)
          }
        }
      }
    }

    return Promise.reject(error)
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
