import { SortDirection } from '@/common'
import { LikeStatus } from '@/common/enums'
import { Likes, PostInfoParamsRequest, postsApi } from '@/features/posts'
import { SortedStore } from '@/features/posts/model/store/sortedStore'
import { action, makeObservable, observable, runInAction } from 'mobx'

export class LikesStore extends SortedStore<Likes> {
  getLikes = async (postId: number) => {
    const params: PostInfoParamsRequest = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      postId,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    }
    const response = await postsApi.getPostLikes(params)

    runInAction(() => {
      this.items = response.items
      this.isLiked = response.isLiked
      this.pageNumber = response.page
      this.pageSize = response.pageSize
      this.pagesCount = response.pagesCount
      this.totalCount = response.totalCount
    })
  }

  isLiked: boolean = false

  toggleLike = async ({ postId }: { postId: number }) => {
    const newLikeStatus = this.isLiked ? LikeStatus.None : LikeStatus.Like

    await postsApi.updateLikeStatus({ newLikeStatus, postId })
    runInAction(() => {
      this.isLiked = !this.isLiked
    })
  }

  constructor(sortDirection: SortDirection) {
    super(sortDirection)

    makeObservable(this, {
      getLikes: action,
      isLiked: observable,
      toggleLike: action,
    })
  }
}
