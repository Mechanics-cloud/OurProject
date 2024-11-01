import { Profile } from '@/features/auth'
import { makeAutoObservable } from 'mobx'

class GeneralStore {
  isLoading = false
  user?: Profile

  constructor() {
    makeAutoObservable(this)
  }

  clearProfile() {
    this.user = undefined
  }

  turnOffLoading() {
    this.isLoading = false
  }

  turnOnLoading() {
    this.isLoading = true
  }
}

export const generalStore = new GeneralStore()
