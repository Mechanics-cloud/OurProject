import { StatusCode, StorageKeys } from '@/common/enums'
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from '@/common/utils/localStorage'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { Profile, authApi } from '@/features/auth'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import axios, { InternalAxiosRequestConfig, isAxiosError } from 'axios'
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
      const userInfo = await this.me()

      return { res, userInfo }
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
      this.profile = undefined
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

      return profile
    } catch (error) {
      if (
        isAxiosError(error) &&
        error?.response?.status === StatusCode.Unauthorized
      ) {
        return
      }
      throw { error }
    }
  }

  async updateToken(previousRequest: InternalAxiosRequestConfig | undefined) {
    try {
      if (localStorage.getItem(StorageKeys.AccessToken)) {
        const newToken = await authApi.updateToken()

        setToLocalStorage(StorageKeys.AccessToken, newToken)
        if (previousRequest) {
          previousRequest.headers.Authorization = `Bearer ${newToken}`

          return axios(previousRequest)
        }
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default new AuthStore()
