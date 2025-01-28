import { BasicPost, Nullable } from '@/common'
import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export class PostStore {
  hydrate = (data?: BasicPost) => {
    this.post = data || null
  }
  isEditing: boolean
  isLoading: boolean

  post: Nullable<BasicPost>

  constructor() {
    this.isLoading = true
    this.post = null
    this.isEditing = false

    makeObservable(this, {
      editPostDescription: action,
      hydrate: action,
      isEditing: observable,
      isLoading: observable,
      post: observable,
      startEditing: action,
      stopEditing: action,
    })

    this.startEditing = this.startEditing.bind(this)
    this.stopEditing = this.stopEditing.bind(this)
  }

  editPostDescription(description: string) {
    alert(description)
    runInAction(() => {
      if (this.post) {
        this.post = { ...this.post, description }
      }
      this.stopEditing()
    })
  }
  startEditing() {
    this.isEditing = true
  }

  stopEditing() {
    this.isEditing = false
  }
}
