import { Environments } from '@/common'
import { Endpoints } from '@/features/publicPosts'
import axios, { AxiosInstance } from 'axios'

import { PublicPostsDto, RequestQueries } from './publicPosts.types'

class PublicPostsApi {
  constructor(private instance: AxiosInstance) {}
  public async fetchPublicPosts<T = PublicPostsDto>(
    queries: RequestQueries
  ): Promise<T> {
    const URL =
      Environments.API_URL +
      Endpoints.allPublicPosts +
      '/,?pageSize=4&sortDirection=desc'

    return this.instance
      .get(URL)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  }
}

export const publicPostsApi = new PublicPostsApi(axios)
