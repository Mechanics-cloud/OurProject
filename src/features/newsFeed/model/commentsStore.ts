import { Nullable } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { PostComments, postsApi } from '@/features/posts'
import { makeAutoObservable, runInAction } from 'mobx'

export class CommentsStore {
  comments: Nullable<PostComments> = null
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  async addComment(postId: number, comment: string) {
    if (this.isLoading) {
      return
    }
    try {
      this.isLoading = true
      const response = await postsApi.addComment({ comment, postId })

      runInAction(() => {
        this.isLoading = false
        this.getComments(postId)
      })

      return response
    } catch (error) {
      this.isLoading = false
      responseErrorHandler(error)
    }
  }

  async getComments(postId: number) {
    if (this.isLoading) {
      return
    }
    try {
      this.isLoading = true
      const response = await postsApi.getPostIdComments({ postId })

      runInAction(() => {
        this.comments = response
        this.isLoading = false
      })
    } catch (error) {
      this.isLoading = false
      responseErrorHandler(error)
    }
  }
}
