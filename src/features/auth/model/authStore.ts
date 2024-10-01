import { LoginFormType } from '@/pages/auth/sign-in'
import { makeAutoObservable, runInAction } from 'mobx'

import { authApi } from '../api/authApi'
import { ProfileType } from '../api/authApi.types'

class AuthStore {
  isLoading = false
  profile: ProfileType | undefined

  constructor() {
    makeAutoObservable(this)
  }

  async login(data: LoginFormType) {
    this.isLoading = true
    try {
      const accessToken = await authApi.login(data)

      localStorage.setItem('accessToken', accessToken)

      await this.me()
    } catch (e) {
      return Promise.reject(e)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
  async logout() {
    try {
      const c = await authApi.logout()

      localStorage.removeItem('accessToken')
    } catch (e) {
      console.log(e)
    }
  }

  async me() {
    try {
      const profile = await authApi.me()

      runInAction(() => {
        this.profile = profile
      })
    } catch (e) {
      console.log(e)
    }
  }

  async updateToken() {
    try {
      const newToken = await authApi.updateToken()

      localStorage.setItem('accessToken', newToken)
    } catch (e) {
      return Promise.reject('Unauthorized')
    }
  }
}

export default new AuthStore()
