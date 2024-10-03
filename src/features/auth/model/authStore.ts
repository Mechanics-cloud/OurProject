import { StorageKeys } from '@/common/enums'
import { handleServerError } from '@/common/utils/handleServerError'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

import { authApi } from '../api/authApi'
import { Profile } from '../api/authApi.types'
import { LoginForm } from '../ui/SignInForm'

class AuthStore {
  isLoading = false
  profile: Profile | undefined

  constructor() {
    makeAutoObservable(this)
  }

  async login(data: LoginForm) {
    this.isLoading = true
    try {
      const accessToken = await authApi.login(data)

      localStorage.setItem(StorageKeys.AccessToken, accessToken)

      await this.me()
    } catch (error) {
      return Promise.reject(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
  async logout() {
    try {
      await authApi.logout()

      localStorage.removeItem(StorageKeys.AccessToken)
    } catch (error) {
      handleServerError(error)
    }
  }

  async me() {
    try {
      const profile = await authApi.me()

      runInAction(() => {
        this.profile = profile
      })
    } catch (error) {
      handleServerError(error)
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
      handleServerError(error)
    }
  }
}

export default new AuthStore()
