import { instance } from '@/features/auth'
import {
  UpdatedProfile,
  UserProfile,
} from '@/features/profile/settings/generalInfo/api'
import { ProfileEndpoints } from '@/features/profile/settings/generalInfo/api/profile.endpoints'
import { AxiosInstance, AxiosResponse } from 'axios'

class ProfileApi {
  constructor(private instance: AxiosInstance) {}
  public getProfile(): Promise<UserProfile> {
    return this.instance.get(ProfileEndpoints.profile).then((res) => res.data)
  }
  public updateProfile(profileData: UpdatedProfile): Promise<AxiosResponse> {
    return this.instance.put(ProfileEndpoints.profile, profileData)
  }
  public uploadAvatar(file: File): Promise<void> {
    const formData = new FormData()

    formData.append('file', file, file.name || 'avatar')

    return this.instance
      .post(ProfileEndpoints.uploadAvatar, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  }
}

export const profileAPi = new ProfileApi(instance)
