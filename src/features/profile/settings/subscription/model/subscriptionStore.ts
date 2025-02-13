import {
  Environments,
  Nullable,
  RadioOption,
  responseErrorHandler,
} from '@/common'
import { PaymentBanks, PaymentType } from '@/common/enums'
import { translationForStore } from '@/common/utils/setTranslation'
import { makeAutoObservable, runInAction } from 'mobx'

import { paymentTypeConverter } from '../../payments'
import { subscriptionAPi } from '../api'
import { DataSubscriptionApi, Price } from './types'

class SubscriptionStore {
  isLoading: boolean = false
  paymentValue: '' | PaymentType = ''
  price: Nullable<Price[]> = null
  priceOptions: Nullable<RadioOption[]> = null

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  convertOptions() {
    const priceOptions = this.price?.map((el) => ({
      label: `$${el.amount} ${
        translationForStore.t.profileMyPayments.per
      } ${paymentTypeConverter(el.typeDescription, translationForStore.t)}`,
      value: String(el.typeDescription),
    }))

    if (priceOptions) {
      this.priceOptions = priceOptions
    }
  }

  async getPrice() {
    try {
      this.isLoading = true
      const res = await subscriptionAPi.getPrice()

      runInAction(() => {
        this.paymentValue = res[0].typeDescription
        this.price = res
        this.convertOptions()
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  async processPayment(paymentType: PaymentBanks) {
    const priceDetails = this.price?.find(
      (el) => el.typeDescription === this.paymentValue
    )

    const paymentDetails = {
      ...priceDetails,
      baseUrl: `${Environments.BASE_URL}/profile/settings/management`,
      paymentType,
    }

    const { typeDescription: typeSubscription, ...paymentData } = paymentDetails
    const subscriptionRequest = { ...paymentData, typeSubscription }

    try {
      const response = await subscriptionAPi.subscriptions(
        subscriptionRequest as DataSubscriptionApi
      )
      const redirectUrl = response.data?.url

      if (redirectUrl) {
        window.location.href = redirectUrl
      }
    } catch (error) {
      responseErrorHandler(error)
    }
  }

  setPaymentValue(value: PaymentType) {
    this.paymentValue = value
  }
}

export const subscriptionStore = new SubscriptionStore()
