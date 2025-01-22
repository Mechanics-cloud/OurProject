import { Nullable } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { PostsLikes } from '@/features/posts'
import { makeAutoObservable, runInAction } from 'mobx'

import { newsFeedApi } from '../api'
import { NewsFeedRoot } from './newsFeed.types'

class NewsFeedStore {
  isLoading: boolean = true
  likes: Nullable<PostsLikes> = null
  loadingRequestFlag: boolean = false
  publicationsFollowers: Nullable<NewsFeedRoot> = null

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

  cleanUp() {
    this.publicationsFollowers = null
    this.likes = null
  }

  async getPostsPublicationsFollowers() {
    if (this.loadingRequestFlag) {
      return
    }
    try {
      this.loadingRequestFlag = true
      const response = await newsFeedApi.getFollowersPublications({
        endCursorPostId: 0,
        pageNumber: 1,
        pageSize: 10,
      })

      runInAction(() => {
        this.publicationsFollowers = response
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
        this.loadingRequestFlag = false
      })
    }
  }
}

export const newsFeedStore = new NewsFeedStore()
