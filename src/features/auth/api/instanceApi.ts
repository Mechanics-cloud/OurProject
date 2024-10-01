import axios, { isAxiosError } from 'axios'
import Router from 'next/router'

import authStore from '../model/authStore'

export const instance = axios.create({
  baseURL: 'https://inctagram.work/api/v1/',
  headers: {},
  withCredentials: true,
})

instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (error) => {
    if (isAxiosError(error)) {
      const originalRequest = error.config

      if (error.response?.status === 401) {
        if (error.config?.url === 'auth/update-tokens') {
          Router.push('/auth/sign-in')
        } else {
          authStore
            .updateToken()
            .then((res) => {
              if (originalRequest) {
                const accessToken = localStorage.getItem('accessToken')

                originalRequest.headers.Authorization = `Bearer ${accessToken}`

                return axios(originalRequest)
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    }

    return Promise.reject(error)
  }
)

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
