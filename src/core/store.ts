import { Profile } from '@/features/auth'
import { makeAutoObservable, runInAction } from 'mobx'

class GeneralStore {
  isLoading = false
  profile?: Profile

  constructor() {
    makeAutoObservable(this)
  }

  clearProfile() {
    runInAction(() => {
      this.profile = undefined
    })
  }

  turnOffLoading() {
    this.isLoading = false
  }

  turnOnLoading() {
    this.isLoading = true
  }
}

export const generalStore = new GeneralStore()
