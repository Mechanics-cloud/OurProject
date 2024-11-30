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
import { Photo } from '@/features/profile/model/types'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { makeAutoObservable, runInAction } from 'mobx'

class ProfileStore {
  isLoading: boolean = false
  pageNumber: number = 1
  photos: Photo[] = []
  stopRequest: boolean = false
  userProfile: Nullable<UserProfile> = null

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  changeLoading(value: boolean) {
    this.isLoading = value
  }

  cleanUp() {
    this.isLoading = false
    this.photos.length = 0
    this.pageNumber = 1
    this.stopRequest = false
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
        generalStore.addUserAvatar(userProfile.avatars[0].url)
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  async getUserPhoto({
    pageSize,
    signal,
  }: { pageSize?: number; signal?: AbortSignal } = {}) {
    try {
      if (this.isLoading || this.stopRequest) {
        return
      }
      this.changeLoading(true)

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
      }
      responseErrorHandler(error)
    } finally {
      this.changeLoading(false)
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
