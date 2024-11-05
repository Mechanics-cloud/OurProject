import { Endpoints } from '@/features/auth/api/auth.endpoints'
import { Profile } from '@/features/auth/api/authApi.types'
import { instance } from '@/features/auth/api/instance'
import { SignInFields } from '@/features/auth/model/signIn/singInSchema'
import {
  EmailResendRequestData,
  NewPasswordData,
  RecoveryPasswordData,
  SignUpRequestData,
} from '@/features/auth/model/types'
import { AxiosInstance, AxiosResponse } from 'axios'

class AuthApi {
  constructor(private instance: AxiosInstance) {}
  public async authWithGoogle(code: string): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.AuthWithGoogle, { code })
  }
  public async emailConfirmation(code: string): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.EmailConfirmation, {
      confirmationCode: code,
    })
  }

  public async emailResending(
    emailResendData: EmailResendRequestData
  ): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.EmailResending, emailResendData)
  }

  public login(data: SignInFields) {
    return instance
      .post(Endpoints.login, data)
      .then((res) => res.data.accessToken)
  }

  public async logout() {
    return instance.post(Endpoints.logout)
  }

  public me(): Promise<Profile> {
    return instance.get(Endpoints.me).then((res) => res.data)
  }

  public async newPassword(data: NewPasswordData): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.NewPassword, data)
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
