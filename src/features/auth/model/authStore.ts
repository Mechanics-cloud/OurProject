import { StorageKeys } from '@/common/enums'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { authApi } from '@/features/auth/api/authApi'
// import { authApi } from '@/features/auth'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

import { Profile } from '../api/authApi.types'

class AuthStore {
  profile: Profile | undefined

  constructor() {
    makeAutoObservable(this)
  }

  async login(data: SignInFields) {
    try {
      const accessToken = await authApi.login(data)

      localStorage.setItem(StorageKeys.AccessToken, accessToken)

      await this.me(accessToken)
    } catch (error) {
      responseErrorHandler(error)

      return Promise.reject(error)
    }
  }
  async logout() {
    try {
      await authApi.logout()

      localStorage.removeItem(StorageKeys.AccessToken)
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  async me(accessToken: string) {
    try {
      const profile = await authApi.me(accessToken)

      runInAction(() => {
        this.profile = profile
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  async updateToken(previousRequest: InternalAxiosRequestConfig | undefined) {
    try {
      const newToken = await authApi.updateToken()

      localStorage.setItem(StorageKeys.AccessToken, newToken)
      if (previousRequest) {
        previousRequest.headers.Authorization = `Bearer ${newToken}`

        return axios(previousRequest)
      }
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}

export default new AuthStore()
