import { instance } from '@/common/api'
import { SubscriptionEndpoints } from '@/features/profile'
import { AxiosInstance, AxiosResponse } from 'axios'

import { DataSubscriptionApi, Price } from '../model'

class SubscriptionApi {
  constructor(private instance: AxiosInstance) {}

  async getPrice(): Promise<Price[]> {
    const res = await this.instance.get(SubscriptionEndpoints.getPrice)

    return res.data.data
  }

  subscriptions(data: DataSubscriptionApi): Promise<AxiosResponse> {
    return this.instance.post(SubscriptionEndpoints.subscribe, data)
  }
}

export const subscriptionAPi = new SubscriptionApi(instance)
