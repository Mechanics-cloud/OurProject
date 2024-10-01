import { LoginFormType } from '@/pages/auth/sign-in'

import { ProfileType } from './authApi.types'
import { instance } from './instanceApi'

class Auth {
  async login(data: LoginFormType) {
    return instance.post('auth/login', data).then((res) => res.data.accessToken)
  }
  async logout() {
    return instance.post('auth/logout')
  }
  async me(): Promise<ProfileType> {
    return instance.get('auth/me').then((res) => res.data)
  }
  async updateToken() {
    return instance
      .post('auth/update-tokens')
      .then((res) => res.data.accessToken)
  }
}

export const authApi = new Auth()
