import { Nullable } from '@/common'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { PublicProfile, profileAPi } from '../settings'
import { ImagesData, ServerSideProfilePage } from './types'

export class HydrateProfileStore {
  postsData: ImagesData = {} as ImagesData
  userProfile: PublicProfile = {} as PublicProfile

  constructor(initialState: ServerSideProfilePage) {
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
        signal
      )

      runInAction(() => {
        this.postsData = {
          ...this.postsData,
          items: [...this.postsData.items, ...newPosts.data.items],
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  setNewData(data: any) {
    this.postsData = data.posts
    this.userProfile = data.userProfile
  }
}

export let hydrateProfileStore: Nullable<HydrateProfileStore> = null

export const initializeStore = (initialData: ServerSideProfilePage) => {
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
