import { Nullable } from '@/common'
import { Profile } from '@/features/auth'
import { makeAutoObservable } from 'mobx'

class GeneralStore {
  isLoading = false
  user: Nullable<Profile> = null

  constructor() {
    makeAutoObservable(this)
  }

  clearProfile() {
    this.user = null
  }

  turnOffLoading() {
    this.isLoading = false
  }

  turnOnLoading() {
    this.isLoading = true
  }
}

export const generalStore = new GeneralStore()
