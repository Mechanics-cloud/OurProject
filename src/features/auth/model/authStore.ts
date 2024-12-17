import { clearAllData, responseErrorHandler } from '@/common'
import { StatusCode, StorageKeys } from '@/common/enums'
import { setToLocalStorage } from '@/common/utils/localStorage'
import { generalStore } from '@/core/store'
import { authApi } from '@/features/auth'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import { isAxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

class AuthStore {
  isAuthenticated: 'error' | 'no' | 'pending' | 'yes' = 'pending'
  constructor() {
    makeAutoObservable(this)
  }

  async authWithGoogle(code: string) {
    try {
      runInAction(() => {
        this.isAuthenticated = 'pending'
      })
      const res = await authApi.authWithGoogle(code)

      setToLocalStorage(StorageKeys.AccessToken, res.data.accessToken)
      const userInfo = await this.me()

      return { res, userInfo }
    } catch (error) {
      responseErrorHandler(error)
      runInAction(() => {
        this.isAuthenticated = 'error'
      })
    }
  }

  async login(data: SignInFields) {
    try {
      runInAction(() => {
        this.isAuthenticated = 'pending'
      })
      const accessToken = await authApi.login(data)

      setToLocalStorage(StorageKeys.AccessToken, accessToken)

      await this.me()
    } catch (error) {
      responseErrorHandler(error)
      runInAction(() => {
        this.isAuthenticated = 'error'
      })

      return Promise.reject(error)
    }
  }

  async logout() {
    try {
      runInAction(() => {
        this.isAuthenticated = 'pending'
      })
      await authApi.logout()
      await clearAllData()
      runInAction(() => {
        this.isAuthenticated = 'no'
      })
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === StatusCode.Unauthorized) {
          await clearAllData()
        }
      }
      responseErrorHandler(error)
      runInAction(() => {
        this.isAuthenticated = 'error'
      })
    }
  }

  async me() {
    if (this.isAuthenticated === 'yes' || this.isAuthenticated === 'no') {
      return
    }
    try {
      runInAction(() => {
        this.isAuthenticated = 'pending'
      })
      const user = await authApi.me()

      runInAction(() => {
        if (user) {
          generalStore.user = user
          this.isAuthenticated = 'yes'
        }
      })

      return user
    } catch (error) {
      runInAction(() => {
        this.isAuthenticated = 'error'
      })
      // console.log(error)
    }
  }
}

export const authStore = new AuthStore()
