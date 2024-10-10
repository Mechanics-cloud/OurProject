import { StorageKeys } from '@/common/enums'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { Profile, authApi } from '@/features/auth'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

class AuthStore {
  profile: Profile | undefined

  constructor() {
    makeAutoObservable(this)
  }

  async login(data: SignInFields) {
    try {
      const accessToken = await authApi.login(data)

      localStorage.setItem(StorageKeys.AccessToken, accessToken)

      await this.me()
    } catch (error) {
      responseErrorHandler(error)

      return Promise.reject(error)
    }
  }
  async logout() {
    try {
      await authApi.logout()
      this.profile = undefined
      localStorage.removeItem(StorageKeys.AccessToken)
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  async me() {
    try {
      const profile = await authApi.me()

      runInAction(() => {
        this.profile = profile
      })
    } catch (error) {
      throw Error
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
      return Promise.reject(error)
    }
  }
}

export default new AuthStore()
