import { PathService } from '@/common'
import { instance } from '@/common/api'
import { LikeStatus } from '@/common/enums'
import { PostsRequestEndpoints, PublicPostsEndpoints } from '@/features/posts'
import { PostsEndpoints } from '@/features/profile/posts'
import { AxiosInstance, AxiosResponse } from 'axios'

import {
  Comment,
  PostComments,
  PostInfoParamsRequest,
  PostsLikes,
} from './posts.types'

class PostsApi {
  public getPostIdComments = (params: PostInfoParamsRequest) => {
    const { postId, ...query } = params
    const queryParams = PathService.getQueryParams(query)

    return this.instance
      .get<PostComments>(PostsRequestEndpoints.idComments(postId, queryParams))
      .then((res) => res.data)
  }

  public getPostLikes = (params: PostInfoParamsRequest) => {
    const { postId, ...query } = params
    const queryParams = PathService.getQueryParams(query)

    return this.instance
      .get<PostsLikes>(PostsRequestEndpoints.idLikes(postId, queryParams))
      .then((res) => res.data)
  }

  public getPublicComments = (params: PostInfoParamsRequest) => {
    const { postId, ...query } = params
    const queryParams = PathService.getQueryParams(query)

    return this.instance
      .get<PostComments>(PublicPostsEndpoints.idComments(postId, queryParams))
      .then((res) => res.data)
  }

  public updateCommentLike = ({
    commentId,
    likeStatus,
    postId,
  }: {
    commentId: number
    likeStatus: LikeStatus
    postId: number
  }) => {
    const path = PathService.generatePath(
      PostsRequestEndpoints.changeCommentLike,
      { commentId, postId }
    )

    return this.instance.put<void>(path, { likeStatus })
  }

  constructor(private instance: AxiosInstance) {}

  public addComment({ comment, postId }: { comment: string; postId: number }) {
    return this.instance
      .post<Comment>(PostsRequestEndpoints.idComments(postId), {
        content: comment,
      })
      .then((res) => res.data)
  }

  public async deletePost(postId: number): Promise<AxiosResponse> {
    return this.instance.delete(PostsEndpoints.deletePost(postId))
  }

  public updateLikeStatus({
    newLikeStatus,
    postId,
  }: {
    newLikeStatus: LikeStatus
    postId: number
  }) {
    return this.instance
      .put<void>(PostsRequestEndpoints.idLikeStatus(postId), {
        likeStatus: newLikeStatus,
      })
      .then((res) => res.data)
  }

  public async updatePostDescription({
    description,
    postId,
  }: {
    description: string
    postId: number
  }) {
    return this.instance
      .put<void>(PostsRequestEndpoints.idPost(postId), {
        description,
      })
      .then((res) => res.data)
  }
}

export const postsApi = new PostsApi(instance)
