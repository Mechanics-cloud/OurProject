import { Nullable } from '@/common'
import { Post } from '@/features/posts'
import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export class PostStore {
  hydrate = (data?: Post) => {
    this.post = data || null
  }
  isLoading: boolean

  post: Nullable<Post>

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
