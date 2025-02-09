import { instance } from '@/common/api'
import { AxiosInstance, AxiosResponse } from 'axios'

import { DataSubscriptionApi } from './management.types.api'

class SubscriptionsApi {
  constructor(private instance: AxiosInstance) {}

  public subscriptions(data: DataSubscriptionApi): Promise<AxiosResponse> {
    return this.instance.post(`/v1/subscriptions`, data)
  }
}

export const subscriptionsApi = new SubscriptionsApi(instance)
