import { instance } from '@/common/api'
import { AxiosInstance } from 'axios'

import { HomePageQuery, HomePageRootInterface } from '../model/home.types'
import { HomePageRequestEndpoints } from './home.endpoints'

class HomeApi {
  constructor(private instance: AxiosInstance) {}

  public getFollowersPublications(data: HomePageQuery) {
    return this.instance
      .get<HomePageRootInterface>(
        HomePageRequestEndpoints.followersPublications,
        {
          params: data,
        }
      )
      .then((res) => res.data)
  }
}

export const homeApi = new HomeApi(instance)
