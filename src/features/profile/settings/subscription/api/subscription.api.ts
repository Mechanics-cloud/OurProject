import { instance } from '@/common/api'
import { AxiosInstance, AxiosResponse } from 'axios'

import { CurrentPayments, Price } from '../model'
import { SubscriptionEndpoints } from './subscription.endpoints'

class SubscriptionApi {
  constructor(private instance: AxiosInstance) {}

  async canceledAutoRenewal(): Promise<AxiosResponse> {
    return await this.instance.post(SubscriptionEndpoints.canceledAutoRenewal)
  }

  async getCurrentPayment(): Promise<CurrentPayments> {
    const res = await this.instance.get(
      SubscriptionEndpoints.currentPaymentSubscriptions
    )

    return res.data
  }

  async getPrice(): Promise<Price[]> {
    const res = await this.instance.get(SubscriptionEndpoints.getPrice)

    return res.data.data
  }
}

export const subscriptionAPi = new SubscriptionApi(instance)
