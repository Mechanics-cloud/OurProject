import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { makeAutoObservable, runInAction } from 'mobx'

import { homeApi } from '../api/home.api'
import { HomePageRootInterface } from './home.types'
import { PostsLikes } from './posts/posts.types'

class HomePageStore {
  isLoading: boolean = true
  likes: PostsLikes | null = null
  loadingRequestFlag: boolean = false
  publicationsFollowers: HomePageRootInterface | null = null

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  changeLikesCount(id: number, isLikedValue: boolean) {
    if (!this.publicationsFollowers?.items) {
      return
    }

    this.publicationsFollowers.items = this.publicationsFollowers.items.map(
      (item) => {
        if (item.id === id) {
          item.isLiked = isLikedValue
          item.likesCount += isLikedValue ? 1 : -1
        }

        return item
      }
    )
  }

  async getPostsPublicationsFollowers() {
    if (this.loadingRequestFlag) {
      return
    }
    try {
      this.loadingRequestFlag = true
      const response = await homeApi.getFollowersPublications({
        endCursorPostId: 0,
        pageNumber: 1,
        pageSize: 10,
      })

      runInAction(() => {
        this.publicationsFollowers = response
        this.isLoading = false
        this.loadingRequestFlag = false
      })
    } catch (error) {
      responseErrorHandler(error)
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
}

export default new HomePageStore()
