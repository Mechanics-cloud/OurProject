import { instance } from '@/common/api'
import { LikeStatus } from '@/common/enums'
import { AxiosInstance } from 'axios'

import { PostsRequestEndpoints } from './posts.endpoints'
import { PostComments, PostsLikes } from './posts.types'

class PostsApi {
  constructor(private instance: AxiosInstance) {}

  public addComment({ comment, postId }: { comment: string; postId: number }) {
    return this.instance.post(PostsRequestEndpoints.idComments(postId), {
      content: comment,
    })
  }

  public getPostIdComments(postId: number) {
    return this.instance
      .get<PostComments>(PostsRequestEndpoints.idComments(postId))
      .then((res) => res.data)
  }
  public getPostLikes({ postId }: { postId: number }) {
    return this.instance
      .get<PostsLikes>(PostsRequestEndpoints.idLikes(postId))
      .then((res) => res.data)
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
}
export const postsApi = new PostsApi(instance)
