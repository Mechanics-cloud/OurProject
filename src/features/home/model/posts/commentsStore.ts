import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { makeAutoObservable, runInAction } from 'mobx'

import { postsApi } from '../../api'
import { PostsComments } from './posts.types'

class CommentsStoreTest {
  comments: PostsComments | null = null
  isLoading: boolean = false
  store: { [postId: string]: PostsComments } = {}

  constructor() {
    makeAutoObservable(this)
  }

  async getComments(postId: number) {
    try {
      this.isLoading = true
      const response = await postsApi.getPostIdComments(postId)

      runInAction(() => {
        this.store[postId] = response
        this.isLoading = false
        console.log(this.store)
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}

export const commentsStoreTest = new CommentsStoreTest()
