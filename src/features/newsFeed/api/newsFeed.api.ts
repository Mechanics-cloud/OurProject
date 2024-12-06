import { instance } from '@/common/api'
import { AxiosInstance } from 'axios'

import { NewsFeedQuery, NewsFeedRoot } from '../model'
import { NewsFeedRequestEndpoints } from './newsFeed.endpoints'

class NewsFeedApi {
  constructor(private instance: AxiosInstance) {}

  public getFollowersPublications(data: NewsFeedQuery) {
    return this.instance
      .get<NewsFeedRoot>(NewsFeedRequestEndpoints.followersPublications, {
        params: data,
      })
      .then((res) => res.data)
  }
}

export const newsFeedApi = new NewsFeedApi(instance)
