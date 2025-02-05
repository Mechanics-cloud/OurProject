import { Nullable, SortDirection } from '@/common'
import { LikeStatus } from '@/common/enums'
import {
  Comment,
  PostComments,
  PostInfoParamsRequest,
  postsApi,
} from '@/features/posts'
import { SortedStore } from '@/features/posts/model/store/sortedStore'
import { action, makeObservable, observable, runInAction } from 'mobx'

export class CommentStore extends SortedStore<Comment> {
  createComment = async (params: { comment: string; postId: number }) => {
    this.isLoading = true
    const response = await postsApi.addComment(params).finally(() => {
      this.isLoading = false
    })

    if (response) {
      runInAction(() => {
        if (Array.isArray(this.items)) {
          this.items = [response].concat(this.items)
        } else {
          this.items = [response]
        }
      })
    }

    return response
  }

  getComments = async ({
    pageNumber,
    postId,
    type,
  }: {
    pageNumber: number
    postId: number
    type: 'private' | 'public'
  }) => {
    this.isLoading = true

    const params: PostInfoParamsRequest = {
      pageNumber,
      pageSize: this.pageSize,
      postId,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    }

    const request =
      type === 'public'
        ? postsApi.getPublicComments
        : postsApi.getPostIdComments

    const response = await request(params)

    if (response) {
      runInAction(() => {
        this.setComments(response.items)
        this.pageNumber = response.page
        this.pageSize = response.pageSize
        this.pagesCount = response.pagesCount
        this.totalCount = response.totalCount
        this.isLoading = false
      })
    }
  }

  hydrate = (data?: Nullable<PostComments>) => {
    runInAction(() => {
      this.items = data?.items ?? []
      this.pageNumber = data?.page ?? 1
      this.pageSize = data?.pageSize ?? 10
      this.pagesCount = data?.pagesCount ?? 1
      this.totalCount = data?.totalCount ?? 0

      this.setShouldScroll(false)
    })
  }

  isLoading: boolean = false

  setComments = (comments: Comment[]) => {
    if (this.items) {
      this.items = this.items.concat(comments)
    } else {
      this.items = comments
    }
  }

  setShouldScroll = (value: boolean) => {
    this.shouldScroll = value
  }

  shouldScroll = false

  updateCommentLike = async (params: {
    commentId: number
    likeStatus: LikeStatus
    postId: number
  }) => {
    const comment = this.items?.find(
      (comment) => comment.id === params.commentId
    )
    const response = await postsApi.updateCommentLike(params)

    runInAction(() => {
      if (comment && response) {
        const isLiked = params.likeStatus === LikeStatus.Like

        comment.isLiked = isLiked
        comment.likeCount = isLiked
          ? comment.likeCount + 1
          : comment.likeCount - 1
      }
    })
  }

  constructor(sortOrder: SortDirection) {
    super(sortOrder)

    makeObservable(this, {
      createComment: action,
      getComments: action,
      hydrate: action,
      setComments: action,
      setShouldScroll: action,
      shouldScroll: observable,
      updateCommentLike: action,
    })
  }
}
