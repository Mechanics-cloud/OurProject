import { makeAutoObservable } from 'mobx'

class GeneralStore {
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  turnOffLoading() {
    this.isLoading = false
  }

  turnOnLoading() {
    this.isLoading = true
  }
}

export const generalStore = new GeneralStore()
