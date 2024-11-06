import { LikeStatus } from '@/common/enums'
import { instance } from '@/features/auth/api/instance'
import { AxiosInstance } from 'axios'

import { PostsComments, PostsLikes } from '../model'

class PostsApi {
  constructor(private instance: AxiosInstance) {}

  public addComment({ comment, postId }: { comment: string; postId: number }) {
    return instance.post(`/v1/posts/${postId}/comments`, {
      content: comment,
    })
  }

  public getPostIdComments(postId: number) {
    return instance
      .get<PostsComments>(`/v1/posts/${postId}/comments`)
      .then((res) => res.data)
  }
  public getPostLikes({ postId }: { postId: number }) {
    return instance
      .get<PostsLikes>(`/v1/posts/${postId}/likes`)
      .then((res) => res.data)
  }

  public updateLikeStatus({
    likeStatus,
    postId,
  }: {
    likeStatus: LikeStatus
    postId: number
  }) {
    return instance
      .put<any>(`/v1/posts/${postId}/like-status`, {
        likeStatus: likeStatus,
      })
      .then((res) => res.data)
  }
}
export const postsApi = new PostsApi(instance)
