import { instance } from '@/features/auth/api/instance'
import { AxiosInstance, AxiosResponse } from 'axios'

import { homeData } from '../home.types'
import { PostsComments, PostsLikes } from './posts.types'

class PostsApi {
  constructor(private instance: AxiosInstance) {}

  public async getPostLikes({ postId }: { postId: number }) {
    return instance
      .get<PostsLikes>(`/v1/posts/${postId}/likes`)
      .then((res) => res.data)
  }
  public async postIdComments({ postId }: { postId: number }) {
    return instance
      .get<PostsComments>(`/v1/posts/${postId}/comments`)
      .then((res) => res.data)
  }
  public async postLike({ postId }: { postId: number }) {
    return instance
      .put<any>(`/v1/posts/${postId}/like-status`, {
        likeStatus: 'LIKE',
      })
      .then((res) => res.data)
  }
  public async publicPost({ postId }: { postId: number }) {
    return instance
      .get<any>(`/v1/public-posts/${postId}`)
      .then((res) => res.data)
  }
  public async publicPosts(data: homeData) {
    return instance
      .get<any>(`/v1/public-posts/all/`, { params: data })
      .then((res) => res.data)
  }
}

export const postsApi = new PostsApi(instance)
