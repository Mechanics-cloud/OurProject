import { toast } from 'react-toastify'

import {
  Environments,
  Nullable,
  RadioOption,
  getFromLocalStorage,
  removeFromLocalStorage,
  responseErrorHandler,
  setToLocalStorage,
} from '@/common'
import {
  AccountTypeValue,
  ManualAccountType,
  PaymentBanks,
  PaymentType,
} from '@/common/enums'
import { translationForStore } from '@/common/utils/setTranslation'
import { makeAutoObservable, runInAction } from 'mobx'

import { paymentTypeConverter } from '../../payments'
import { subscriptionAPi } from '../api'
import { CurrentPayments, DataSubscriptionApi, Price } from './types'

class SubscriptionStore {
  currentPayments: Nullable<CurrentPayments> = null
  isLoading: boolean = false
  isPaidAccount: boolean = false
  lastPaymentDate: Nullable<Date> = null
  paymentValue: '' | PaymentType = ''
  price: Nullable<Price[]> = null
  priceOptions: Nullable<RadioOption[]> = null

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async canceledAutoRenewal() {
    try {
      this.isLoading = true

      await subscriptionAPi.canceledAutoRenewal()

      toast.success(translationForStore.t.profileMyPayments.disabledAutoRenewal)
      runInAction(() => {
        if (this.currentPayments) {
          this.currentPayments = {
            ...this.currentPayments,
            hasAutoRenewal: false,
          }
        }
      })
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }

  cleanUp() {
    this.currentPayments = null
    this.isLoading = false
    this.isPaidAccount = false
    this.paymentValue = ''
    this.price = null
    this.priceOptions = null
    document.cookie = `${ManualAccountType.paymentCookies}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
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
  async getCurrentPayment() {
    try {
      const res = await subscriptionAPi.getCurrentPayment()

      runInAction(() => {
        this.currentPayments = res
        if (res.data.length) {
          const personalType = getFromLocalStorage(
            ManualAccountType.AccountType
          )

          const currentDate = new Date()

          const lastPaymentDate = new Date(
            res.data.at(-1)?.endDateOfSubscription!
          )

          this.lastPaymentDate = lastPaymentDate

          const paid = currentDate < lastPaymentDate

          this.isPaidAccount = paid

          if (!personalType) {
            document.cookie = `${
              ManualAccountType.paymentCookies
            }; expires=${this.lastPaymentDate.toUTCString()}; path=/`
          }
        }
      })
    } catch (error) {
      responseErrorHandler(error)
    }
  }
  async getPrices() {
    try {
      this.isLoading = true
      const res = await subscriptionAPi.getPrices()

      await this.getCurrentPayment()
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

  manualChangeAccountType(value: string, resetCookie: () => void) {
    if (value === AccountTypeValue.Business) {
      removeFromLocalStorage(ManualAccountType.AccountType)
      if (this.lastPaymentDate) {
        document.cookie = `${
          ManualAccountType.paymentCookies
        }; expires=${this.lastPaymentDate.toUTCString()}; path=/`
      }
    } else {
      setToLocalStorage(ManualAccountType.AccountType, value)
      resetCookie()
    }
  }

  async processPayment(paymentType: PaymentBanks, locale: string) {
    const priceDetails = this.price?.find(
      (el) => el.typeDescription === this.paymentValue
    )

    const paymentDetails = {
      ...priceDetails,
      baseUrl: `${Environments.BASE_URL}/${locale}/profile/settings/management`,
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
