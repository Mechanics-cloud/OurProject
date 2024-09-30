import {
  Endpoints,
  RecoveryPasswordData,
  SignUpRequestData,
  instance,
} from '@/features/auth'
import { AxiosInstance, AxiosResponse } from 'axios'

class AuthApi {
  constructor(private instance: AxiosInstance) {}
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
