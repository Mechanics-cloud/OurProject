import { BasicPost, Nullable } from '@/common'
import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export class PostStore {
  hydrate = (data?: BasicPost) => {
    this.post = data || null
  }
  isLoading: boolean

  post: Nullable<BasicPost>

  constructor() {
    this.isLoading = true
    this.post = null

    makeObservable(this, {
      hydrate: action,
      isLoading: observable,
      post: observable,
    })
  }
}
