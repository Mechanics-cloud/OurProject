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
  isEditing: boolean
  isLoading: boolean = false

  post: Nullable<BasicPost>

  constructor() {
    this.isLoading
    this.post = null
    this.isEditing = false

    makeObservable(this, {
      deletePost: action,
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

  async deletePost(postId: number, userId: number) {
    try {
      this.isLoading = true
      await postsApi.deletePost(postId)
      await router.push(
        PathService.generatePath(PublicPaths.userProfile, {
          userId,
        })
      )

      runInAction(() => {
        this.post = null
      })

      toast.success(translationForStore.t.post.successMessage)
    } catch (error) {
      responseErrorHandler(error)
      throw error
    } finally {
      this.isLoading = false
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

  startEditing() {
    this.isEditing = true
  }

  stopEditing() {
    this.isEditing = false
  }
}
