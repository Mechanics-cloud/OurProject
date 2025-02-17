import { instance } from '@/common/api'
import { AxiosInstance, AxiosResponse } from 'axios'

import { CurrentPayments, DataSubscriptionApi, Price } from '../model'
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

  subscriptions(data: DataSubscriptionApi): Promise<AxiosResponse> {
    return this.instance.post(SubscriptionEndpoints.subscribe, data)
  }
}

export const subscriptionAPi = new SubscriptionApi(instance)
