import { ImageUrl, Nullable } from '@/common'
import { Profile } from '@/features/auth'
import { makeAutoObservable } from 'mobx'

class GeneralStore {
  isLoading = true
  user: Nullable<Profile> = null
  userAvatar: Nullable<ImageUrl> = null

  constructor() {
    makeAutoObservable(this)
  }

  addUserAvatar(src: Nullable<ImageUrl>) {
    this.userAvatar = src
  }

  clearProfile() {
    this.user = null
    this.userAvatar = null
  }

  turnOffLoading() {
    this.isLoading = false
  }

  turnOnLoading() {
    this.isLoading = true
  }
}

export const generalStore = new GeneralStore()
