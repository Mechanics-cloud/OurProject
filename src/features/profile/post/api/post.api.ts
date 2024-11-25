import { instance } from '@/features/auth/api/instance'
import { AxiosInstance } from 'axios'

import { Endpoints } from './post.endpoints'

class PostApi {
  constructor(private instance: AxiosInstance) {}
  public async deletePost(postId: number) {
    return this.instance.delete(Endpoints.deletePost(postId))
  }
}

export const postApi = new PostApi(instance)
