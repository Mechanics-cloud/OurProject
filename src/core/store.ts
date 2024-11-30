import { Nullable } from '@/common'
import { Profile } from '@/features/auth'
import { makeAutoObservable } from 'mobx'

class GeneralStore {
  isLoading = false
  user: Nullable<Profile> = null
  userAvatar: Nullable<string> = null

  constructor() {
    makeAutoObservable(this)
  }

  addUserAvatar(src: string) {
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
