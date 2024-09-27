import axios, { isAxiosError } from 'axios'

import { LoginFormType } from '../signIn/SignIn'
export const instance = axios.create({
  baseURL: 'https://inctagram.work/api/v1/',
  headers: {},
  withCredentials: true,
  //header с авторизацией
})

class Auth {
  async login(data: LoginFormType) {
    return await instance.post('auth/login', data).then((res) => {
      return res.data.accessToken
    })
  }
  async me() {
    return await instance.get('auth/me')
  }
  async updateToken() {
    return await instance.post('auth/update-tokens').then((res) => {
      return res.data.accessToken
    })
  }
}
export const authApi = new Auth()

instance.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        authApi.updateToken()
      }
    }
  }
)

instance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('accessToken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
      debugger
    }

    return config
  },
  (error) => {
    return
  }
)
