import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { homeApi } from '../home.api'
import { HomePageRootInterface } from '../home.types'
import { postsApi } from './posts.api'
import { PostsComments, PostsLikes } from './posts.types'

export class CommentsStore {
  comments: PostsComments | null = null
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  async getComments(postId: number) {
    if (this.isLoading) {
      return
    }
    try {
      this.isLoading = true
      const response = await postsApi.getPostIdComments(postId)

      runInAction(() => {
        this.comments = response
        this.isLoading = false
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}
export class LikesStore {
  isLoading: boolean = false
  likes: PostsLikes | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async getComments(postId: number) {
    if (this.isLoading) {
      return
    }
    try {
      this.isLoading = true
      const response = await postsApi.getPostLikes({ postId })

      runInAction(() => {
        this.likes = response
        this.isLoading = false
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  get getAvatarImages() {
    let firstThreeAvatars = null

    if (
      this.likes?.items.length !== 0 &&
      this.likes?.items[0]?.avatars.length !== 0
    ) {
      firstThreeAvatars = this.likes?.items
        .slice(0, 3)
        .filter(
          (item) =>
            item !== undefined &&
            item.avatars &&
            item.avatars[0] &&
            item.avatars[0].url
        )
        .map((item) => item.avatars[1]?.url)
    }

    return firstThreeAvatars
  }
}
