import { Nullable, responseErrorHandler } from '@/common'
import { makeAutoObservable, runInAction } from 'mobx'

import { publicProfileAPi } from '../api'
import { PublicProfile } from '../settings'
import { ImagesData, ProfileData } from './types'

export class HydrateProfileStore {
  isLoading: boolean = false
  isUpdatePost: boolean = false
  postsData: ImagesData
  stopRequest: boolean = false
  userProfile: PublicProfile

  constructor(initialState: ProfileData) {
    this.postsData = initialState.postsData || {}
    this.userProfile = initialState.userProfile || {}
    makeAutoObservable(this)
  }
  changeLoading(status: boolean) {
    this.isLoading = status
  }
  changeUpdatePost(status: boolean) {
    this.isUpdatePost = status
  }
  async getUserPhoto(signal?: AbortSignal, pageSize: number = 9) {
    const lastElement = this.postsData.items[this.postsData.items.length - 1]
    const endCursorPostId = lastElement?.id
    const ownerId = this.userProfile.id

    try {
      if (this.isLoading || this.stopRequest) {
        return
      }
      this.changeLoading(true)
      const newPosts = await publicProfileAPi.getPublicPosts(
        ownerId,
        endCursorPostId,
        signal,
        pageSize
      )

      runInAction(() => {
        this.postsData = {
          ...this.postsData,
          items: [...this.postsData.items, ...newPosts.items],
        }
        if (newPosts.items.length < 8) {
          this.stopRequest = true
        }

        return newPosts.items
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      this.changeLoading(false)
    }
  }

  setNewData(data: ProfileData) {
    this.isLoading = false
    this.stopRequest = false
    this.postsData = data.postsData
    this.userProfile = data.userProfile
  }

  async updatePhotosData() {
    this.isLoading = false
    this.stopRequest = false
    this.changeUpdatePost(true)
    try {
      const newPosts = await publicProfileAPi.getPublicPosts(
        this.userProfile.id
      )

      runInAction(() => {
        this.postsData = newPosts
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      this.changeUpdatePost(false)
    }
  }
}

export let hydrateProfileStore: Nullable<HydrateProfileStore> = null

export const initializeStore = (initialData: ProfileData) => {
  const serverStore =
    hydrateProfileStore ?? new HydrateProfileStore(initialData)

  if (typeof window === 'undefined') {
    return serverStore
  }

  if (!hydrateProfileStore) {
    hydrateProfileStore = serverStore
  }

  return hydrateProfileStore
}
