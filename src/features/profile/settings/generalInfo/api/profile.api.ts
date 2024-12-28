import { instance } from '@/common/api'
import { UpdatedProfile, UserProfile } from '@/features/profile'
import { ProfileEndpoints } from '@/features/profile/settings/generalInfo/api/profile.endpoints'
import { AxiosInstance, AxiosResponse } from 'axios'

class ProfileApi {
  constructor(private instance: AxiosInstance) {}
  public deleteAvatar(): Promise<AxiosResponse> {
    return this.instance.delete(ProfileEndpoints.avatar)
  }
  public async getProfile(): Promise<UserProfile> {
    const res = await this.instance.get(ProfileEndpoints.profile)

    return res.data
  }

  public updateProfile(profileData: UpdatedProfile): Promise<AxiosResponse> {
    return this.instance.put(ProfileEndpoints.profile, profileData)
  }

  public async uploadAvatar(file: File): Promise<void> {
    const formData = new FormData()

    formData.append('file', file, file.name || 'avatar')
    const res = await this.instance.post(ProfileEndpoints.avatar, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return res.data
  }
}

export const profileAPi = new ProfileApi(instance)
