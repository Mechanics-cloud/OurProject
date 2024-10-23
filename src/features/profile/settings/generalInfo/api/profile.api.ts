import { Endpoints, instance } from '@/features/auth'
import { PhotoResult } from '@/features/profile/settings/avatarDialog/model'
import { FormData as FormDataType } from '@/features/profile/settings/generalInfo/model/useFillGeneralForm'
import { AxiosInstance, AxiosResponse } from 'axios'

export type UpdatedProfile = {
  photoData?: PhotoResult | undefined
  region: string
} & Omit<Required<FormDataType>, 'photoData'>

export type UserProfile = {
  avatars: Avatar[]
  createdAt: string
  id: number
} & UpdatedProfile

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

class ProfileApi {
  constructor(private instance: AxiosInstance) {}
  public async getProfile(): Promise<UserProfile> {
    return this.instance.get(Endpoints.profile).then((res) => res.data)
  }
  public async updateProfile(
    profileData: UpdatedProfile
  ): Promise<AxiosResponse> {
    return this.instance.put(Endpoints.profile, profileData)
  }
  public async uploadAvatar(file: File): Promise<any> {
    const formData = new FormData()

    formData.append('file', file, file.name || 'avatar.jpg')

    return this.instance
      .post(Endpoints.uploadAvatar, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  }
}

export const profileAPi = new ProfileApi(instance)
