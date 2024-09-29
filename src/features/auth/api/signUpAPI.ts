import { instance } from '@/features/auth/api/instances'
import { SignUpRequestData } from '@/features/auth/model/types'
import { AxiosInstance, AxiosResponse } from 'axios'

class SignUpApi {
  constructor(private instance: AxiosInstance) {}
  public async signUp(
    registrationData: SignUpRequestData
  ): Promise<AxiosResponse> {
    return this.instance.post('/v1/auth/registration', registrationData)
  }
}

export const signUpApi = new SignUpApi(instance)
