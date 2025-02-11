import { instance } from '@/common/api'
import { AxiosInstance, AxiosResponse } from 'axios'

import { Price } from '../model'
import { SubscriptionEndpoints } from './subscription.endpoints'

class SubscriptionAPi {
  constructor(private instance: AxiosInstance) {}

  async getPrice(): Promise<Price[]> {
    const res = await this.instance.get(SubscriptionEndpoints.getPrice)

    return res.data.data
  }
}

export const subscriptionAPi = new SubscriptionAPi(instance)
