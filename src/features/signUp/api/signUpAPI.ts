import { instance } from '@/features/signUp/api/instances'
import { SignUpRequestData } from '@/features/signUp/model/types'
import { AxiosInstance, AxiosResponse } from 'axios'

class SignUpApi {
  constructor(private instance: AxiosInstance) {}
  public async signUp<SignUpResponseType>(
    registrationData: SignUpRequestData
  ): Promise<AxiosResponse> {
    return this.instance.post('/v1/auth/registration', registrationData)
  }
}

export const signUpApi = new SignUpApi(instance)
