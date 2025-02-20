import {
  Nullable,
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
} from '@/features/profile'
import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import { makeAutoObservable, runInAction } from 'mobx'

export class ProfileStore {
  isLoading: boolean = false
  isProfileLoading: boolean = true
  userProfile: Nullable<UserProfile> = null

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  cleanUp() {
    this.userProfile = null
  }

  async deleteAvatar() {
    try {
      await profileAPi.deleteAvatar()
      runInAction(() => {
        if (this.userProfile) {
          this.userProfile.avatars = []
        }
      })
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
        generalStore.addUserAvatar(userProfile.avatars[0]?.url ?? null)
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isProfileLoading = false
      })
    }
  }

  async updateProfile(data: UserInfo) {
    const date =
      data.dateOfBirth &&
      parse(data.dateOfBirth, 'dd.MM.yyyy', new Date(), {
        locale: ru,
      }).toISOString()

    try {
      const updatedData: UpdatedProfile = {
        aboutMe: data.aboutMe ?? '',
        city: data.city ?? '',
        country: data.country ?? '',
        dateOfBirth: date ?? '',
        firstName: data.firstName,
        lastName: data.lastName,
        region: '',
        userName: data.userName,
      }

      await profileAPi.updateProfile(updatedData)
      runInAction(() => {
        if (this.userProfile) {
          this.userProfile = {
            ...this.userProfile,
            ...updatedData,
          }
        }
      })
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

        runInAction(() => {
          if (this.userProfile && photoData.photoUrl) {
            this.userProfile.avatars = [
              { ...this.userProfile.avatars[0], url: photoData.photoUrl },
            ]
          }
        })
      }
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}

export const profileStore = new ProfileStore()
