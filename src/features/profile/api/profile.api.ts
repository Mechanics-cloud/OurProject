import { Endpoints, instance } from '@/features/auth'
import { UpdatedProfile } from '@/features/profile/model/useFillGeneralForm'
import { AxiosInstance, AxiosResponse } from 'axios'

class ProfileApi {
  constructor(private instance: AxiosInstance) {}
  public async getProfile(): Promise<UpdatedProfile> {
    return this.instance.get(Endpoints.profile).then((res) => res.data)
  }
  public async updateProfile(
    profileData: UpdatedProfile
  ): Promise<AxiosResponse> {
    return this.instance.put(Endpoints.profile, profileData)
  }
}

export const profileAPi = new ProfileApi(instance)
