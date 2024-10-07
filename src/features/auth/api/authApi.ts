// import { LoginForm } from '../ui/SignInForm'

import { LoginForm } from '@/features/auth'

import { Endpoints } from './auth.endpoints'
import { Profile } from './authApi.types'
import { instance } from './instanceApi'

class Auth {
  async login(data: LoginForm) {
    return instance
      .post(Endpoints.login, data)
      .then((res) => res.data.accessToken)
  }
  async logout() {
    return instance.post(Endpoints.logout)
  }
  async me(accessToken: string): Promise<Profile> {
    return instance.get(Endpoints.me, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }
  async updateToken() {
    return instance
      .post(Endpoints.updateToken)
      .then((res) => res.data.accessToken)
  }
}

export const authApi = new Auth()
