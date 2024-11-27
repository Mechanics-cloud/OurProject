import { responseErrorHandler } from '@/common'
import { makeAutoObservable } from 'mobx'

import { postApi } from '../api/post.api'

class PostsStore {
  constructor() {
    makeAutoObservable(this)
  }
  async deletePost(postId: number) {
    try {
      await postApi.deletePost(postId)

      //todo: отфильтровать удаленный пост из стора
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}
export const postsStore = new PostsStore()
