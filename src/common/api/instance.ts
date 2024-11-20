import { Paths, setToLocalStorage } from '@/common'
import { StatusCode, StorageKeys } from '@/common/enums'
import { Environments } from '@/common/enviroments'
import { clearAllData } from '@/common/utils/clearAllData'
import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios'

import { EndpointsToken } from './instance.endpoints'

export const instance = axios.create({
  baseURL: Environments.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const updateToken = async (params: InternalAxiosRequestConfig | undefined) => {
  try {
    if (localStorage.getItem(StorageKeys.AccessToken)) {
      const newToken = await instance
        .post(EndpointsToken.updateToken)
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

//TODO фикс появления ошибки, на первом запросе при обновлении токена

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: unknown) => {
    if (isAxiosError(error)) {
      if (error.response?.status === StatusCode.Unauthorized) {
        if (error.config?.url === EndpointsToken.updateToken) {
          await clearAllData(Paths.signIn)

          return Promise.reject(error)
        } else {
          try {
            return await updateToken(error.config)
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
