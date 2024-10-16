import { instance } from '@/features/auth/api/instance'
import { AxiosInstance, AxiosResponse } from 'axios'

import { PostsComments, PostsLikes } from './posts.types'

class PostsApi {
  constructor(private instance: AxiosInstance) {}

  public async postIdComments({ postId }: { postId: number }) {
    return instance
      .get<PostsComments>(`/v1/posts/${postId}/comments`)
      .then((res) => res.data)
  }
  public async postIdLikes({ postId }: { postId: number }) {
    return instance
      .get<PostsLikes>(`/v1/posts/${postId}/likes`)
      .then((res) => res.data)
  }
}

export const postsApi = new PostsApi(instance)
