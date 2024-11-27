import { instance } from '@/common/api'
import { AxiosInstance, AxiosResponse } from 'axios'

import { PostsEndpoints } from './post.endpoints'

class PostApi {
  constructor(private instance: AxiosInstance) {}
  public async deletePost(postId: number): Promise<AxiosResponse> {
    return this.instance.delete(PostsEndpoints.deletePost(postId))
  }
}

export const postApi = new PostApi(instance)
