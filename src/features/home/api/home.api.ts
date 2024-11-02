import { instance } from '@/features/auth/api/instance'
import { AxiosInstance, AxiosResponse } from 'axios'

import { HomePageQuery, HomePageRootInterface } from '../model/home.types'

class HomeApi {
  constructor(private instance: AxiosInstance) {}

  public async publicationsFollowers(data: HomePageQuery) {
    return instance
      .get<HomePageRootInterface>('/v1/home/publications-followers', {
        params: data,
      })
      .then((res) => res.data)
  }
}

export const homeApi = new HomeApi(instance)
