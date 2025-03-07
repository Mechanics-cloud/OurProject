import { Nullable } from '@/common'
import { LikeStatus } from '@/common/enums'
import { postsApi } from '@/features/posts'
import { makeAutoObservable, runInAction } from 'mobx'
import { FULFILLED, IPromiseBasedObservable, fromPromise } from 'mobx-utils'

import { newsFeedApi } from '../api'
import { NewsFeedRoot } from './newsFeed.types'

class NewsFeedStore {
  publicationsFollowers: Nullable<IPromiseBasedObservable<NewsFeedRoot>> = null

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async changeLikesCount(
    id: number,
    isLikedValue: boolean,
    newLikeStatus: LikeStatus
  ) {
    if (
      !this.publicationsFollowers ||
      this.publicationsFollowers.state !== FULFILLED
    ) {
      return
    }
    await postsApi.updateLikeStatus({ newLikeStatus, postId: id })

    runInAction(() => {
      const currentData = this.publicationsFollowers!.value as NewsFeedRoot
      const updatedItems = currentData.items.map((item) =>
        item.id === id
          ? {
              ...item,
              isLiked: isLikedValue,
              likesCount: item.likesCount + (isLikedValue ? 1 : -1),
            }
          : item
      )

      const newData = { ...currentData, items: updatedItems }

      this.publicationsFollowers = fromPromise.resolve(newData)
    })
  }

  cleanUp() {
    this.publicationsFollowers = null
  }

  async getPostsPublicationsFollowers(signal?: AbortSignal) {
    this.publicationsFollowers = fromPromise<NewsFeedRoot>(
      newsFeedApi.getFollowersPublications(
        {
          endCursorPostId: 0,
          pageNumber: 1,
          pageSize: 3,
        },
        signal
      )
    )
  }
}

export const newsFeedStore = new NewsFeedStore()
