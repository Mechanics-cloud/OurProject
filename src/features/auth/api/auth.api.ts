import { Endpoints } from '@/features/auth/api/auth.endpoints'
import { Profile } from '@/features/auth/api/authApi.types'
import { instance } from '@/features/auth/api/instances'
import {
  EmailConfirmationRequestData,
  EmailResendRequestData,
  RecoveryPasswordData,
  SignUpRequestData,
} from '@/features/auth/model/types'
// import { LoginForm } from '@/features/auth/ui/SignInForm'
import { AxiosInstance, AxiosResponse } from 'axios'

export type LoginForm = {
  email: string
  password: string
}

class AuthApi {
  constructor(private instance: AxiosInstance) {}
  public async authWithGoogle(code: string): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.AuthWithGoogle, { code })
  }
  public async emailConfirmation(
    emailConfirmation: EmailConfirmationRequestData
  ): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.EmailResending, emailConfirmation)
  }
  public async emailResending(
    emailResendData: EmailResendRequestData
  ): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.EmailResending, emailResendData)
  }
  public async me(accessToken: string): Promise<Profile> {
    return instance.get(Endpoints.me, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
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
