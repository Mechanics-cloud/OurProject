import { Endpoints } from '@/features/auth/api/auth.endpoints'
import { instance } from '@/features/auth/api/instances'
import {
  EmailConfirmationRequestData,
  EmailResendRequestData,
  RecoveryPasswordData,
  SignUpRequestData,
} from '@/features/auth/model/types'
import { AxiosInstance, AxiosResponse } from 'axios'

class AuthApi {
  constructor(private instance: AxiosInstance) {}
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
