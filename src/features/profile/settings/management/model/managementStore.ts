import { Environments, Nullable, responseErrorHandler } from '@/common'
import { PaymentType } from '@/common/enums'
import { makeAutoObservable, runInAction } from 'mobx'

import { DataSubscription } from '../api/management.types.api'
import { subscriptionsApi } from '../api/profile.management.api'

export class ManagementStore {
  // userProfile: Nullable<UserProfile> = null
  data: DataSubscription = {
    amount: 10,
    baseUrl: `${Environments.BASE_URL}/profile/settings/management`,
    typeSubscription: PaymentType.Day,
  } as const

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async processPayment(paymentType: 'PAYPAL' | 'STRIPE') {
    const paymentData = { ...this.data, paymentType }

    try {
      const response = await subscriptionsApi.subscriptions(paymentData)
      const redirectUrl = response.data?.url

      if (redirectUrl) {
        window.location.href = redirectUrl
      }
    } catch (error) {
      responseErrorHandler(error)
    }
  }
}

export const managementStore = new ManagementStore()
