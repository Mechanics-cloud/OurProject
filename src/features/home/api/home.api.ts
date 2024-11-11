import { instance } from '@/features/auth/api/instance'
import { AxiosInstance } from 'axios'

import { HomePageQuery, HomePageRootInterface } from '../model/home.types'

class HomeApi {
  constructor(private instance: AxiosInstance) {}

  public publicationsFollowers(data: HomePageQuery) {
    return this.instance
      .get<HomePageRootInterface>('/v1/home/publications-followers', {
        params: data,
      })
      .then((res) => res.data)
  }
}

export const homeApi = new HomeApi(instance)
