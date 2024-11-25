import { createFileForUpload, responseErrorHandler } from '@/common'
import {
  PhotoResult,
  UpdatedProfile,
  UserInfo,
  UserProfile,
  profileAPi,
} from '@/features/profile'
import { Photo } from '@/features/profile/model/types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { makeAutoObservable, runInAction } from 'mobx'

class ProfileStore {
  isLoading: boolean = false
  pageNumber: number = 1
  photos: Photo[] = []
  stopRequest: boolean = false
  userProfile?: UserProfile

  constructor() {
    makeAutoObservable(this)
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

  async getPhotoUser({
    pageSize,
    signal,
  }: { pageSize?: number; signal?: AbortSignal } = {}) {
    try {
      if (this.isLoading || this.stopRequest) {
        return
      }
      this.isLoading = true

      if (this.userProfile) {
        const res = await profileAPi.getProfilePosts(
          this.pageNumber,
          this.userProfile?.userName,
          signal,
          pageSize
        )

        let newPhotos: Photo[] = []

        if (res.items.length !== 0) {
          newPhotos = res.items.map((item) => ({
            id: item.id,
            images: item.images,
          }))
        } else {
          this.stopRequest = true
        }

        runInAction(() => {
          this.photos.push(...newPhotos)
          this.pageNumber += 1
          this.isLoading = false
        })
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        return
      } else {
        responseErrorHandler(error)
      }
    } finally {
      this.isLoading = false
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
      })

      return userProfile
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
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
      if (photoData.photoForServer) {
        const file = createFileForUpload(photoData)

        if (!file) {
          return
        }
        await profileAPi.uploadAvatar(file)

        runInAction(() => {
          if (this.userProfile && photoData.photo) {
            this.userProfile.avatars = [
              { ...this.userProfile.avatars[0], url: photoData.photo },
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
