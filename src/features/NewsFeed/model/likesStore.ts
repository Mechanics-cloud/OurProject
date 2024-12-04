import { Nullable } from '@/common'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { PostsLikes, postsApi } from '@/features/posts'
import { makeAutoObservable, runInAction } from 'mobx'
import avatarPlaceholder from 'src/assets/images/user-avatar-placeholder.jpg'

export class LikesStore {
  isLoading: boolean = false
  likes: Nullable<PostsLikes> = null

  constructor() {
    makeAutoObservable(this)
  }

  async getPostLikes(postId: number) {
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
      this.isLoading = false
      responseErrorHandler(error)
    }
  }

  get avatarImages() {
    let avatarUrls = null
    const isLiked = this.likes?.items.length != 0

    if (isLiked) {
      const firstThreeLikes = this.likes?.items.slice(0, 3)

      avatarUrls = firstThreeLikes?.map(
        (item) => item.avatars[1]?.url || avatarPlaceholder
      )
    }

    return avatarUrls
  }
}
