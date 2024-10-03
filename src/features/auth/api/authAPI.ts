import { Endpoints } from '@/features/auth/api/auth.endpoints'
import { instance } from '@/features/auth/api/instances'
import {
  EmailConfirmationRequestData,
  EmailResendRequestData,
  SignUpRequestData,
} from '@/features/auth/model/types'
import { AxiosInstance, AxiosResponse } from 'axios'

class AuthAPI {
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
  public async signUp(
    registrationData: SignUpRequestData
  ): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.SignUp, registrationData)
  }
}

export const authApi = new AuthAPI(instance)
