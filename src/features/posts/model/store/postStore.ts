import { toast } from 'react-toastify'

import {
  BasicPost,
  Nullable,
  PathService,
  PublicPaths,
  responseErrorHandler,
} from '@/common'
import { translationForStore } from '@/common/utils/setTranslation'
import { postsApi } from '@/features/posts'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import router from 'next/router'

enableStaticRendering(typeof window === 'undefined')

export class PostStore {
  hydrate = (data?: BasicPost) => {
    this.post = data || null
  }
  isDeleting: boolean
  isEditing: boolean
  isLoading: boolean

  post: Nullable<BasicPost>

  constructor() {
    this.isLoading = true
    this.post = null
    this.isEditing = false
    this.isDeleting = false

    makeObservable(this, {
      deletePost: action,
      editPostDescription: action,
      hydrate: action,
      isDeleting: observable,
      isEditing: observable,
      isLoading: observable,
      post: observable,
      startDeleting: action,
      startEditing: action,
      stopDeleting: action,
      stopEditing: action,
    })

    this.startEditing = this.startEditing.bind(this)
    this.stopEditing = this.stopEditing.bind(this)
    this.stopDeleting = this.stopDeleting.bind(this)
    this.startDeleting = this.startDeleting.bind(this)
  }

  async deletePost(postId: number, userId: number) {
    try {
      await postsApi.deletePost(postId)
      await router.push(
        PathService.generatePath(PublicPaths.userProfile, {
          userId,
        })
      )

      runInAction(() => {
        this.post = null
        this.stopDeleting()
      })

      //todo: отфильтровать удаленный пост из стора
      toast.success(translationForStore.t.post.successMessage)
    } catch (error) {
      responseErrorHandler(error)
      throw error
    }
  }

  async editPostDescription(description: string) {
    try {
      if (!this.post) {
        return
      }
      await postsApi.updatePostDescription({
        description,
        postId: this.post?.id,
      })
      runInAction(() => {
        if (this.post) {
          this.post = { ...this.post, description }
        }
        this.stopEditing()
      })
    } catch (error) {
      responseErrorHandler(error)
      throw error
    }
  }

  startDeleting() {
    this.isDeleting = true
  }

  startEditing() {
    this.isEditing = true
  }

  stopDeleting() {
    this.isDeleting = false
  }

  stopEditing() {
    this.isEditing = false
  }
}
