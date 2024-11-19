import {
  PhotoResult,
  createFileForUpload,
  responseErrorHandler,
} from '@/common'
import { generalStore } from '@/core/store'
import {
  UpdatedProfile,
  UserInfo,
  UserProfile,
  profileAPi,
} from '@/features/profile/settings/generalInfo/api'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { makeAutoObservable, runInAction } from 'mobx'

class ProfileStore {
  userProfile?: UserProfile

  constructor() {
    makeAutoObservable(this)
  }

  async deleteAvatar() {
    try {
      await profileAPi.deleteAvatar()
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  async getProfile() {
    try {
      const userProfile = await profileAPi.getProfile()
      const formattedDate =
        userProfile.dateOfBirth &&
        format(userProfile.dateOfBirth, 'dd.MM.yyyy', { locale: ru })

      runInAction(() => {
        this.userProfile = { ...userProfile, dateOfBirth: formattedDate }
        generalStore.addUserAvatar(userProfile.avatars[0].url)
      })

      return userProfile
    } catch (error) {
      responseErrorHandler(error)
    }
  }
  async updateProfile(data: UserInfo) {
    try {
      const updatedData: UpdatedProfile = {
        aboutMe: data.aboutMe ?? '',
        city: data.city ?? '',
        country: data.country ?? '',
        dateOfBirth: data.dateOfBirth ?? '',
        firstName: data.firstName,
        lastName: data.lastName,
        region: '',
        userName: data.userName,
      }

      await profileAPi.updateProfile(updatedData)
    } catch (error) {
      responseErrorHandler(error)
    }
  }
  async uploadAvatar(photoData: PhotoResult) {
    try {
      if (photoData.photoFile) {
        const file = createFileForUpload(photoData)

        if (!file) {
          return
        }
        await profileAPi.uploadAvatar(file)
      }
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}

export const profileStore = new ProfileStore()
