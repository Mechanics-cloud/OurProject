import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { makeAutoObservable, runInAction } from 'mobx'

import { homeApi } from './home.api'
import { HomePageRootInterface } from './home.types'
import { PostsComments, PostsLikes } from './posts/posts.types'

class HomePageStore {
  // comments: PostsComments | null = null
  isLoadingHomePage: boolean = true
  likes: PostsLikes | null = null
  loadingRequestFlag: boolean = false
  publicationsFollowers: HomePageRootInterface | null = null

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getPostsPublicationsFollowers() {
    if (this.loadingRequestFlag) {
      return
    }
    try {
      this.loadingRequestFlag = true
      const response = await homeApi.publicationsFollowers({
        endCursorPostId: 0,
        pageNumber: 1,
        pageSize: 10,
      })

      runInAction(() => {
        this.publicationsFollowers = response
        this.isLoadingHomePage = false
        this.loadingRequestFlag = false
      })
    } catch (error) {
      responseErrorHandler(error)
      runInAction(() => {
        this.isLoadingHomePage = false
      })
    }
  }

  isLiked(id: number, isLikedValue: boolean) {
    this.publicationsFollowers?.items.map((i) =>
      i.id === id ? (i.isLiked = isLikedValue) : i
    )
  }
}

export default new HomePageStore()
