import { toast } from 'react-toastify'

import { LoginFormType } from '@/pages/auth/sign-in'
import { isAxiosError } from 'axios'
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
      const c = await authApi.logout()

      localStorage.removeItem('accessToken')
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.data?.messages) {
        toast.error(error.response.data.messages[0].message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  async me() {
    try {
      const profile = await authApi.me()

      runInAction(() => {
        this.profile = profile
      })
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.data?.messages) {
        toast.error(error.response.data.messages[0].message)
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  async updateToken() {
    try {
      const newToken = await authApi.updateToken()

      localStorage.setItem('accessToken', newToken)
    } catch (error: unknown) {
      toast.error('"Unauthorized"')
    }
  }
}

export default new AuthStore()
