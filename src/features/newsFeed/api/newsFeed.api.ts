import { responseErrorHandler } from '@/common'
import { instance } from '@/common/api'
import { AxiosInstance } from 'axios'

import { NewsFeedQuery, NewsFeedRoot } from '../model'
import { NewsFeedRequestEndpoints } from './newsFeed.endpoints'

class NewsFeedApi {
  constructor(private instance: AxiosInstance) {}

  async getFollowersPublications(data: NewsFeedQuery, signal?: AbortSignal) {
    try {
      const res = await this.instance.get<NewsFeedRoot>(
        NewsFeedRequestEndpoints.followersPublications,
        {
          params: data,
          signal,
        }
      )

      return res.data
    } catch (error) {
      responseErrorHandler(error)
      throw error
    }
  }
}

export const newsFeedApi = new NewsFeedApi(instance)
