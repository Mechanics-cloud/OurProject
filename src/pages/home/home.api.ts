import { instance } from '@/features/auth/api/instance'
import { AxiosInstance, AxiosResponse } from 'axios'

import { homeData } from './home.types'

class HomeApi {
  constructor(private instance: AxiosInstance) {}

  public async publicationsFollowers(data: homeData): Promise<AxiosResponse> {
    return instance
      .get('/v1/home/publications-followers', { params: data })
      .then((res) => res.data)
  }
}

export const homeApi = new HomeApi(instance)
