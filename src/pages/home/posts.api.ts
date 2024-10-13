import { instance } from '@/features/auth/api/instance'
import { AxiosInstance, AxiosResponse } from 'axios'

import { RootInterface, homeData } from './home.types'

class PostsApi {
  constructor(private instance: AxiosInstance) {}

  public async postIdLikes(data: any) {
    return instance
      .get(`/v1/posts/${data.postId}/likes`)
      .then((res) => res.data)
  }
}

export const postsApi = new PostsApi(instance)
