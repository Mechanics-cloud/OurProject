import { StatusCode, StorageKeys } from '@/common/enums'
import { Environments } from '@/common/enviroments'
import { Paths } from '@/common/paths'
import { Endpoints } from '@/features/auth'
import axios, { isAxiosError } from 'axios'
import Router from 'next/router'

import authStore from '../model/authStore'

export const instance = axios.create({
  baseURL: Environments.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

//TODO фикс появления ошибки, на первом запросе при обновлении токена

instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === StatusCode.Unauthorized) {
        if (error.config?.url === Endpoints.updateToken) {
          await Router.push(Paths.signIn)

          return Promise.reject(error)
        } else {
          await authStore.updateToken(error.config)
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
