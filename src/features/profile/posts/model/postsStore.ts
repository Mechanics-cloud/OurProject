import { toast } from 'react-toastify'

import { responseErrorHandler } from '@/common'
import { translationForStore } from '@/common/utils/setTranslation'
import { makeAutoObservable } from 'mobx'

import { postsApi } from '../api/posts.api'

class PostsStore {
  constructor() {
    makeAutoObservable(this)
  }
  async deletePost(postId: number) {
    try {
      await postsApi.deletePost(postId)

      //todo: отфильтровать удаленный пост из стора
      toast.success(translationForStore.t.post.successMessage)
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}
export const postsStore = new PostsStore()
