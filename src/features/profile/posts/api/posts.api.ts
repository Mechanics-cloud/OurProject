import { instance } from '@/common/api'
import { AxiosInstance, AxiosResponse } from 'axios'

import { PostsEndpoints } from './posts.endpoints'

class PostsApi {
  constructor(private instance: AxiosInstance) {}
  public async deletePost(postId: number): Promise<AxiosResponse> {
    return this.instance.delete(PostsEndpoints.deletePost(postId))
  }
}

export const postsApi = new PostsApi(instance)
