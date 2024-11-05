import { StatusCode, StorageKeys } from '@/common/enums'
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from '@/common/utils/localStorage'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { Profile, authApi, instance } from '@/features/auth'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import { InternalAxiosRequestConfig, isAxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

class AuthStore {
  profile: Profile | undefined = undefined

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

  async updateToken(params: InternalAxiosRequestConfig | undefined) {
    try {
      if (localStorage.getItem(StorageKeys.AccessToken)) {
        const newToken = await authApi.updateToken()

        setToLocalStorage(StorageKeys.AccessToken, newToken)

        if (params) {
          params.headers.Authorization = `Bearer ${newToken}`

          const repeatedRequest = await instance.request(params)

          return repeatedRequest
        }
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default new AuthStore()
