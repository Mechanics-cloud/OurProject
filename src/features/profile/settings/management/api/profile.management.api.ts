import { instance } from '@/common/api'
import { AxiosInstance, AxiosResponse } from 'axios'

import { dataProps } from './management.types.api'

class SubscriptionsApi {
  constructor(private instance: AxiosInstance) {}

  public subscriptions(data: dataProps): Promise<AxiosResponse> {
    return this.instance.post(`/v1/subscriptions`, data)
  }
}

export const subscriptionsApi = new SubscriptionsApi(instance)
