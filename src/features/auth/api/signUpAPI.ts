import { Endpoints } from '@/features/auth/api/auth.endpoints'
import { instance } from '@/features/auth/api/instances'
import { SignUpRequestData } from '@/features/auth/model/types'
import { AxiosInstance, AxiosResponse } from 'axios'

class SignUpApi {
  constructor(private instance: AxiosInstance) {}
  public async signUp(
    registrationData: SignUpRequestData
  ): Promise<AxiosResponse> {
    return this.instance.post(Endpoints.SignUp, registrationData)
  }
}

export const signUpApi = new SignUpApi(instance)
