import { StorageKeys } from '@/common/enums'
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from '@/common/utils/localStorage'
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

  async authWithGoogle(code: string) {
    try {
      const res = await authApi.authWithGoogle(code)

      setToLocalStorage(StorageKeys.AccessToken, res.data.accessToken)
      await this.me()

      return res
    } catch (error) {
      responseErrorHandler(error)
    }
  }
  async login(data: SignInFields) {
    try {
      const accessToken = await authApi.login(data)

      setToLocalStorage(StorageKeys.AccessToken, accessToken)

      await this.me()
    } catch (error) {
      responseErrorHandler(error)

      return Promise.reject(error)
    }
  }

  async logout() {
    try {
      await authApi.logout()

      removeFromLocalStorage(StorageKeys.AccessToken)
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
      responseErrorHandler(error)
    }
  }

  async updateToken(previousRequest: InternalAxiosRequestConfig | undefined) {
    try {
      const newToken = await authApi.updateToken()

      setToLocalStorage(StorageKeys.AccessToken, newToken)
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
