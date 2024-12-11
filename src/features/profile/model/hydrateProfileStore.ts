import { Nullable, responseErrorHandler } from '@/common'
import { makeAutoObservable, runInAction } from 'mobx'

import { PublicProfile, profileAPi } from '../settings'
import { ImagesData, SSRProfileProps } from './types'

export class HydrateProfileStore {
  postsData: ImagesData
  userProfile: PublicProfile

  constructor(initialState: SSRProfileProps) {
    this.postsData = initialState.posts || {}
    this.userProfile = initialState.userProfile || {}
    makeAutoObservable(this)
  }

  async getUserPhoto(signal?: AbortSignal) {
    const lastElement = this.postsData.items[this.postsData.items.length - 1]
    const endCursorPostId = lastElement.id
    const ownerId = lastElement.ownerId

    try {
      const newPosts = await profileAPi.getPublicPosts(
        ownerId,
        endCursorPostId,
        signal,
        9
      )

      runInAction(() => {
        this.postsData = {
          ...this.postsData,
          items: [...this.postsData.items, ...newPosts.data.items],
        }
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  setNewData(data: SSRProfileProps) {
    this.postsData = data.posts
    this.userProfile = data.userProfile
  }
}

export let hydrateProfileStore: Nullable<HydrateProfileStore> = null

export const initializeStore = (initialData: SSRProfileProps) => {
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
