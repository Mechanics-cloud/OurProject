import { LoginForm } from '../ui/SignInForm'
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
  async me(): Promise<Profile> {
    return instance.get(Endpoints.me).then((res) => res.data)
  }
  async updateToken() {
    return instance
      .post(Endpoints.updateToken)
      .then((res) => res.data.accessToken)
  }
}

export const authApi = new Auth()
