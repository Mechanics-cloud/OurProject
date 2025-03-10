import { instance } from '@/common/api'
import { Endpoints } from '@/features/auth/api/auth.endpoints'
import { Profile } from '@/features/auth/api/authApi.types'
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
  public async emailConfirmation(
    code: string,
    signal?: AbortSignal
  ): Promise<AxiosResponse> {
    return this.instance.post(
      Endpoints.EmailConfirmation,
      {
        confirmationCode: code,
      },
      { signal }
    )
  }

  public async emailResending(
    emailResendData: EmailResendRequestData
  ): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.EmailResending, emailResendData)
  }

  public async login(data: SignInFields) {
    return this.instance
      .post(Endpoints.login, data)
      .then((res) => res.data.accessToken)
  }

  public async logout() {
    return this.instance.post(Endpoints.logout)
  }

  public async me(): Promise<Profile | undefined> {
    return this.instance.get(Endpoints.me).then((res) => {
      if (res) {
        return res.data
      }

      return Promise.reject('Some error occurred')
    })
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
}

export const authApi = new AuthApi(instance)
