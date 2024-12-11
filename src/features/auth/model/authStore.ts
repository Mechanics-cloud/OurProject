import { clearAllData, responseErrorHandler } from '@/common'
import { StatusCode, StorageKeys } from '@/common/enums'
import { setToLocalStorage } from '@/common/utils/localStorage'
import { generalStore } from '@/core/store'
import { authApi } from '@/features/auth'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import { isAxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

class AuthStore {
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
      await clearAllData()
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === StatusCode.Unauthorized) {
          await clearAllData()
        }
      }
      responseErrorHandler(error)
    }
  }

  async me() {
    const user = await authApi.me()

    runInAction(() => {
      if (user) {
        generalStore.user = user
      }
    })

    return user
  }
}

export const authStore = new AuthStore()
