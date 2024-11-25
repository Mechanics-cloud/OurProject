import { responseErrorHandler } from '@/common'
import { makeAutoObservable } from 'mobx'

import { postApi } from '../api/post.api'

class PostStore {
  constructor() {
    makeAutoObservable(this)
  }
  async deletePost(postId: number) {
    try {
      await postApi.deletePost(postId)

      //удалить пост из стора
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}
export const postStore = new PostStore()
