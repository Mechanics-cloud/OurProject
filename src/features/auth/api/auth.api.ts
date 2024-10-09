import { Endpoints } from '@/features/auth/api/auth.endpoints'
import { Profile } from '@/features/auth/api/authApi.types'
import { instance } from '@/features/auth/api/instance'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import {
  EmailResendRequestData,
  RecoveryPasswordData,
  SignUpRequestData,
} from '@/features/auth/model/types'
import { AxiosInstance, AxiosResponse } from 'axios'

class AuthApi {
  constructor(private instance: AxiosInstance) {}
  public async emailConfirmation(
    emailConfirmationCode: string
  ): Promise<AxiosResponse> {
    return this.instance.post(
      Endpoints.EmailConfirmation,
      emailConfirmationCode
    )
  }

  public async emailResending(
    emailResendData: EmailResendRequestData
  ): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.EmailResending, emailResendData)
  }

  public async login(data: SignInFields) {
    return instance
      .post(Endpoints.login, data)
      .then((res) => res.data.accessToken)
  }

  public async logout() {
    return instance.post(Endpoints.logout)
  }

  public async me(): Promise<Profile> {
    return instance.get(Endpoints.me).then((res) => res.data)
  }

  public async recoverPassword(
    data: RecoveryPasswordData
  ): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.RecoveryPassword, data)
  }

  public async signUp(data: SignUpRequestData): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.SignUp, data)
  }

  public async updateToken() {
    return instance
      .post(Endpoints.updateToken)
      .then((res) => res.data.accessToken)
  }
}

export const authApi = new AuthApi(instance)
